<template>
  <div class="patients view">
    <div class="view-header">
      <h1>Pacientes</h1>
      <p>
        Este é o módulo de <span class="text-primary text-bold">Pacientes</span>, onde você poderá fazer a gestão de
        todos os pacientes
      </p>
    </div>

    <div class="view-content">
      <input class="input-group-item mb-2" type="text" v-model="nome" />

      <base-button @click="alertar" class="w-100" type="primary" :disabled="nome == 'Tiago'">
        Clica
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nome: '',
  }),

  methods: {
    alertar() {
      console.log('manooo');
    },
  },
};
</script>

<style></style>
