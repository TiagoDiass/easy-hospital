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
        :rows="patients"
        :columns="[
          {
            label: 'Nome',
            field: 'name',
          },
          {
            label: 'E-mail',
            field: 'email',
          },
          {
            label: 'CPF',
            field: 'cpf-slot',
          },
          {
            label: 'Telefone',
            field: 'phone-slot',
          },
          {
            label: 'Ações',
            field: 'after',
          },
        ]"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'cpf-slot'">
            {{ props.row.cpf | cpf }}
          </span>

          <span v-else-if="props.column.field == 'phone-slot'">
            {{ props.row.phone | phone }}
          </span>

          <div
            v-else-if="props.column.field == 'after'"
            class="media-body text-rigth d-flex justify-content-around after-row"
          >
            <base-button type="whatsapp">
              <i class="fab fa-whatsapp"></i>
            </base-button>

            <base-button type="email">
              <i class="fas fa-envelope"></i>
            </base-button>

            <base-button type="purple">
              <i class="fas fa-eye"></i>
            </base-button>

            <base-button type="warning">
              <i class="fas fa-edit"></i>
            </base-button>

            <base-button type="danger">
              <i class="fas fa-trash-alt"></i>
            </base-button>
          </div>
        </template>
      </VueGoodTable>
    </div>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    VueGoodTable,
  },

  mounted() {
    this.loadPatients();
  },

  computed: {
    ...mapGetters({
      patients: 'patients/getPatients',
    }),
  },

  methods: {
    ...mapActions({
      loadPatients: 'patients/fetchPatients',
    }),

    alertar() {
      this.$swal({
        icon: 'info',
        title: 'Sucesso',
        text: 'Teste',
      });
    },
  },
};
</script>
