
import { Router } from 'express';
import CreateUserController from '../controllers/CreateUserController';
import AuthUserController from '../controllers/AuthUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

userRoutes.post('/users', createUserController.handle.bind(createUserController));

userRoutes.post('/login', authUserController.handle.bind(authUserController));

export default userRoutes;
