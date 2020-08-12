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
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 8,
          position: 'bottom',
          perPageDropdown: [4, 8, 16],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'Próxima',
          prevLabel: 'Anterior',
          rowsPerPageLabel: 'Registros por página',
          ofLabel: 'de',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'Todos',
        }"
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
                `https://api.whatsapp.com/send?phone=${props.row.phone}&text=Ol%C3%A1%20${getFirstName(
                  props.row.name
                )}!`
              "
              class="btn btn-whatsapp mr-1"
            >
              <i class="fab fa-whatsapp"></i>
            </a>

            <a target="_blank" :href="`mailto:${props.row.email}`" class="btn btn-email mr-1">
              <i class="fas fa-envelope"></i>
            </a>

            <base-button type="purple" @click="openViewModal(props.row)" class="mr-1">
              <i class="fas fa-eye"></i>
            </base-button>

            <base-button type="warning" class="mr-1" @click="openEditModal(props.row)">
              <i class="fas fa-edit"></i>
            </base-button>

            <base-button type="danger" @click="deletePatient(props.row.id)">
              <i class="fas fa-trash-alt ml-1"></i>
            </base-button>
          </div>
        </template>
      </VueGoodTable>
    </div>

    <!-- Create Modal -->
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
          <div class="col-lg-6 mb-1">
            <base-button type="secondary" class="col-12 icon-rotate" @click="closeModal('create')">
              Cancelar
              <i class="fas fa-times-circle"></i>
            </base-button>
          </div>

          <div class="col-lg-6 mb-1">
            <base-button @click="savePatient" type="primary" class="col-12 icon-rotate">
              Salvar
              <i class="fas fa-save ml-1"></i>
            </base-button>
          </div>
        </div>
      </template>
    </base-modal>

    <!-- View modal -->
    <base-modal size="lg" :show.sync="modals.view">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar Paciente
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div class="row">
          <!-- Name -->
          <base-input id="nome-view" label="Nome" :value="form.name" class="col-lg-6" readonly />

          <!-- E-mail -->
          <base-input id="email-view" label="E-mail" class="col-lg-6" :value="form.email" readonly />

          <!-- Phone -->
          <base-input
            id="phone-view"
            label="Telefone"
            class="col-lg-6"
            :value="form.phone"
            :mask="['+55 (##) # ####-####', '+55 (##) ####-####']"
            readonly
          />

          <!-- CPF -->
          <base-input
            id="cpf-view"
            label="CPF"
            class="col-lg-6"
            :value="form.cpf"
            :mask="'###.###.###-##'"
            placeholder="000.000.000-00"
            readonly
          />

          <!-- RG -->
          <base-input
            id="rg-view"
            label="RG"
            class="col-lg-6"
            :value="form.rg"
            :mask="'##.###.###-#'"
            placeholder="00.000.000-0"
            readonly
          />

          <!-- Birth -->
          <base-input
            type="date"
            id="birth-view"
            label="Data de Nascimento"
            class="col-lg-6"
            :value="form.birth"
            readonly
          />

          <!-- Gender -->
          <base-input id="gender-view" label="Sexo" class="col-lg-6" :value="getGender()" readonly />

          <!-- Weight -->
          <base-input
            type="number"
            id="weight-view"
            label="Peso (Kg)"
            class="col-lg-6"
            :value="form.weight"
            placeholder="Ex: 55,4"
            readonly
          />

          <!-- Height -->
          <base-input
            type="number"
            id="height-view"
            label="Altura (cm)"
            class="col-lg-6"
            :value="form.height"
            placeholder="Ex: 175"
            readonly
          />

          <!-- Blood Type -->
          <base-input id="bloodType-view" label="Tipo Sanguíneo" class="col-lg-6" :value="form.blood_type" readonly />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-12">
            <base-button type="primary" class="col-12 icon-rotate" @click="modals.view = false">
              Fechar
              <i class="fas fa-times-circle"></i>
            </base-button>
          </div>
        </div>
      </template>
    </base-modal>

    <!-- Edit Modal -->
    <base-modal size="lg" :show.sync="modals.edit">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Editar Paciente
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div class="row">
          <!-- Name -->
          <base-input id="nome-edit" label="Nome" v-model="form.name" class="col-lg-6" :required="true" />

          <!-- E-mail -->
          <base-input id="email-edit" label="E-mail" class="col-lg-6" v-model="form.email" :required="true" />

          <!-- Phone -->
          <base-input
            id="phone-edit"
            label="Telefone"
            class="col-lg-6"
            v-model="form.phone"
            :mask="['(##) # ####-####', '(##) ####-####']"
            :required="true"
          />

          <!-- CPF -->
          <base-input
            id="cpf-edit"
            label="CPF"
            class="col-lg-6"
            v-model="form.cpf"
            :mask="'###.###.###-##'"
            placeholder="000.000.000-00"
            :required="true"
          />

          <!-- RG -->
          <base-input
            id="rg-edit"
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
            id="birth-edit"
            label="Data de Nascimento"
            class="col-lg-6"
            v-model="form.birth"
            :required="true"
          />

          <!-- Gender -->
          <base-select id="gender-edit" label="Sexo" class="col-lg-6" v-model="form.gender" :options="genderOptions" />

          <!-- Weight -->
          <base-input
            type="number"
            id="weight-edit"
            label="Peso (Kg)"
            class="col-lg-6"
            v-model.number="form.weight"
            placeholder="Ex: 55,4"
            :required="true"
          />

          <!-- Height -->
          <base-input
            type="number"
            id="height-edit"
            label="Altura (cm)"
            class="col-lg-6"
            v-model="form.height"
            placeholder="Ex: 175"
            :required="true"
          />

          <!-- Blood Type -->
          <base-select
            id="bloodType-edit"
            label="Tipo Sanguíneo"
            class="col-lg-6"
            v-model="form.blood_type"
            :options="bloodTypeOptions"
          />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-lg-6 mb-1">
            <base-button type="secondary" class="col-12 icon-rotate" @click="closeModal('edit')">
              Cancelar
              <i class="fas fa-times-circle"></i>
            </base-button>
          </div>

          <div class="col-lg-6 mb-1">
            <base-button @click="editPatient" type="primary" class="col-12 icon-rotate">
              Atualizar
              <i class="fas fa-sync"></i>
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
      view: false,
      edit: false,
    },

    form: {
      id: '',
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
      updatePatient: 'patients/updatePatient',
      deletePatientAction: 'patients/deletePatient',
    }),

    setForm({
      id = '',
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
        id,
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

    openViewModal(patientData) {
      this.setForm(patientData);
      this.modals.view = true;
    },

    openEditModal(patientData) {
      this.setForm({
        ...patientData,
        phone: patientData.phone.replace('+55', ''),
      });

      this.modals.edit = true;
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

    async editPatient() {
      const response = await this.updatePatient(this.form);

      this.$swal.fire({
        icon: response.status == 200 ? 'success' : 'error',
        title: response.status == 200 ? 'Sucesso' : 'Ops...',
        text: response.message,
        onClose:
          response.status == 200
            ? () => {
                this.modals.edit = false;
                this.loadPatients();
              }
            : () => {},
      });
    },

    async deletePatient(id) {
      this.$swal
        .fire({
          icon: 'warning',
          title: 'Tem certeza?',
          text: 'Após deletar um paciente, os dados dele não poderão ser recuperados',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: 'var(--danger)',
        })
        .then(async result => {
          if (result.value) {
            const response = await this.deletePatientAction(id);

            this.$swal.fire({
              icon: response.status == 200 ? 'success' : 'error',
              title: response.status == 200 ? 'Sucesso' : 'Ops...',
              text: response.message,
              onClose:
                response.status == 200
                  ? () => {
                      this.loadPatients();
                    }
                  : () => {},
            });
          } else {
            this.$swal.fire({
              icon: 'info',
              title: 'Tudo bem',
              text: 'O paciente não foi excluído',
            });
          }
        });
    },

    getFirstName(fullName) {
      return fullName.split(' ')[0];
    },

    getGender() {
      let genderDesc;

      switch (this.form.gender) {
        case 'M':
          genderDesc = 'Masculino';
          break;
        case 'F':
          genderDesc = 'Feminino';
          break;
        case 'N/A':
          genderDesc = 'N/A';
          break;
      }

      return genderDesc;
    },
  },
};
</script>
