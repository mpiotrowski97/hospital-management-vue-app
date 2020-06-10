<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <h3>Dane użytkownika</h3>
            <table class="table table-striped table-inverse table-responsive">
                <tbody>
                <tr>
                    <td scope="row">ID</td>
                    <td>{{ user.id }}</td>
                </tr>
                <tr>
                    <td scope="row">Email</td>
                    <td>{{ user.email }}</td>
                </tr>
                <tr>
                    <td scope="row">Godność</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                </tr>
                <tr>
                    <td scope="row">Adres</td>
                    <td>{{ user.city }} {{ user.street }} {{ user.houseNumber }}</td>
                </tr>
                <tr>
                    <td scope="row">Telefon</td>
                    <td>{{ user.phoneNumber }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <router-link :to="{name: 'dashboard.users.list'}">Powrót</router-link>
    </div>
</template>

<script>
  import Spinner from "../../../components/shared/Spinner";
  import axios from 'axios';

  export default {
    name: "UserPreview",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        user: null
      }
    },
    mounted() {
      axios.get(`/users/${this.$route.params.id}`)
        .then(response => this.user = response.data)
        .finally(() => this.isLoading = false);
    }
  }
</script>

<style scoped>

</style>
