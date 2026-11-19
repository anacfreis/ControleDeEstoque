import { Router } from 'express';
import CreateProductController from '../controllers/CreateProductController';
import isAuthenticated from '../middlewares/isAuthenticated';
import upload from '../config/multer';
import UpdateProductController from '../controllers/UpdateProductController';
import GetProductsByCategoryController from '../controllers/GetProductsByCategoryController';
import GetAllProductsController from '../controllers/GetAllProductsController';
import DeleteProductController from '../controllers/DeleteProductController';
import GetProductController from '../controllers/GetProductController';
import { validate } from '../middlewares/validate';
import { idParams, categoryIdParams, productBody } from '../validators/schemas';

const productRoutes = Router();
const updateProductController = new UpdateProductController();
const createProductController = new CreateProductController();
const getProductsByCategoryController = new GetProductsByCategoryController();
const getAllProductsController = new GetAllProductsController();
const deleteProductController = new DeleteProductController();
const getProductController = new GetProductController();

productRoutes.post(
  '/products',
  isAuthenticated,
  upload.single('image'),
  validate('body', productBody),
  createProductController.handle.bind(createProductController)
);

productRoutes.put(
  '/products/:id',
  isAuthenticated,
  upload.single('image'),
  validate('params', idParams),
  validate('body', productBody),
  updateProductController.handle.bind(updateProductController)
);

productRoutes.get(
  '/products/category/:categoryId',
  isAuthenticated,
  validate('params', categoryIdParams),
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
  validate('params', idParams),
  deleteProductController.handle.bind(deleteProductController)
);

productRoutes.get(
  '/products/:id',
  isAuthenticated,
  validate('params', idParams),
  getProductController.handle.bind(getProductController)
);

export default productRoutes;