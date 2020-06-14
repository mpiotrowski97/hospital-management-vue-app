<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <operation-details :operation="operation"/>

        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import Spinner from "../../../components/shared/Spinner";
  import OperationDetails from "../../../components/shared/OperationDetails";

  export default {
    name: "DoctorOperationPreview",
    components: {OperationDetails, Spinner},
    data() {
      return {
        isLoading: true,
        operation: null,
      }
    },
    mounted() {
      this.isLoading = true;
      axios.get(`/doctor/operations/${this.$route.params.id}`)
        .then(response => this.operation = response.data)
        .finally(() => this.isLoading = false);
    }
  }
</script>

<style scoped>

</style>
