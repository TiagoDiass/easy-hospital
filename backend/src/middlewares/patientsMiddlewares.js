import * as Yup from 'yup';
import PatientValidations from '../validations/PatientValidations';

class PatientsMiddlewares {
  async validateData(req, res, next) {
    const { email, phone, cpf, rg } = req.body;

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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
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
      return res.status(400).json({
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
      return res.status(400).json({
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
      return res.status(400).json({
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
      return res.status(400).json({
        status: 400,
        erro: 'Já existe um usuário com este RG',
      });
    }

    // If we didn't enter in any of these ifs, we're gonna call the next(), which is the endpoint
    next();
  }
}

export default new PatientsMiddlewares();
