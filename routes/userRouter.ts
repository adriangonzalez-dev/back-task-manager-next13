import {Router} from 'express';
import {userController} from '../controllers/userController';
import {userCreate,userLogin} from '../validations/user';
import { getErrors, jwtVerify } from '../middlewares';

const router = Router();

router.post('/login', userLogin, getErrors, userController.login);
router.post('/register', userCreate, getErrors, userController.create);
router.get('/user', jwtVerify, userController.getUser)

export default router;