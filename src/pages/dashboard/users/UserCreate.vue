<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-else>
            <h3>Dodaj użytkownika</h3>
            <user-form @formSubmitted="saveUser"/>
        </div>
    </div>
</template>

<script>
  import UserForm from "../../../components/users/UserForm";
  import axios from 'axios';
  import Spinner from "../../../components/shared/Spinner";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";
  import moment from "moment";

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

        const request = {
          ...user, ...{
            bornAt: user.bornAt ? moment(user.bornAt).format('YYYY-MM-DD HH:m') : null
          }
        }

        axios.post('/users', request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano użytkownika'})
            this.$router.push({name: 'dashboard.users.list'})
          })
          .catch((error) => this.$store.commit(NOTIFICATIONS_PUSH, {type: 'danger', message: error.response.data.message}))
          .finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style scoped>

</style>
