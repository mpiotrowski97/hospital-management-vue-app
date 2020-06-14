<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-else>
            <h3>Dodaj szczegóły</h3>
            <validation-observer v-slot="{invalid}">
                <form @submit.prevent="saveOperation">
                    <validation-provider v-slot="{errors}" rules="required">

                        <div class="form-group">
                            <label for="details">Szczegóły</label>
                            <textarea class="form-control" name="details" id="details" v-model="operation.details"
                                      rows="3"></textarea>
                        </div>
                        <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>

                    </validation-provider>

                    <div>
                        <button type="submit" class="btn btn-primary" :disabled="invalid">Zapisz</button>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";
  import Spinner from "../../../components/shared/Spinner";

  export default {
    name: "AddDetails",
    components: {Spinner},
    data() {
      return {
        isLoading: true,
        operation: null
      }
    },
    mounted() {
      this.isLoading = true;
      axios.get(`/doctor/operations/${this.$route.params.id}`)
        .then(response => this.operation = response.data)
        .finally(() => this.isLoading = false);
    },
    methods: {
      saveOperation() {
        this.isLoading = true;

        axios.put(`/doctor/operations/${this.$route.params.id}/add-details`, this.operation)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano szczegóły operacji'})
            this.$router.push({name: 'dashboard.operations.doctor.list'})
          })
          .catch((response) => {
            this.$store.commit(NOTIFICATIONS_PUSH, {
              type: 'danger',
              message: response.response.data.message
            })
          })
          .finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style scoped>

</style>
