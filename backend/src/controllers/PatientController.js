import knex from '../database/index';

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
}

export default new PatientController();
