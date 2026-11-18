
import { Router } from 'express';
import CreateUserController from '../controllers/CreateUserController';
import AuthUserController from '../controllers/AuthUserController';
import GetUserController from '../controllers/GetUserController';
import isAuthenticated from '../middlewares/isAuthenticated';
import DeleteUserController from '../controllers/DeleteUserController';

const userRoutes = Router();
const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post('/users', createUserController.handle.bind(createUserController));
userRoutes.get('/users/:id', isAuthenticated, getUserController.handle.bind(getUserController));
userRoutes.post('/login', authUserController.handle.bind(authUserController));
userRoutes.delete('/users/:id', isAuthenticated, deleteUserController.handle.bind(deleteUserController));

export default userRoutes;
