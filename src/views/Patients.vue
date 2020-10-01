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
    <BaseModal size="lg" :show.sync="modals.create">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Cadastrar Paciente
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div class="row">
          <!-- Name -->
          <BaseInput
            id="nome"
            label="Nome"
            v-model="$v.form.name.$model"
            class="col-lg-6"
            :required="true"
            :valid="!$v.form.name.$invalid"
            :error="$v.form.name.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.name.required">Nome é requerido</span>
              <span v-else-if="!$v.form.name.isNameValid">Nome deve conter duas palavras</span>
            </template>
          </BaseInput>

          <!-- E-mail -->
          <BaseInput
            id="email"
            label="E-mail"
            class="col-lg-6"
            v-model="$v.form.email.$model"
            :required="true"
            :valid="!$v.form.email.$invalid"
            :error="$v.form.email.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.email.required">E-mail é requerido</span>
              <span v-else-if="!$v.form.email.isEmail">E-mail inválido</span>
            </template>
          </BaseInput>

          <!-- Phone -->
          <BaseInput
            id="phone"
            label="Telefone"
            class="col-lg-6"
            v-model="$v.form.phone.$model"
            :mask="['(##) ####-####', '(##) #####-####']"
            :required="true"
            :valid="!$v.form.phone.$invalid"
            :error="$v.form.phone.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.phone.required">Número de telefone é requerido</span>
              <span v-else-if="!$v.form.phone.minLength">Número de telefone deve ter no mínimo 10 digítos</span>
            </template>
          </BaseInput>

          <!-- CPF -->
          <BaseInput
            id="cpf"
            label="CPF"
            class="col-lg-6"
            v-model="$v.form.cpf.$model"
            :mask="'###.###.###-##'"
            placeholder="000.000.000-00"
            :required="true"
            :valid="!$v.form.cpf.$invalid"
            :error="$v.form.cpf.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.cpf.required">CPF é requerido</span>
              <span v-else-if="!$v.form.cpf.minLength">CPF deve ter 11 dígitos</span>
            </template>
          </BaseInput>

          <!-- RG -->
          <BaseInput
            id="rg"
            label="RG"
            class="col-lg-6"
            v-model="$v.form.rg.$model"
            :mask="'##.###.###-#'"
            placeholder="00.000.000-0"
            :required="true"
            :valid="!$v.form.rg.$invalid"
            :error="$v.form.rg.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.rg.required">RG é requerido</span>
              <span v-else-if="!$v.form.rg.minLength">RG deve ter 9 dígitos</span>
            </template>
          </BaseInput>

          <!-- Birth -->
          <BaseInput
            type="date"
            id="birth"
            label="Data de Nascimento"
            class="col-lg-6"
            v-model="$v.form.birth.$model"
            :required="true"
            :valid="!$v.form.birth.$invalid"
            :error="$v.form.birth.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.birth.required || !$v.form.birth.minLength">Data de nascimento é requerido</span>
            </template>
          </BaseInput>

          <!-- Gender -->
          <BaseSelect
            id="gender"
            label="Sexo"
            class="col-lg-6"
            v-model="form.gender"
            :options="genderOptions"
            :valid="true"
          />

          <!-- Weight -->
          <BaseInput
            type="number"
            id="weight"
            label="Peso (Kg)"
            class="col-lg-6"
            v-model.number="$v.form.weight.$model"
            placeholder="Ex: 55,4"
            :required="true"
            :valid="!$v.form.weight.$invalid"
            :error="$v.form.weight.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.weight.required">Peso é requerido</span>
              <span v-else-if="!$v.form.weight.minValue">Peso não pode ser menor que 1</span>
            </template>
          </BaseInput>

          <!-- Height -->
          <BaseInput
            type="number"
            id="height"
            label="Altura (cm)"
            class="col-lg-6"
            v-model.number="$v.form.height.$model"
            placeholder="Ex: 175"
            :required="true"
            :valid="!$v.form.height.$invalid"
            :error="$v.form.height.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.height.required">Altura é requerida</span>
              <span v-else-if="!$v.form.height.minValue">Altura deve ser um número inteiro maior que 1</span>
            </template>
          </BaseInput>

          <!-- Blood Type -->
          <BaseSelect
            id="bloodType"
            label="Tipo Sanguíneo"
            class="col-lg-6"
            v-model="form.blood_type"
            :options="bloodTypeOptions"
            :valid="true"
          />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-lg-6 mb-1">
            <BaseButton type="secondary" class="col-12 icon-rotate" @click="closeModal('create')">
              Cancelar
              <i class="fas fa-times-circle"></i>
            </BaseButton>
          </div>

          <div class="col-lg-6 mb-1">
            <BaseButton @click="savePatient" type="primary" class="col-12 icon-rotate">
              Salvar
              <i class="fas fa-save ml-1"></i>
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal size="lg" :show.sync="modals.edit">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Editar Paciente
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div class="row">
          <!-- Name -->
          <BaseInput
            id="nome-edit"
            label="Nome"
            v-model="$v.form.name.$model"
            class="col-lg-6"
            :required="true"
            :valid="!$v.form.name.$invalid"
            :error="$v.form.name.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.name.required">Nome é requerido</span>
              <span v-else-if="!$v.form.name.isNameValid">Nome deve conter duas palavras</span>
            </template>
          </BaseInput>

          <!-- E-mail -->
          <BaseInput
            id="email-edit"
            label="E-mail"
            class="col-lg-6"
            v-model="$v.form.email.$model"
            :required="true"
            :valid="!$v.form.email.$invalid"
            :error="$v.form.email.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.email.required">E-mail é requerido</span>
              <span v-else-if="!$v.form.email.isEmail">E-mail inválido</span>
            </template>
          </BaseInput>

          <!-- Phone -->
          <BaseInput
            id="phone-edit"
            label="Telefone"
            class="col-lg-6"
            v-model="$v.form.phone.$model"
            :mask="['(##) ####-####', '(##) #####-####']"
            :required="true"
            :valid="!$v.form.phone.$invalid"
            :error="$v.form.phone.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.phone.required">Número de telefone é requerido</span>
              <span v-else-if="!$v.form.phone.minLength">Número de telefone deve ter no mínimo 10 digítos</span>
            </template>
          </BaseInput>

          <!-- CPF -->
          <BaseInput
            id="cpf-edit"
            label="CPF"
            class="col-lg-6"
            v-model="$v.form.cpf.$model"
            :mask="'###.###.###-##'"
            placeholder="000.000.000-00"
            :required="true"
            :valid="!$v.form.cpf.$invalid"
            :error="$v.form.cpf.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.cpf.required">CPF é requerido</span>
              <span v-else-if="!$v.form.cpf.minLength">CPF deve ter 11 dígitos</span>
            </template>
          </BaseInput>

          <!-- RG -->
          <BaseInput
            id="rg-edit"
            label="RG"
            class="col-lg-6"
            v-model="$v.form.rg.$model"
            :mask="'##.###.###-#'"
            placeholder="00.000.000-0"
            :required="true"
            :valid="!$v.form.rg.$invalid"
            :error="$v.form.rg.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.rg.required">RG é requerido</span>
              <span v-else-if="!$v.form.rg.minLength">RG deve ter 9 dígitos</span>
            </template>
          </BaseInput>

          <!-- Birth -->
          <BaseInput
            type="date-edit"
            id="birth"
            label="Data de Nascimento"
            class="col-lg-6"
            v-model="$v.form.birth.$model"
            :required="true"
            :valid="!$v.form.birth.$invalid"
            :error="$v.form.birth.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.birth.required || !$v.form.birth.minLength">Data de nascimento é requerido</span>
            </template>
          </BaseInput>

          <!-- Gender -->
          <BaseSelect
            id="gender-edit"
            label="Sexo"
            class="col-lg-6"
            v-model="form.gender"
            :options="genderOptions"
            :valid="true"
          />

          <!-- Weight -->
          <BaseInput
            type="number-edit"
            id="weight"
            label="Peso (Kg)"
            class="col-lg-6"
            v-model.number="$v.form.weight.$model"
            placeholder="Ex: 55,4"
            :required="true"
            :valid="!$v.form.weight.$invalid"
            :error="$v.form.weight.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.weight.required">Peso é requerido</span>
              <span v-else-if="!$v.form.weight.minValue">Peso não pode ser menor que 1</span>
            </template>
          </BaseInput>

          <!-- Height -->
          <BaseInput
            type="number-edit"
            id="height"
            label="Altura (cm)"
            class="col-lg-6"
            v-model.number="$v.form.height.$model"
            placeholder="Ex: 175"
            :required="true"
            :valid="!$v.form.height.$invalid"
            :error="$v.form.height.$error"
          >
            <template slot="errorBlock">
              <span v-if="!$v.form.height.required">Altura é requerida</span>
              <span v-else-if="!$v.form.height.minValue">Altura deve ser um número inteiro maior que 1</span>
            </template>
          </BaseInput>

          <!-- Blood Type -->
          <BaseSelect
            id="bloodType-edit"
            label="Tipo Sanguíneo"
            class="col-lg-6"
            v-model="form.blood_type"
            :options="bloodTypeOptions"
            :valid="true"
          />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-lg-6 mb-1">
            <BaseButton type="secondary" class="col-12 icon-rotate" @click="closeModal('edit')">
              Cancelar
              <i class="fas fa-times-circle"></i>
            </BaseButton>
          </div>

          <div class="col-lg-6 mb-1">
            <BaseButton @click="editPatient" type="primary" class="col-12 icon-rotate">
              Atualizar
              <i class="fas fa-sync"></i>
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>

    <!-- View modal -->
    <BaseModal size="lg" :show.sync="modals.view">
      <template slot="modal-header">
        <h4 class="modal-title text-uppercase text-bold">
          Visualizar Paciente
          <i class="fas fa-users"></i>
        </h4>
      </template>

      <template slot="modal-body">
        <div class="row">
          <!-- Name -->
          <BaseInput id="nome-view" label="Nome" :value="form.name" class="col-lg-6" readonly />

          <!-- E-mail -->
          <BaseInput id="email-view" label="E-mail" class="col-lg-6" :value="form.email" readonly />

          <!-- Phone -->
          <BaseInput
            id="phone-view"
            label="Telefone"
            class="col-lg-6"
            :value="form.phone"
            :mask="['+55 (##) # ####-####', '+55 (##) ####-####']"
            readonly
          />

          <!-- CPF -->
          <BaseInput
            id="cpf-view"
            label="CPF"
            class="col-lg-6"
            :value="form.cpf"
            :mask="'###.###.###-##'"
            placeholder="000.000.000-00"
            readonly
          />

          <!-- RG -->
          <BaseInput
            id="rg-view"
            label="RG"
            class="col-lg-6"
            :value="form.rg"
            :mask="'##.###.###-#'"
            placeholder="00.000.000-0"
            readonly
          />

          <!-- Birth -->
          <BaseInput
            type="date"
            id="birth-view"
            label="Data de Nascimento"
            class="col-lg-6"
            :value="form.birth"
            readonly
          />

          <!-- Gender -->
          <BaseInput id="gender-view" label="Sexo" class="col-lg-6" :value="getGender()" readonly />

          <!-- Weight -->
          <BaseInput
            type="number"
            id="weight-view"
            label="Peso (Kg)"
            class="col-lg-6"
            :value="form.weight"
            placeholder="Ex: 55,4"
            readonly
          />

          <!-- Height -->
          <BaseInput
            type="number"
            id="height-view"
            label="Altura (cm)"
            class="col-lg-6"
            :value="form.height"
            placeholder="Ex: 175"
            readonly
          />

          <!-- Blood Type -->
          <BaseInput id="bloodType-view" label="Tipo Sanguíneo" class="col-lg-6" :value="form.blood_type" readonly />
        </div>
      </template>

      <template slot="modal-footer">
        <div class="row d-flex justify-content-around">
          <div class="col-12">
            <BaseButton type="primary" class="col-12 icon-rotate" @click="modals.view = false">
              Fechar
              <i class="fas fa-times-circle"></i>
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import { mapGetters, mapActions } from 'vuex';
import { required, email, minLength, minValue } from 'vuelidate/lib/validators';

import { Validations } from '../utils';

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
      this.setForm({ ...patientData, birth: patientData.birth.split('T')[0] });
      this.modals.view = true;
    },

    openEditModal(patientData) {
      this.setForm({
        ...patientData,
        phone: patientData.phone.replace('+55', ''),
        birth: patientData.birth.split('T')[0],
      });

      this.modals.edit = true;
    },

    closeModal(modalName) {
      this.$swal
        .fire({
          icon: 'warning',
          title: 'Tem certeza?',
          text: 'Após fechar o formulário, todos os dados nele contido serão perdidos',
          confirmButtonText: 'Sim',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: 'var(--danger)',
          reverseButtons: true,
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

  validations: {
    form: {
      name: {
        required,
        isNameValid: Validations.nameValidation,
      },

      email: {
        required,
        isEmail: email,
      },

      phone: {
        required,
        minLength: minLength(10),
      },

      cpf: {
        required,
        minLength: minLength(11),
      },

      rg: {
        required,
        minLength: minLength(9),
      },

      birth: {
        required,
        minLength: minLength(10),
      },

      weight: {
        required,
        minValue: minValue(1),
      },

      height: {
        required,
        minValue: minValue(1),
      },
    },
  },
};
</script>
