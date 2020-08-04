import knex from '../database';

class PatientValidations {
  async checkIfExists(condition) {
    const [patient] = await knex('patients').where(condition).select('*');

    return patient ? true : false;
  }

  async checkIfExistsAndReturnId(condition) {
    const [patient] = await knex('patients').where(condition).select('*');

    if (patient) {
      return {
        exists: true,
        id: patient.id,
      };
    } else {
      return {
        exists: false,
      };
    }
  }
}

export default new PatientValidations();
