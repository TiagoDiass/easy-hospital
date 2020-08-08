import Vue from 'vue';

Vue.filter('cpf', cpfUnmasked => {
  const cpfArray = cpfUnmasked.split('');
  cpfArray.splice(3, 0, '.');
  cpfArray.splice(7, 0, '.');
  cpfArray.splice(11, 0, '-');

  return cpfArray.join('');
});

Vue.filter('phone', phoneUnmasked => {
  const phoneArray = phoneUnmasked.split('');

  if (phoneUnmasked.length == 13) {
    phoneArray.splice(3, 0, ' ');
    phoneArray.splice(4, 0, '(');
    phoneArray.splice(7, 0, ')');
    phoneArray.splice(8, 0, ' ');
    phoneArray.splice(13, 0, '-');
  } else {
    phoneArray.splice(3, 0, ' ');
    phoneArray.splice(4, 0, '(');
    phoneArray.splice(7, 0, ')');
    phoneArray.splice(8, 0, ' ');
    phoneArray.splice(10, 0, ' ');
    phoneArray.splice(15, 0, '-');
  }

  return phoneArray.join('');
});
