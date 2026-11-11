import * as userService from '../services/usersservices.js';

export const getObtenerTodosLosPublicaciones = async (req, res, next) => {
    try {
        const result = await publicacionService.getAllpublicaciones();
        res.json(result);
    } catch (err) {
       return next(err);
    }
};


export const postCrearPublicacion = async (req, res, next) => {
    try {
        const { titulo, descripcion, usuarioId } = req.body;
        const newPublicacion = await publicacionService.postCrearPublicacion(titulo, descripcion, usuarioId);
        res.status(201).json(newPublicacion);
    } catch (err) {
        return next(err);
    }
};

export const putActualizarPublicacion = async (req, res, next) => {
    try {
        const {publicacionId} = req.params;
        const { titulo, descripcion, usuarioId } = req.body;
        const publicacion = [titulo, descripcion, usuarioId, publicacionId];
        const updatedPublicacion = await publicacionService.actualizarPublicacion(publicacion);
        res.status(200).json(updatedPublicacion);
    } catch (err) {
        return next(err);
    }
};

export const deleteEliminarPublicacion = async (req, res, next) => {
    try {
        const { publicacionId } = req.params;  
        const result = await publicacionService.eliminarPublicacion(publicacionId);
        res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};
        