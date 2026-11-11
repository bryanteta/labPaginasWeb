import {Router} from 'express';

import * as userController from '../controllers/UsersController.js';

import { createUserValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

router.get('/', userController.getObtenerTodosLosUsuarios);

router.get('/buscarPorApellido/:apellido', userController.getObtenerPorApellido);
router.get('/buscarPorNombre/:nombre', userController.getBuscarNombre);
router.post('/', runValidations(createUserValidators), userController.postCrearUsuario);
router.put('/:usuarioId', userController.putActualizarUsuario);
router.delete('/:usuarioId', userController.deleteEliminarUsuario);


export default router;