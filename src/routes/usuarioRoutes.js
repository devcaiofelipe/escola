import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import loginRequired from '../middlewares/loginRequired';


const router = new Router();


router.post('/', UsuarioController.store);
router.put('/', loginRequired, UsuarioController.update);
router.delete('/', loginRequired, UsuarioController.delete);

export default router;