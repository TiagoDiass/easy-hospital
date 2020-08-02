import PatientsRoutes from './patients';

export default {
  loadRoutes(app) {
    app.use('/patients', PatientsRoutes);
  },
};
