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
            <a
              target="_blank"
              :href="
                `https://api.whatsapp.com/send?phone=${props.row.phone}&text=Ol%C3%A1%20${firstName(props.row.name)}!`
              "
              class="btn btn-whatsapp"
            >
              <i class="fab fa-whatsapp"></i>
            </a>

            <a target="_blank" :href="`mailto:${props.row.email}`" class="btn btn-email">
              <i class="fas fa-envelope"></i>
            </a>

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

    <!-- Modals -->
    <base-modal size="lg" :show.sync="modals.create">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Cadastrar Paciente
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div class="row">
          <base-input id="nome" label="Nome" v-model="form.nome" class="col-6" />
          <base-input id="cpf" label="CPF" class="col-6" v-model="form.cpf" :mask="'###.###.###-##'" :masked="true" />
          <base-input id="cep" label="CEP" class="col-4" v-model="form.cep" :mask="'#####-###'" />
          <base-input id="email" label="E-mail" class="col-8" v-model="form.email" />
          <base-input
            id="phone"
            label="Telefone"
            class="col-lg-6"
            v-model="form.phone"
            :mask="['+55 (##) # ####-####', '+55 (##) ####-####']"
          />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-6">
            <base-button type="secondary" class="col-12 icon-rotate" @click="modals.create = false">
              Cancelar
              <i class="fas fa-times-circle"></i>
            </base-button>
          </div>

          <div class="col-6">
            <base-button type="primary" class="col-12 icon-rotate" :disabled="form.nome == 'Tiago'">
              Salvar
              <i class="fas fa-save ml-1"></i>
            </base-button>
          </div>
        </div>
      </template>
    </base-modal>
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

  data: () => ({
    modals: {
      create: false,
    },

    form: {
      nome: '',
      cpf: '',
      cep: '',
      email: '',
      phone: '',
    },
  }),

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
      this.modals.create = true;
    },

    firstName(fullName) {
      return fullName.split(' ')[0];
    },
  },

  watch: {
    'form.nome': function(newValue) {
      console.log(newValue);
    },

    'form.cpf': function(newValue) {
      console.log(newValue);
    },

    'form.phone': function(newValue) {
      console.log(newValue);
    },
  },
};
</script>
