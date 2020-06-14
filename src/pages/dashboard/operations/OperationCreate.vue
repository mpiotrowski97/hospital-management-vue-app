<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-else>
            <validation-observer v-slot="{invalid}">
                <form @submit.prevent="submitForm">
                    <validation-provider v-slot="{errors}" rules="required">
                        <div class="form-group">
                            <label for="name">Nazwa</label>
                            <input type="text" class="form-control" name="name"
                                   id="name" :class="{'is-invalid':errors.length}"
                                   v-model="operation.name">
                            <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                        </div>
                    </validation-provider>

                    <validation-provider v-slot="{errors}" rules="required">

                        <div class="form-group">
                            <label for="scheduledFor">Termin</label>
                            <datepicker v-model="operation.scheduledFor" class="" id="scheduledFor" :language="pl"
                                        format="yyyy-MM-dd 00:00"/>
                            <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                        </div>
                    </validation-provider>

                    <div class="form-group">
                        <validation-provider v-slot="{errors}" rules="required">
                            <label for="doctor-select">Doktor</label>
                            <select class="form-control" id="doctor-select" v-model="operation.doctorId">
                                <option :value="null">Wybierz...</option>
                                <option v-for="doctor of doctors" :key="`doctor-${doctor.id}`" :value="doctor.id">
                                    {{ doctor.user.firstName }} {{ doctor.user.lastName }}
                                </option>
                            </select>
                            <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                        </validation-provider>
                    </div>

                    <div class="form-group">
                        <validation-provider v-slot="{errors}" rules="required">
                            <label for="patient-select">Pacjent</label>
                            <select class="form-control" id="patient-select" v-model="operation.patientId">
                                <option :value="null">Wybierz...</option>
                                <option v-for="patient of patients" :key="`patient-${patient.id}`" :value="patient.id">
                                    {{ patient.user.firstName }} {{ patient.user.lastName }}
                                </option>
                            </select>
                            <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                        </validation-provider>
                    </div>

                    <div>
                        <button type="submit" class="btn btn-primary" :disabled="invalid">Zapisz</button>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import Spinner from "../../../components/shared/Spinner";
  import {pl} from "vuejs-datepicker/dist/locale";
  import moment from "moment";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";

  export default {
    name: "OperationCreate",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        patients: [],
        doctors: [],
        pl: pl,
        operation: {
          name: null,
          scheduledFor: null,
          doctorId: null,
          patientId: null
        }
      }
    },
    mounted() {
      const doctorPromise = axios
        .get('/doctors')
        .then(response => {
          if (!response.data['_embedded'] || !response.data['_embedded']['doctorList']) {
            return;
          }

          this.doctors = response.data['_embedded']['doctorList']
        });

      const patientPromise = axios
        .get('/patients')
        .then(response => {
          if (!response.data['_embedded'] || !response.data['_embedded']['patientList']) {
            return;
          }
          this.patients = response.data['_embedded']['patientList']
        });

      Promise.all([doctorPromise, patientPromise])
        .finally(() => this.isLoading = false);

    },
    methods: {
      submitForm() {
        this.isLoading = true;

        const request = {
          ...this.operation, ...{
            scheduledFor: this.operation.scheduledFor ? moment(this.operation.scheduledFor).format('YYYY-MM-DD HH:m') : null
          }
        }

        axios.post('/operations', request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano operacje'})
            this.$router.push({name: 'dashboard.operations.list'})
          })
          .catch((error) => this.$store.commit(NOTIFICATIONS_PUSH, {
            type: 'danger',
            message: error.response.data.message
          }))
          .finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style scoped>

</style>
