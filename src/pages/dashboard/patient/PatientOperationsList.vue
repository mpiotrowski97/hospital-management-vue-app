<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <div style="margin-top: 20px;">
                <div class="form-group">
                    <label for="filter">Filtrowanie</label>
                    <select class="form-control" id="filter" v-model="filter">
                        <option :value="null">Wybierz...</option>
                        <option value="actual">Aktualne</option>
                        <option value="archived">Archiwalne</option>
                    </select>
                </div>
            </div>
            <table class="table table-responsive">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Nazwa</th>
                    <th>Data</th>
                    <th>Doktor</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="operation of operations" :key="`patient-${operation.id}`">
                    <td>{{ operation.id }}</td>
                    <td>{{ operation.name }}</td>
                    <td>{{ operation.scheduledFor }}</td>
                    <td>{{ operation.doctor.user.firstName }} {{ operation.doctor.user.lastName }}</td>
                    <td>
                        <a :href="`${apiUrl}/operations/${operation.id}/summary`" target="_blank" class="btn btn-info">
                            Pobierz podsumowanie
                        </a>
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
  import {API_URL} from "../../../common/config";

  export default {
    name: "PatientOperationsList",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        operations: [],
        filter: null,
        apiUrl: API_URL
      }
    },
    watch: {
      filter() {
        this.fetchOperations();
      }
    },
    mounted() {
      this.fetchOperations();
    },
    methods: {
      fetchOperations() {
        this.isLoading = true

        const url = this.filter ? `/patients/operations?type=${this.filter}` : '/patients/operations';

        axios
          .get(url)
          .then(response => {
            if (!response.data['_embedded'] || !response.data['_embedded']['operationList']) {
              return;
            }

            this.operations = response.data['_embedded']['operationList']
          })
          .finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style scoped>

</style>
