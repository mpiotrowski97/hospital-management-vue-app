<template>
        <div>
            <spinner v-if="isLoading"/>
            <div v-else>
                <h3>Edytuj użytkownika</h3>
                <user-form @formSubmitted="saveUser" :user="user"/>
            </div>
        </div>
</template>

<script>
  import axios from "axios";
  import Spinner from "../../../components/shared/Spinner";
  import UserForm from "../../../components/users/UserForm";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";

  export default {
    name: "UserEdit",
    components: {UserForm, Spinner},
    data() {
      return {
        isLoading: true,
        user: null
      }
    },
    mounted() {
      axios.get(`/users/${this.$route.params.id}`)
        .then(response => {
          this.user = response.data

          if (this.user.roles.includes('ROLE_PATIENT')) {
            this.user.type = 'patient';
            if (this.user.patient) {
              this.user.bornAt = this.user.patient.bornAt;
            }
          }

          if (this.user.roles.includes('ROLE_DOCTOR')) {
            this.user.type = 'doctor';
            if (this.user.doctor) {
              this.user.specialization = this.user.doctor.specialization
            }
          }
        })
        .finally(() => this.isLoading = false);
    },
    methods: {
      saveUser(user) {
        axios.put(`/users/${this.$route.params.id}`, user)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie edytowano użytkownika'})
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
