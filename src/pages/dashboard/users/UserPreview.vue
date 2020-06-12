<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <h3>Dane użytkownika</h3>
            <user-details :user="user"/>
        </div>
        <router-link :to="{name: 'dashboard.users.list'}">Powrót</router-link>
    </div>
</template>

<script>
  import Spinner from "../../../components/shared/Spinner";
  import axios from 'axios';
  import UserDetails from "../../../components/shared/UserDetails";

  export default {
    name: "UserPreview",
    components: {UserDetails, Spinner},
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
