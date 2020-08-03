import knex from '../database/index';
import PatientValidations from '../validations/PatientValidations';

class PatientController {
  async index(req, res) {
    const patients = await knex.select('*').from('patients').orderBy('name');

    return res.json(patients);
  }

  async store(req, res) {
    const { name, email, phone, cpf, rg, birth, gender, weight, height, blood_type } = req.body;

    const newPatientId = await knex('patients').insert({
      name,
      email,
      phone,
      cpf,
      rg,
      birth,
      gender,
      weight,
      height,
      blood_type,
    });

    const [newPatient] = await knex('patients')
      .where({
        id: newPatientId,
      })
      .select('*');

    return res.status(201).json({
      status: 201,
      newPatient,
    });
  }

  async getOne(req, res) {
    const { id } = req.params;

    if (!(await PatientValidations.checkIfExists({ id }))) {
      return res.status(400).json({
        status: 400,
        erro: 'Não encontramos nenhum usuário com o ID informado',
      });
    }

    const [patient] = await knex('patients')
      .where({
        id,
      })
      .select('*');

    return res.json({
      status: 200,
      patient,
    });
  }
}

export default new PatientController();
