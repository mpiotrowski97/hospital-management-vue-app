<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <h3>Dane pacjenta</h3>

            <user-details :user="patient.user">
                <tr>
                    <td>Urodzony dnia</td>
                    <td>{{ patient.bornAt }}</td>
                </tr>
            </user-details>

        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import Spinner from "../../../components/shared/Spinner";
  import UserDetails from "../../../components/shared/UserDetails";

  export default {
    name: "PatientPreview",
    components: {UserDetails, Spinner},
    data() {
      return {
        isLoading: true,
        patient: null
      }
    },
    mounted() {
      axios.get(`/patients/${this.$route.params.id}`)
        .then(response => this.patient = response.data)
        .finally(() => this.isLoading = false);
    }
  }
</script>

<style scoped>

</style>
