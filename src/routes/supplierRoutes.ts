import { Router } from 'express';

import CreateSupplierController from '../controllers/CreateSupplierController';
import UpdateSupplierController from '../controllers/UpdateSupplierController';
import GetSupplierController from '../controllers/GetSupplierController';
import DeleteSupplierController from '../controllers/DeleteSupplierController';

import isAuthenticated from '../middlewares/isAuthenticated';
import { validate } from '../middlewares/validate';
import { idParams, supplierBody } from '../validators/schemas';

const supplierRoutes = Router();

const createSupplierController = new CreateSupplierController();
const updateSupplierController = new UpdateSupplierController();
const getSupplierController = new GetSupplierController();
const deleteSupplierController = new DeleteSupplierController();

supplierRoutes.post(
  '/suppliers',
  isAuthenticated,
  validate('body', supplierBody),
  createSupplierController.handle.bind(createSupplierController)
);

supplierRoutes.put(
  '/suppliers/:id',
  isAuthenticated,
  validate('params', idParams),
  validate('body', supplierBody),
  updateSupplierController.handle.bind(updateSupplierController)
);

supplierRoutes.get(
  '/suppliers/:id',
  isAuthenticated,
  validate('params', idParams),
  getSupplierController.handle.bind(getSupplierController)
);

supplierRoutes.delete(
  '/suppliers/:id',
  isAuthenticated,
  validate('params', idParams),
  deleteSupplierController.handle.bind(deleteSupplierController)
);

export default supplierRoutes;