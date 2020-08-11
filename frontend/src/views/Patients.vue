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
      <base-button @click="abrirModalCriacao" class="w-100" type="primary">
        Cadastrar Paciente
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
          <base-input id="nome" label="Nome" v-model="form.name" class="col-lg-6" />
          <base-input id="email" label="E-mail" class="col-lg-6" v-model="form.email" />
          <base-input
            id="phone"
            label="Telefone"
            class="col-lg-6"
            v-model="form.phone"
            :mask="['(##) # ####-####', '(##) ####-####']"
          />
          <base-input id="cpf" label="CPF" class="col-lg-6" v-model="form.cpf" :mask="'###.###.###-##'" />
          <base-input id="rg" label="RG" class="col-lg-6" v-model="form.rg" :mask="'##.###.###-#'" />
          <base-input type="date" id="birth" label="Data de Nascimento" class="col-lg-6" v-model="form.birth" />
          <base-input id="birth" label="Data de Nascimento" class="col-lg-6" v-model="form.birth" />
          <base-select
            id="gender"
            label="Sexo"
            class="col-lg-6"
            v-model="form.gender"
            :options="genderOptions"
          ></base-select>
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
      name: '',
      email: '',
      phone: '',
      cpf: '',
      rg: '',
      birth: '',
      gender: 'N/A',
      weight: '',
      height: '',
      blood_type: '',
    },
  }),

  mounted() {
    this.loadPatients();
  },

  computed: {
    ...mapGetters({
      patients: 'patients/getPatients',
    }),

    genderOptions() {
      return [
        {
          value: 'N/A',
          desc: 'Não informado',
        },
        {
          value: 'M',
          desc: 'Masculino',
        },
        {
          value: 'F',
          desc: 'Feminino',
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      loadPatients: 'patients/fetchPatients',
    }),

    abrirModalCriacao() {
      this.modals.create = true;
    },

    firstName(fullName) {
      return fullName.split(' ')[0];
    },
  },

  watch: {},
};
</script>
