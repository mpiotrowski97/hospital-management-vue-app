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
                    <th>Pacjent</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="operation of operations" :key="`patient-${operation.id}`">
                    <td>{{ operation.id }}</td>
                    <td>{{ operation.name }}</td>
                    <td>{{ operation.scheduledFor }}</td>
                    <td>{{ operation.patient.user.firstName }} {{ operation.patient.user.lastName }}</td>
                    <td>
                        <router-link class="btn btn-info" :to="{name: 'dashboard.operations.doctor.preview', params: {id: operation.id}}">
                            Podgląd
                        </router-link>
                        <router-link class="btn btn-info" :to="{name: 'dashboard.operations.doctor.change-term', params: {id: operation.id}}">
                            Zmień termin
                        </router-link>
                        <router-link class="btn btn-info" :to="{name: 'dashboard.operations.doctor.add-details', params: {id: operation.id}}">
                            Dodaj szczegóły
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
    name: "DoctorOperationsList",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        operations: [],
        filter: null
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

        const url = this.filter ? `/doctor/operations?type=${this.filter}` : '/doctor/operations';

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
