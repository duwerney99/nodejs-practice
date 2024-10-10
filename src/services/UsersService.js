const { getConnection } = require("../uitls/database/postgres");
const encrypt = require("../uitls/config");
const jwt = require("jsonwebtoken");



const GetUsers = async () => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * FROM tecniTest.users");
  return result.rows;
};

const GetUser = async (userId) => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * FROM tecniTest.users WHERE user_id = $1", [userId] );
  return result.rows;
};


const GetUserById = async (email) => {
  const connection = await getConnection(); 

  try {
    const result = await connection.query("SELECT * FROM tecniTest.users WHERE email = $1", [email]);
    return result.rows;  
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};


const RegisterUser = async (user) => {
  const { email, password, name } = user;

  const date = Date();
  const date_time = new Date(date);

  const userExist = await GetUserById(email);

  if (userExist.length === 0) {
    const encryptedPassword = await encrypt.encrypt(password);

    const sql = `INSERT INTO tecniTest.users (email, password, name, registration_date) VALUES ($1, $2, $3, $4) RETURNING *`; // Ajusta la consulta
    const values = [email, encryptedPassword, name, date_time];

    const connection = await getConnection();
    
    try {
      const result = await connection.query(sql, values);
      console.log('User registered:', result.rows[0]);
      return result.rows[0];  // Devuelve el usuario recién registrado
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  return "User already exists";
};

const SignIn = async (user) => {
  const { email, password } = user;

  const databaseUser = await GetUserById(email);

  if (databaseUser) {
    const validPassword = encrypt.compare(password, databaseUser[0].password);

    if (validPassword) {
      const accessToken = jwt.sign(
        {
          name: databaseUser[0].name,
          id: databaseUser[0].user_id, 
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );

      const refreshToken = jwt.sign(
        {
          name: user.name,
          id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET
      );
      return { accessToken, refreshToken };
    }
    return "Incorrect password";
  }
  return "User not found";
};

const UpdateUser = async (usuarioId, user) => {
  try {
    const databaseUser = await GetUserById(user.email);
    
    if (!databaseUser || databaseUser.length === 0) {
      throw new Error("User not found");
    }

    const userRegistered = {
      email: user.email,
      password: await encrypt.encrypt(user.password), 
      name: user.name,
      registration_date: databaseUser[0].registration_date,
    };

    const sql = `UPDATE tecniTest.users 
                 SET email = $1, password = $2, name = $3 
                 WHERE user_id = $4`;
    const connection = await getConnection();
    
    await connection.query(sql, [
      userRegistered.email,
      userRegistered.password,
      userRegistered.name,
      usuarioId
    ]);

    console.log("User successfully updated ID:", usuarioId);
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

const DeleteUser = async (usuarioId) => {
  const connection = await getConnection();

  try { 

    const verificarUsuarioSql = `SELECT COUNT(*) AS count FROM tecniTest.users WHERE user_id = $1`;
    const resultadoVerificacion = await connection.query(verificarUsuarioSql, [usuarioId]);

    const count = parseInt(resultadoVerificacion.rows[0].count, 10);

    if (count === 0) {
      return { error: `User with ID ${usuarioId} not found` };
    }

    // Eliminar el usuario si existe
    const eliminarUsuarioSql = `DELETE FROM tecniTest.users WHERE user_id = $1`;
    await connection.query(eliminarUsuarioSql, [usuarioId]);

    return { status: "OK", message: "User deleted successfully" };

  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};



module.exports = {
  GetUsers,
  GetUserById,
  GetUser,
  RegisterUser,
  UpdateUser,
  DeleteUser,
  SignIn,
};
