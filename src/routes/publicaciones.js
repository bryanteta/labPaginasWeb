import {Router} from 'express';

import * as PublicacionController from '../controllers/PublicacionController.js';

import { createPublicacionValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

router.get('/', PublicacionController.getObtenerTodosLosPublicaciones);


router.post('/', runValidations(createPublicacionValidators), PublicacionController.postCrearPublicacion);
router.put('/:publicacionId', PublicacionController.putActualizarPublicacion);
router.delete('/:publicacionId', PublicacionController.deleteEliminarPublicacion);


export default router;