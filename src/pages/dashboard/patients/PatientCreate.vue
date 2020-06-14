<template>
    <div>
        <div>
            <spinner v-if="isLoading"/>
            <div v-else>
                <h3>Dodaj pacjenta</h3>
                <div class="container">
                    <validation-observer v-slot="{invalid}">
                        <form @submit.prevent="savePatient">
                            <validation-provider v-slot="{errors}" rules="required">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" name="email" id="email"
                                           :class="{'is-invalid':errors.length}" v-model="user.email">
                                    <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                                </div>
                            </validation-provider>

                            <validation-provider v-slot="{errors}" :rules="`required`">
                                <div class="form-group">
                                    <label for="password">Hasło</label>
                                    <input type="password" class="form-control" name="password" id="password"
                                           ref="password"
                                           :class="{'is-invalid':errors.length}" v-model="user.password">
                                    <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                                </div>
                            </validation-provider>

                            <validation-provider v-slot="{errors}" :rules="`required`">
                                <div class="form-group">
                                    <label for="passwordConfirmation">Potwierdź hasło</label>
                                    <input type="password" class="form-control" name="passwordConfirmation"
                                           id="passwordConfirmation" :class="{'is-invalid':errors.length}"
                                           v-model="user.passwordConfirmation">
                                    <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                                </div>
                            </validation-provider>

                            <validation-provider v-slot="{errors}" rules="required">
                                <div class="form-group">
                                    <label for="firstName">Imię</label>
                                    <input type="text" class="form-control" name="firstName"
                                           id="firstName" :class="{'is-invalid':errors.length}"
                                           v-model="user.firstName">
                                    <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                                </div>
                            </validation-provider>

                            <validation-provider v-slot="{errors}" rules="required">
                                <div class="form-group">
                                    <label for="lastName">Nazwisko</label>
                                    <input type="text" class="form-control" name="lastName"
                                           id="lastName" :class="{'is-invalid':errors.length}"
                                           v-model="user.lastName">
                                    <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                                </div>
                            </validation-provider>

                            <div class="form-group">
                                <label for="city">Miasto</label>
                                <input type="text" class="form-control" name="city"
                                       id="city"
                                       v-model="user.city">
                            </div>

                            <div class="form-group">
                                <label for="street">Ulica</label>
                                <input type="text" class="form-control" name="street"
                                       id="street"
                                       v-model="user.street">
                            </div>

                            <div class="form-group">
                                <label for="houseNumber">Numer domu</label>
                                <input type="text" class="form-control" name="houseNumber"
                                       id="houseNumber"
                                       v-model="user.houseNumber">
                            </div>

                            <div class="form-group">
                                <label for="phoneNumber">Numer telefonu</label>
                                <input type="text" class="form-control" name="phoneNumber"
                                       id="phoneNumber"
                                       v-model="user.phoneNumber">
                            </div>

                            <validation-provider v-slot="{errors}" rules="required">

                                <div class="form-group">
                                    <label for="bornAt">Data urodzenia</label>
                                    <datepicker v-model="user.bornAt" class="" id="bornAt" :language="pl"
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
        </div>
    </div>
</template>

<script>
  import Spinner from "../../../components/shared/Spinner";
  import {pl} from "vuejs-datepicker/dist/locale";
  import axios from "axios";
  import {NOTIFICATIONS_PUSH} from "../../../store/mutations.type";
  import moment from "moment";

  export default {
    name: "PatientCreate",
    components: {Spinner},
    data() {
      return {
        pl: pl,
        isLoading: false,
        user: {
          email: null,
          password: null,
          passwordConfirmation: null,
          firstName: null,
          lastName: null,
          bornAt: null,
        }
      }
    },
    methods: {
      savePatient() {
        this.isLoading = true;

        const request = {
          ...this.user, ...{
            bornAt: this.user.bornAt ? moment(this.user.bornAt).format('YYYY-MM-DD HH:m') : null
          }
        }

        axios.post('/patients', request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano pacjenta'})
            this.$router.push({name: 'dashboard.patients.list'})
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
