<template>
    <div>
        <spinner v-if="isLoading"/>
        <user-form @formSubmitted="saveUser" v-else/>
    </div>
</template>

<script>
  import UserForm from "../../../components/users/UserForm";
  import axios from 'axios';
  import Spinner from "../../../components/shared/Spinner";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";

  export default {
    name: "UserCreate",
    components: {Spinner, UserForm},
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      saveUser(user) {
        this.isLoading = true;
        axios.post('/users', user)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano użytkownika'})
            this.$router.push({name: 'dashboard.users.list'})
          })
          .catch(() => this.$store.commit(NOTIFICATIONS_PUSH, {type: 'danger', message: 'Użytkownik z podanym emailem istnieje'}))
          .finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style scoped>

</style>
