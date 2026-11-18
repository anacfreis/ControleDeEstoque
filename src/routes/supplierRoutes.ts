
import { Router } from 'express';

import CreateSupplierController from '../controllers/CreateSupplierController';
import UpdateSupplierController from '../controllers/UpdateSupplierController';
import GetSupplierController from '../controllers/GetSupplierController';
import DeleteSupplierController from '../controllers/DeleteSupplierController';

import isAuthenticated from '../middlewares/isAuthenticated';

const supplierRoutes = Router();

const createSupplierController = new CreateSupplierController();
const updateSupplierController = new UpdateSupplierController();
const getSupplierController = new GetSupplierController();
const deleteSupplierController = new DeleteSupplierController();

supplierRoutes.post(
  '/suppliers',
  isAuthenticated,
  createSupplierController.handle.bind(createSupplierController)
);

supplierRoutes.put(
  '/suppliers/:id',
  isAuthenticated,
  updateSupplierController.handle.bind(updateSupplierController)
);

supplierRoutes.get(
  '/suppliers/:id',
  isAuthenticated,
  getSupplierController.handle.bind(getSupplierController)
);

supplierRoutes.delete(
  '/suppliers/:id',
  isAuthenticated,
  deleteSupplierController.handle.bind(deleteSupplierController)
);

export default supplierRoutes;
