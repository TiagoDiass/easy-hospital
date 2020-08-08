import Vue from 'vue';
import swal from 'sweetalert';

Vue.use({
  install(Vue) {
    Vue.prototype.$swal = swal;
  },
});
