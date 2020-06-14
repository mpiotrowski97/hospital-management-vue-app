<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <div style="margin-bottom: 10px;">
                <router-link class="btn btn-primary" :to="{name: 'dashboard.operations.create'}">
                    Dodaj operacje
                </router-link>
            </div>
            <table class="table table-responsive">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Nazwa</th>
                    <th>Data</th>
                    <th>Pacjent</th>
                    <th>Doktor</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="operation of operations" :key="`patient-${operation.id}`">
                    <td>{{ operation.id }}</td>
                    <td>{{ operation.name }}</td>
                    <td>{{ operation.scheduledFor }}</td>
                    <td>{{ operation.patient.user.firstName }} {{ operation.patient.user.lastName }}</td>
                    <td>{{ operation.doctor.user.firstName }} {{ operation.doctor.user.lastName }}</td>
                    <td>
                        <router-link class="btn btn-info" :to="{name: 'dashboard.operations.preview', params: {id: operation.id}}">
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
  import axios from "axios";
  import Spinner from "../../../components/shared/Spinner";

  export default {
    name: "OperationList",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        operations: []
      }
    },
    mounted() {
      this.isLoading = true

      axios
        .get('operations')
        .then(response => {
          if (!response.data['_embedded'] || !response.data['_embedded']['operationList']) {
            return;
          }

          this.operations = response.data['_embedded']['operationList']
        })
        .finally(() => this.isLoading = false);
    }
  }
</script>

<style scoped>

</style>
