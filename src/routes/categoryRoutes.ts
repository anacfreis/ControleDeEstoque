
import { Router } from 'express';
import CreateCategoryController from '../controllers/CreateCategoryController';
import UpdateCategoryController from '../controllers/UpdateCategoryController';
import isAuthenticated from '../middlewares/isAuthenticated';
import GetCategoryController from '../controllers/GetCategoryController';
import DeleteCategoryController from '../controllers/DeleteCategoryController';

const categoryRoutes = Router();
const getCategoryController = new GetCategoryController();
const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoryRoutes.post(
  '/categories',
  isAuthenticated,
  createCategoryController.handle.bind(createCategoryController)
);

categoryRoutes.put(
  '/categories/:id',
  isAuthenticated,
  updateCategoryController.handle.bind(updateCategoryController)
);

categoryRoutes.get(
  '/categories/:id',
  isAuthenticated,
  getCategoryController.handle.bind(getCategoryController)
);

categoryRoutes.delete(
  '/categories/:id',
  isAuthenticated,
  deleteCategoryController.handle.bind(deleteCategoryController)
);

export default categoryRoutes;
