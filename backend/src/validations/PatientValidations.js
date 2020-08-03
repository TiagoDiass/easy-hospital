import knex from '../database';

class PatientValidations {
  async checkIfExists(condition) {
    const [patient] = await knex('patients').where(condition).select('*');

    return patient ? true : false;
  }
}

export default new PatientValidations();
