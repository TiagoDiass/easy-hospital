exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('patients')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('patients').insert([{
          name: 'Tiago Dias',
          email: 'tiago@gmail.com',
          phone: '+5519912341234',
          cpf: '76027927267',
          rg: '151414002',
          birth: '2001-12-12',
          gender: 'M',
          weight: 55.6,
          height: 175,
          blood_type: 'A+',
        },
        {
          name: 'Maria Paula',
          email: 'mariapaula@gmail.com',
          phone: '+5519990909090',
          cpf: '45797703157',
          rg: '287950566',
          birth: '2008-06-15',
          gender: 'F',
          weight: 37.6,
          height: 165,
          blood_type: 'B+',
        },
        {
          name: 'Lucas Lima',
          email: 'luquinhas@gmail.com',
          phone: '+551965656565',
          birth: '2003-08-27',
          cpf: '06902929459',
          rg: '233124925',
          gender: 'M',
          weight: 50.3,
          height: 169,
          blood_type: 'A-',
        },
      ]);
    });
};