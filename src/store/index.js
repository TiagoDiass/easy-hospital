import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import PatientsModule from './modules/patients.store';

export default new Vuex.Store({
  modules: { patients: PatientsModule },
});
