<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <h3>Profil</h3>
            <user-form :user="user" :is-profile="true" @formSubmitted="saveProfile"/>
        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import Spinner from "../../components/shared/Spinner";
  import UserForm from "../../components/users/UserForm";
  import {NOTIFICATIONS_PUSH} from "../../store/mutations.type";

  export default {
    name: "ProfileEdit",
    components: {UserForm, Spinner},
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
    },
    methods: {
      saveProfile(user) {
        this.isLoading = true;

        axios.put('user/change', user)
        .then(() => {
          this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Edytowano profil'})
          this.$router.push({name: 'dashboard.profile'})
        })
        .finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style scoped>

</style>
