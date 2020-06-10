<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <div style="margin-bottom: 10px;">
                <router-link class="btn btn-primary" :to="{name: 'dashboard.users.create'}">
                    Dodaj użytkownika
                </router-link>
            </div>
            <table class="table">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Email</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user of users" :key="`user-${user.id}`">
                    <td scope="row">#{{ user.id }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td style="display: flex;flex-direction: row">
                        <router-link :to="{name: 'dashboard.users.preview', params: {id: user.id}}"
                                     class="btn btn-primary">
                            Podgląd
                        </router-link>
                        <button type="button" class="btn btn-danger" @click="deleteUser(user)">Usuń</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
  import axios from 'axios';
  import Spinner from "../../../components/shared/Spinner";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";

  export default {
    name: "UserList",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        users: []
      }
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      deleteUser(user) {
        if (!confirm("Na pewno usunąć użytkownika?")) {
          return;
        }

        axios.delete(`/users/${user.id}`)
          .then(() => this.$store.commit(NOTIFICATIONS_PUSH, {
            type: 'success',
            message: 'Pomyślnie usunięto użytkownika'
          }))
          .finally(this.fetchUsers);
      },
      fetchUsers() {
        this.isLoading = true;
        axios.get('/users')
          .then(response => this.users = response.data['_embedded']['userList'])
          .finally(() => this.isLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
