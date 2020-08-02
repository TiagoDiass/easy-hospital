import { Router } from 'express';
import PatientController from '../controllers/PatientController';

const routes = new Router();

routes.get('/', PatientController.index);

//routes.get('/:id', PatientController.getOne)
//routes.put('/:id', PatientController.edit)
//routes.delete('/:id', PatientController.delete)

export default routes;
