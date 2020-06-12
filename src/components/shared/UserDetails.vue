<template>
    <table class="table table-striped table-inverse table-responsive">
        <tbody>
        <tr>
            <td scope="row">ID</td>
            <td>{{ user.id }}</td>
        </tr>
        <tr>
            <td scope="row">Email</td>
            <td>{{ user.email }}</td>
        </tr>
        <tr>
            <td scope="row">Godność</td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
        </tr>
        <tr>
            <td scope="row">Adres</td>
            <td>{{ user.city }} {{ user.street }} {{ user.houseNumber }}</td>
        </tr>
        <tr>
            <td scope="row">Telefon</td>
            <td>{{ user.phoneNumber }}</td>
        </tr>
        <slot/>
        </tbody>
    </table>
</template>

<script>
  export default {
    name: "UserDetails",
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
