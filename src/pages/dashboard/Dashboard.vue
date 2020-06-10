<template>
    <div class="wrapper">
        <nav class="navbar navbar-expand navbar-light bg-light justify-content-between">
            <div class="nav navbar-nav">
                <router-link class="navbar-brand" :to="{name: 'dashboard'}">
                    System zarządzania szpitalem
                </router-link>
            </div>
            <div class="nav navbar-nav">
                <div class="nav-item nav-link">{{ user }}</div>
                <a class="nav-link" style="cursor: pointer" @click="logout()">Wyloguj</a>
            </div>
        </nav>

        <div class="container">


            <router-view/>
        </div>
    </div>
</template>

<script>
  import {LOGOUT} from "../../store/actions.type";
  import {mapGetters} from "vuex";

  export default {
    name: "Dashboard",
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      logout() {
        this.$store.dispatch(LOGOUT)
          .then(() => this.$router.push({name: 'auth.login'}));
      }
    }
  }
</script>

<style scoped>

</style>
