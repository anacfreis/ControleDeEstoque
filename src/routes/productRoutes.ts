
import { Router } from 'express';
import CreateProductController from '../controllers/CreateProductController';
import isAuthenticated from '../middlewares/isAuthenticated';
import upload from '../config/multer';
import UpdateProductController from '../controllers/UpdateProductController';
import GetProductsByCategoryController from '../controllers/GetProductsByCategoryController';
import GetAllProductsController from '../controllers/GetAllProductsController';
import DeleteProductController from '../controllers/DeleteProductController';

const productRoutes = Router();
const updateProductController = new UpdateProductController();
const createProductController = new CreateProductController();
const getProductsByCategoryController = new GetProductsByCategoryController();
const getAllProductsController = new GetAllProductsController();
const deleteProductController = new DeleteProductController();

productRoutes.post(
  '/products',
  isAuthenticated,
  upload.single('image'),
  createProductController.handle.bind(createProductController)
);

productRoutes.put(
  '/products/:id',
  isAuthenticated,
  upload.single('image'),
  updateProductController.handle.bind(updateProductController)
);

productRoutes.get(
  '/products/category/:categoryId',
  isAuthenticated,
  getProductsByCategoryController.handle.bind(getProductsByCategoryController)
);

productRoutes.get(
  '/products',
  isAuthenticated,
  getAllProductsController.handle.bind(getAllProductsController)
);

productRoutes.delete(
  '/products/:id',
  isAuthenticated,
  deleteProductController.handle.bind(deleteProductController)
);

export default productRoutes;
