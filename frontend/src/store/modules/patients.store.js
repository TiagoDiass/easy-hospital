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
