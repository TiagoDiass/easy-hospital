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
      <base-button @click="alertar" class="w-100" type="primary">
        Clica em mim
      </base-button>

      <VueGoodTable
        class="mt-3 w-100"
        :rows="rows"
        :columns="[
          {
            label: 'Nome',
            field: 'nome',
          },
          {
            label: 'Sobrenome',
            field: 'sobrenome',
          },
          {
            label: 'Idade',
            field: 'idade',
          },
        ]"
      >
      </VueGoodTable>
    </div>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';

export default {
  components: {
    VueGoodTable,
  },

  computed: {
    rows() {
      return [
        { nome: 'Tiago', sobrenome: 'Dias', idade: 18 },
        { nome: 'Moisés', sobrenome: 'Dias', idade: 20 },
        { nome: 'Lucas', sobrenome: 'Lima', idade: 16 },
        { nome: 'Maria', sobrenome: 'Paula', idade: 35 },
        { nome: 'Tiago', sobrenome: 'Dias', idade: 18 },
      ];
    },
  },

  methods: {
    alertar() {
      this.$swal({
        icon: 'warning',
        title: 'Sucesso',
        text: 'Yaaaay',
      });
    },
  },
};
</script>

<style></style>
