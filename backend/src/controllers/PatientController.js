import knex from '../database/index';

class PatientController {
  async index(req, res) {
    const patients = await knex.select('*').from('patients').orderBy('name');

    return res.json(patients);
  }
}

export default new PatientController();