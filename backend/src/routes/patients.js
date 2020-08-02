import { Router } from 'express';
import PatientController from '../controllers/PatientController';

const routes = new Router();

routes.get('/', PatientController.index);

export default routes;
