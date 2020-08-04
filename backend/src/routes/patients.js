import { Router } from 'express';
import PatientController from '../controllers/PatientController';
import PatientsMiddlewares from '../middlewares/PatientsMiddlewares';

const routes = new Router();

routes.get('/', PatientController.index);
routes.post('/new', PatientsMiddlewares.validateDataOnCreate, PatientController.store);
routes.get('/:id', PatientController.getOne);
routes.put('/:id', PatientsMiddlewares.validateDataOnEdit, PatientController.edit);
routes.delete('/:id', PatientController.delete);

export default routes;
