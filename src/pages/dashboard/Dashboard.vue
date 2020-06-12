<template>
    <div class="wrapper">
        <nav class="navbar navbar-expand navbar-light bg-light justify-content-between">
            <div class="container">
                <div class="nav navbar-nav">
                    <router-link class="navbar-brand" :to="{name: 'dashboard'}">
                        System zarządzania szpitalem
                    </router-link>
                </div>
                <div class="nav navbar-nav">
                    <router-link class="nav-item nav-link" :to="{name: 'dashboard.profile'}">
                        {{ user }} - profil
                    </router-link>
                    <router-link class="nav-item nav-link" :to="{name: 'dashboard.profile.edit'}">
                        Edycja profilu
                    </router-link>

                    <a class="nav-link" style="cursor: pointer" @click="logout()">Wyloguj</a>
                </div>
            </div>
        </nav>

        <div class="container" style="margin-top: 30px;">
            <notifications-list/>

            <div class="row">

                <div class="col-md-3">
                    <left-menu/>
                </div>

                <div class="col-md-9">
                    <router-view/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {LOGOUT} from "../../store/actions.type";
  import {mapGetters} from "vuex";
  import LeftMenu from "../../components/shared/LeftMenu";
  import NotificationsList from "../../components/shared/notifications/NotificationsList";

  export default {
    name: "Dashboard",
    components: {NotificationsList, LeftMenu},
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
