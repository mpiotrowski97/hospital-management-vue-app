<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <div style="margin-bottom: 10px;">
                <router-link class="btn btn-primary" :to="{name: 'dashboard.patients.create'}">
                    Dodaj pacjenta
                </router-link>
            </div>
            <table class="table table-responsive">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Data urodzenia</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="patient of patients" :key="`patient-${patient.id}`">
                    <td>{{ patient.id }}</td>
                    <td>{{ patient.user.firstName }}</td>
                    <td>{{ patient.user.lastName }}</td>
                    <td>{{ patient.bornAt}}</td>
                    <td>
                        <router-link class="btn btn-info" :to="{name: 'dashboard.patients.preview', params: {id: patient.id}}">
                            Podgląd
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
  import axios from 'axios';
  import Spinner from "../../../components/shared/Spinner";

  export default {
    name: "PatientsList",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        patients: []
      }
    },
    mounted() {
      this.isLoading = true

      axios
        .get('patients')
        .then(response => {
          if (!response.data['_embedded'] || !response.data['_embedded']['patientList']) {
            return;
          }
          this.patients = response.data['_embedded']['patientList']
        })
        .finally(() => this.isLoading = false);
    }
  }
</script>

<style scoped>

</style>
