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
      <base-button @click="openCreateModal" class="w-100" type="primary">
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
          <!-- Name -->
          <base-input id="nome" label="Nome" v-model="form.name" class="col-lg-6" :required="true" />

          <!-- E-mail -->
          <base-input id="email" label="E-mail" class="col-lg-6" v-model="form.email" :required="true" />

          <!-- Phone -->
          <base-input
            id="phone"
            label="Telefone"
            class="col-lg-6"
            v-model="form.phone"
            :mask="['(##) # ####-####', '(##) ####-####']"
            :required="true"
          />

          <!-- CPF -->
          <base-input
            id="cpf"
            label="CPF"
            class="col-lg-6"
            v-model="form.cpf"
            :mask="'###.###.###-##'"
            placeholder="000.000.000-00"
            :required="true"
          />

          <!-- RG -->
          <base-input
            id="rg"
            label="RG"
            class="col-lg-6"
            v-model="form.rg"
            :mask="'##.###.###-#'"
            placeholder="00.000.000-0"
            :required="true"
          />

          <!-- Birth -->
          <base-input
            type="date"
            id="birth"
            label="Data de Nascimento"
            class="col-lg-6"
            v-model="form.birth"
            :required="true"
          />

          <!-- Gender -->
          <base-select id="gender" label="Sexo" class="col-lg-6" v-model="form.gender" :options="genderOptions" />

          <!-- Weight -->
          <base-input
            type="number"
            id="weight"
            label="Peso (Kg)"
            class="col-lg-6"
            v-model.number="form.weight"
            placeholder="Ex: 55,4"
            :required="true"
          />

          <!-- Height -->
          <base-input
            type="number"
            id="height"
            label="Altura (cm)"
            class="col-lg-6"
            v-model="form.height"
            placeholder="Ex: 175"
            :required="true"
          />

          <!-- Blood Type -->
          <base-select
            id="bloodType"
            label="Tipo Sanguíneo"
            class="col-lg-6"
            v-model="form.blood_type"
            :options="bloodTypeOptions"
          />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-6">
            <base-button type="secondary" class="col-12 icon-rotate" @click="closeModal('create')">
              Cancelar
              <i class="fas fa-times-circle"></i>
            </base-button>
          </div>

          <div class="col-6">
            <base-button
              @click="savePatient"
              type="primary"
              class="col-12 icon-rotate"
              :disabled="form.nome == 'Tiago'"
            >
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
      blood_type: 'N/A',
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

    bloodTypeOptions() {
      const newOption = (value, desc) => ({
        value,
        desc,
      });

      return [
        newOption('N/A', 'Não informado'),
        newOption('A+', 'A+'),
        newOption('A-', 'A-'),
        newOption('B+', 'B+'),
        newOption('B-', 'B-'),
        newOption('AB+', 'AB+'),
        newOption('AB-', 'AB-'),
        newOption('O+', 'O+'),
        newOption('O-', 'O-'),
      ];
    },
  },

  methods: {
    ...mapActions({
      loadPatients: 'patients/fetchPatients',
      newPatient: 'patients/newPatient',
    }),

    setForm({
      name = '',
      email = '',
      phone = '',
      cpf = '',
      rg = '',
      birth = '',
      gender = 'N/A',
      weight = '',
      height = '',
      blood_type = 'N/A',
    }) {
      this.form = {
        name,
        email,
        phone,
        cpf,
        rg,
        birth,
        gender,
        weight,
        height,
        blood_type,
      };
    },

    openCreateModal() {
      this.setForm({});
      this.modals.create = true;
    },

    closeModal(modalName) {
      this.$swal
        .fire({
          icon: 'warning',
          title: 'Tem certeza?',
          text: 'Após fechar o formulário, todos os dados nele contido serão perdidos',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: 'var(--danger)',
        })
        .then(result => {
          if (result.value) {
            this.modals[modalName] = false;
          }
        });
    },

    async savePatient() {
      const response = await this.newPatient(this.form);

      this.$swal.fire({
        icon: response.status == 201 ? 'success' : 'error',
        title: response.status == 201 ? 'Sucesso' : 'Ops...',
        text: response.message,
        onClose:
          response.status == 201
            ? () => {
                this.loadPatients();
                this.modals.create = false;
              }
            : () => {},
      });
    },

    firstName(fullName) {
      return fullName.split(' ')[0];
    },
  },

  watch: {},
};
</script>
