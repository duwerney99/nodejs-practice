const { getConnection } = require("../../uitls/database/postgres");

const getUsers = async () => {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM tecniTest.users");
    return result.rows;
};

const getUserById = async (userId) => {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM tecniTest.users WHERE user_id = $1", [userId] );
    return result.rows;
};

const getUserByEmail = async (email) => {
    const connection = await getConnection(); 
    const result = await connection.query("SELECT * FROM tecniTest.users WHERE email = $1", [email]);
    return result.rows;  
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail
};