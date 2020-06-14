<template>
    <div class="list-group">
        <router-link v-for="item of permittedItems"
                     :key="`menu-item-${item.name}`"
                     :to="{name: item.route}"
                     v-slot="{isActive, navigate}">
            <span class="list-group-item list-group-item-action" :class="{'active':isActive}" style="cursor: pointer" @click="navigate">
                {{ item.name }}
            </span>
        </router-link>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "LeftMenu",
    data() {
      return {
        items: [
          {
            name: 'Użytkownicy',
            route: 'dashboard.users.list',
            role: 'ROLE_ADMIN'
          },
          {
            name: 'Pacjenci',
            route: 'dashboard.patients.list',
            role: 'ROLE_RECEPTIONIST'
          },
          {
            name: 'Operacje',
            route: 'dashboard.operations.list',
            role: 'ROLE_RECEPTIONIST'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['authorities']),
      permittedItems() {
        return this.items.filter(item => this.authorities.includes(item.role))
      }
    }
  }
</script>

<style scoped>

</style>
