import * as Yup from 'yup';
import PatientValidations from '../validations/PatientValidations';
import knex from '../database';

// Creating a schema to check if the request body is valid
const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required().min(13).max(14),
  cpf: Yup.string().required().min(11).max(11),
  rg: Yup.string().required().min(9).max(9),
  birth: Yup.date().required(),
  gender: Yup.string().required().oneOf(['M', 'F', 'N/A']),
  weight: Yup.number().required(),
  height: Yup.number().required().integer(),
  blood_type: Yup.string().required(),
});

class PatientsMiddlewares {
  async validateDataOnCreate(req, res, next) {
    const { email, phone, cpf, rg } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.json({
        status: 400,
        erro: 'A validação do formulário falhou, revise o preenchimento dos campos',
      });
    }

    // Checking if exists an user with the e-mail sent on the req.body
    if (
      await PatientValidations.checkIfExists({
        email,
      })
    ) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com este e-mail',
      });
    }

    // Checking if exists an user with phone sent on the req.body
    if (
      await PatientValidations.checkIfExists({
        phone,
      })
    ) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com este número de telefone',
      });
    }

    // Checking if exists an user with the CPF sent on the req.body
    if (
      await PatientValidations.checkIfExists({
        cpf,
      })
    ) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com este CPF',
      });
    }

    // Checking if exists an user with the RG sent on the req.body
    if (
      await PatientValidations.checkIfExists({
        rg,
      })
    ) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com este RG',
      });
    }

    // If we didn't enter in any of these ifs, we're gonna call the next(), which is the endpoint
    next();
  }

  async validateDataOnEdit(req, res, next) {
    const { id } = req.params;
    const { email, phone, cpf, rg } = req.body;

    if (
      !(await PatientValidations.checkIfExists({
        id,
      }))
    ) {
      return res.json({
        status: 400,
        erro: 'Não encontramos nenhum usuário com o ID informado',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.json({
        status: 400,
        erro: 'A validação do formulário falhou, revise o preenchimento dos campos',
      });
    }

    const [patient] = await knex('patients')
      .where({
        id,
      })
      .select('*');

    const checkings = {
      byEmail: await PatientValidations.checkIfExistsAndReturnId({
        email,
      }),
      byCpf: await PatientValidations.checkIfExistsAndReturnId({
        cpf,
      }),
      byRg: await PatientValidations.checkIfExistsAndReturnId({
        rg,
      }),
      byPhone: await PatientValidations.checkIfExistsAndReturnId({
        phone,
      }),
    };

    if (checkings.byEmail.exists && checkings.byEmail.id !== patient.id) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com esse e-mail',
      });
    }

    if (checkings.byCpf.exists && checkings.byCpf.id !== patient.id) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com esse CPF',
      });
    }

    if (checkings.byRg.exists && checkings.byRg.id !== patient.id) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com esse RG',
      });
    }

    if (checkings.byPhone.exists && checkings.byPhone.id !== patient.id) {
      return res.json({
        status: 400,
        erro: 'Já existe um usuário com esse número de telefone',
      });
    }

    next();
  }
}

export default new PatientsMiddlewares();
