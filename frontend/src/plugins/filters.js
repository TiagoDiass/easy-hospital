import Vue from 'vue';

Vue.filter('cpf', cpfUnmasked => {
  const cpfArray = cpfUnmasked.split('');
  cpfArray.splice(3, 0, '.');
  cpfArray.splice(7, 0, '.');
  cpfArray.splice(11, 0, '-');

  return cpfArray.join('');
});
