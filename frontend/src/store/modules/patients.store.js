import Vue from 'vue';

// Initial state
const initialState = () => ({
  patients: [],
});

// State object
const state = initialState();

// Getters
const getters = {
  getPatients(state) {
    return state.patients;
  },
};

// Actions
const actions = {
  async fetchPatients({ commit }) {
    const response = await Vue.prototype.$httpClient.get('/patients');
    commit('setPatients', response.data);
  },

  async newPatient(_, { name, email, phone, cpf, rg, birth, gender, weight, height, blood_type }) {
    const response = await Vue.prototype.$httpClient.post('/patients/new', {
      name,
      email,
      phone: `+55${phone}`,
      cpf,
      rg,
      birth,
      gender,
      weight,
      height,
      blood_type,
    });

    if (response.data.status == 201) {
      return {
        status: 201,
        message: 'Paciente cadastrado com sucesso',
      };
    } else {
      return {
        status: response.data.status,
        message: response.data.erro,
      };
    }
  },

  async deletePatient(_, id) {
    const url = `/patients/${id}`;
    const response = await Vue.prototype.$httpClient.delete(url);

    return {
      status: response.data.status,
      message: response.data.status == 200 ? response.data.mensagem : response.data.erro,
    };
  },
};

// Mutations
const mutations = {
  setPatients(state, data) {
    state.patients = data;
  },
};

// Exporting module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
