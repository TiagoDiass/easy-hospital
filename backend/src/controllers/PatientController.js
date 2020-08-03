import knex from '../database/index';
import PatientValidations from '../validations/PatientValidations';

class PatientController {
  async index(req, res) {
    const patients = await knex.select('*').from('patients').orderBy('name');

    return res.json(patients);
  }

  async store(req, res) {
    return res.json({
      ok: true,
    });
  }
}

export default new PatientController();
