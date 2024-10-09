// getUsers.test.js
const { GetUsers, GetUser } = require('../src/services/UsersService');
const { getConnection } = require('../src/uitls/database/postgres'); 

jest.mock('../src/uitls/database/mysql'); 


describe('GetUsers', () => {
  it('should return users from the database', async () => {
    // Mock de la conexión y el query
    const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Santiago' }] });
    const mockConnection = { query: mockQuery };

    // Simulamos que getConnection retorna la conexión mockeada
    getConnection.mockResolvedValue(mockConnection);

    // Ejecutamos la función
    const users = await GetUsers();

    // Verificamos que getConnection fue llamado
    expect(getConnection).toHaveBeenCalled();

    // Verificamos que la consulta SQL fue llamada correctamente
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tecniTest.users");

    // Verificamos que el resultado de la función sea el esperado
    expect(users).toEqual([{ id: 1, name: 'Santiago' }]);
  });

  it('should handle errors', async () => {
    // Simulamos que getConnection lanza un error
    getConnection.mockRejectedValue(new Error('Connection failed'));

    await expect(GetUsers()).rejects.toThrow('Connection failed');
  });
});


//GetUser



describe('GetUser', () => {
  it('should return user by id from the database', async () => {

    const id = 1;


    // Mock de la conexión y el query
    const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Santiago' }] });
    const mockConnection = { query: mockQuery };

    // Simulamos que getConnection retorna la conexión mockeada
    getConnection.mockResolvedValue(mockConnection);

    // Ejecutamos la función
    const user = await GetUser(id);

    // Verificamos que getConnection fue llamado
    expect(getConnection).toHaveBeenCalled();

    // Verificamos que la consulta SQL fue llamada correctamente
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tecniTest.users WHERE user_id = $1", [id] );

    // Verificamos que el resultado de la función sea el esperado
    expect(user).toEqual([{ id: 1, name: 'Santiago' }]);
  });

  it('should handle errors', async () => {
    // Simulamos que getConnection lanza un error
    getConnection.mockRejectedValue(new Error('Connection failed'));

    await expect(GetUsers()).rejects.toThrow('Connection failed');
  });
});