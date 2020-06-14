<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <div>
                <h3>Dane operacji</h3>

                <table class="table table-striped table-inverse table-responsive">
                    <tbody>
                    <tr>
                        <td scope="row">Nazwa</td>
                        <td>{{ operation.name }}</td>
                    </tr>
                    <tr>
                        <td scope="row">Date</td>
                        <td>{{ operation.scheduledFor }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Dane doktora</h3>

                <user-details :user="operation.doctor.user">
                    <tr>
                        <td>Specjalizacja</td>
                        <td>{{ operation.doctor.specialization }}</td>
                    </tr>
                </user-details>
            </div>


            <div>
                <h3>Dane pacjenta</h3>

                <user-details :user="operation.patient.user">
                    <tr>
                        <td>Urodzony dnia</td>
                        <td>{{ operation.patient.bornAt }}</td>
                    </tr>
                </user-details>
            </div>

        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import Spinner from "../../../components/shared/Spinner";
  import UserDetails from "../../../components/shared/UserDetails";

  export default {
    name: "OperationPreview",
    components: {UserDetails, Spinner},
    data() {
      return {
        isLoading: true,
        operation: null,
      }
    },
    mounted() {
      this.isLoading = true;
      axios.get(`/operations/${this.$route.params.id}`)
        .then(response => this.operation = response.data)
        .finally(() => this.isLoading = false);
    }
  }
</script>

<style scoped>

</style>
