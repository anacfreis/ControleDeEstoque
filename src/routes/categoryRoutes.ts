import { Router } from 'express';
import CreateCategoryController from '../controllers/CreateCategoryController';
import UpdateCategoryController from '../controllers/UpdateCategoryController';
import isAuthenticated from '../middlewares/isAuthenticated';
import GetCategoryController from '../controllers/GetCategoryController';
import DeleteCategoryController from '../controllers/DeleteCategoryController';
import { validate } from '../middlewares/validate';
import { idParams, categoryBody } from '../validators/schemas';

const categoryRoutes = Router();
const getCategoryController = new GetCategoryController();
const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoryRoutes.post(
  '/categories',
  isAuthenticated,
  validate('body', categoryBody),
  createCategoryController.handle.bind(createCategoryController)
);

categoryRoutes.put(
  '/categories/:id',
  isAuthenticated,
  validate('params', idParams),
  validate('body', categoryBody),
  updateCategoryController.handle.bind(updateCategoryController)
);

categoryRoutes.get(
  '/categories/:id',
  isAuthenticated,
  validate('params', idParams),
  getCategoryController.handle.bind(getCategoryController)
);

categoryRoutes.delete(
  '/categories/:id',
  isAuthenticated,
  validate('params', idParams),
  deleteCategoryController.handle.bind(deleteCategoryController)
);

export default categoryRoutes;