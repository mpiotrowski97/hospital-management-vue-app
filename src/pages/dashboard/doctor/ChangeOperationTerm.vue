<template>
    <div>
        <spinner v-if="isLoading"/>
        <div v-else>
            <h3>Zmień termin operacji</h3>
            <validation-observer v-slot="{invalid}">
                <form @submit.prevent="saveOperation">
                    <validation-provider v-slot="{errors}" rules="required">

                        <div class="form-group">
                            <label for="scheduledFor">Termin</label>
                            <datepicker v-model="operation.scheduledFor" id="scheduledFor" :language="pl"
                                        format="yyyy-MM-dd 00:00"/>
                            <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                        </div>
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
  import Spinner from "../../../components/shared/Spinner";
  import {pl} from "vuejs-datepicker/dist/locale";
  import moment from "moment";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";

  export default {
    name: "ChangeOperationTerm",
    components: {Spinner},
    data() {
      return {
        pl: pl,
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

        const request = {
            scheduledFor: moment(this.operation.scheduledFor).format('YYYY-MM-DD HH:mm')
        }

        axios.put(`/doctor/operations/${this.$route.params.id}/change-date`, request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie zmieniono date'})
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
