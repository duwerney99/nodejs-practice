const services = require('../services/UsersService.js')



const GetUsers = async (req, res) => {
    try {
        const result = await services.GetUsers();
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

const GetUser = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const result = await services.GetUser(usuarioId);
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

const RegisterUser = async (req, res) => {
    try {
        const userRegistered = await services.RegisterUser(req.body)
        res.send({ status: 'OK', data: userRegistered })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


const SignIn = async (req, res) => {
    try {
        const token = await services.SignIn(req.body)
        res.send({ status: 'OK', data: token })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


const UpdateUser = (req, res) => {
    services.UpdateUser(req.params.usuarioId, req.body)
    res.send({ status: 'OK', data: req.body })
}


const DeleteUser = async (req, res) => {
    try {
        const result = await services.DeleteUser(req.params.usuarioId);
        res.status(200).json(result);

    } catch (e) {
        if (e.message.includes('No se pudo verificar la existencia del usuario')) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else if (e.message.includes('Usuario con ID')) {
            res.status(404).json({ error: e.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};





module.exports = {
    GetUsers,
    GetUser,
    RegisterUser,
    UpdateUser, 
    DeleteUser,
    SignIn
}