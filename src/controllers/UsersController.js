import * as userService from '../services/usersservices.js';

export const getObtenerTodosLosUsuarios = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers();
        res.json(result);
    } catch (err) {
       return next(err);
    }
};

export const getObtenerPorApellido = async (req, res, next) => {
    try {
        const { apellido } = req.params;
        const result = await userService.getUserByApellido(apellido);
        res.json(result);
    } catch (err) {
       return next(err);
    }
};

export const getBuscarNombre = async (req, res, next) => {
    try {
        const { nombre } = req.params;
        const result = await userService.getBuscarNombre(nombre);
        res.json(result);
    } catch (err) {
        return next(err);
    }
};

export const postCrearUsuario = async (req, res, next) => {
    try {
        const { rolId, nombreUsuario, clave, nombre, apellido} = req.body;
        const newUser = await userService.postCrearUsuario(rolId, nombreUsuario, clave, nombre, apellido);
        res.status(201).json(newUser);
    } catch (err) {
        return next(err);
    }
};

export const putActualizarUsuario = async (req, res, next) => {
    try {
        const {usuarioId} = req.params;
        const { rolId, nombreUsuario, clave, nombre, apellido} = req.body;
        const usuario = [rolId, nombreUsuario, clave, nombre, apellido, usuarioId];
        const updatedUser = await userService.actualizarUsuario(usuario);
        res.status(200).json(updatedUser);
    } catch (err) {
        return next(err);
    }
};

export const deleteEliminarUsuario = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;  
        const result = await userService.eliminarUsuario(usuarioId);
        res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};
        