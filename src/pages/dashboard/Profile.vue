<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <h3>Profil</h3>
            <router-link class="btn btn-info" :to="{name: 'dashboard.profile.edit'}">Edycja</router-link>
            <user-details :user="user"/>
        </div>
        <router-link class="btn btn-link" :to="{name: 'dashboard.users.list'}">Powrót</router-link>
    </div>
</template>

<script>
  import axios from 'axios';
  import Spinner from "../../components/shared/Spinner";
  import UserDetails from "../../components/shared/UserDetails";

  export default {
    name: "Profile",
    components: {UserDetails, Spinner},
    data() {
      return {
        user: null,
        isLoading: true
      }
    },
    mounted() {
      this.isLoading = true;
      axios
        .get('user/current')
        .then(response => this.user = response.data)
      .finally(() => this.isLoading = false)
    }
  }
</script>

<style scoped>

</style>
