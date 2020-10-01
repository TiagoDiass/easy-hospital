import Vue from 'vue';

// Initial state
const initialState = () => ({
  patients: [],
  loading: false,
});

// State object
const state = initialState();

// Getters
const getters = {
  getPatients: state => state.patients,

  getLoadingState: state => state.loading,
};

// Actions
const actions = {
  async fetchPatients({ commit }) {
    commit('setLoadingState', true);
    const response = await Vue.prototype.$httpClient.get('/patients');
    commit('setPatients', response.data);
    commit('setLoadingState', false);
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

  async updatePatient(_, { id, name, email, phone, cpf, rg, birth, gender, weight, height, blood_type }) {
    const url = `/patients/${id}`;
    const response = await Vue.prototype.$httpClient.put(url, {
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

    return {
      status: response.data.status,
      message: response.data.status == 200 ? 'Os dados do paciente foram atualizados com sucesso' : response.data.erro,
    };
  },
};

// Mutations
const mutations = {
  setPatients(state, data) {
    state.patients = data;
  },

  setLoadingState(state, data) {
    state.loading = data;
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
