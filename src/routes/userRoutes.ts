import { Router } from 'express';
import CreateUserController from '../controllers/CreateUserController';
import AuthUserController from '../controllers/AuthUserController';
import GetUserController from '../controllers/GetUserController';
import isAuthenticated from '../middlewares/isAuthenticated';
import DeleteUserController from '../controllers/DeleteUserController';
import { validate } from '../middlewares/validate';
import { idParams, userBody, loginBody } from '../validators/schemas';

const userRoutes = Router();
const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post(
  '/users',
  validate('body', userBody),
  createUserController.handle.bind(createUserController)
);

userRoutes.get(
  '/users/:id',
  isAuthenticated,
  validate('params', idParams),
  getUserController.handle.bind(getUserController)
);

userRoutes.post(
  '/login',
  validate('body', loginBody),
  authUserController.handle.bind(authUserController)
);

userRoutes.delete(
  '/users/:id',
  isAuthenticated,
  validate('params', idParams),
  deleteUserController.handle.bind(deleteUserController)
);

export default userRoutes;