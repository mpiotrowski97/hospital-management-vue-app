<template>
    <div class="container">
        <validation-observer v-slot="{invalid}">
            <form @submit.prevent="submitForm">
                <validation-provider v-slot="{errors}" rules="required" v-if="!isProfile">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" name="email" id="email"
                               :class="{'is-invalid':errors.length}" v-model="user.email">
                        <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                    </div>
                </validation-provider>

                <validation-provider v-slot="{errors}" :rules="!user.id ? `required` : ''">
                    <div class="form-group">
                        <label for="password">Hasło</label>
                        <input type="password" class="form-control" name="password" id="password" ref="password"
                               :class="{'is-invalid':errors.length}" v-model="user.password">
                        <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                    </div>
                </validation-provider>

                <validation-provider v-slot="{errors}" :rules="!user.id ? `required` : ''">
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

                <validation-provider v-slot="{errors}" rules="required" v-if="!isProfile">
                    <div class="form-group">
                        <label for="roles">Role</label>
                        <input type="text" class="form-control" name="roles"
                               id="roles" :class="{'is-invalid':errors.length}"
                               v-model="user.roles">
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

                <validation-provider v-slot="{errors}" rules="required" v-if="!isProfile">
                    <div class="form-group">
                        <label for="type">Typ</label>
                        <select class="form-control" :class="{'is-invalid':errors.length}" name="type" id="type"
                                v-model="user.type">
                            <option :value="null">Wybierz...</option>
                            <option value="patient">Pacjent</option>
                            <option value="doctor">Doktor</option>
                        </select>
                        <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
                    </div>
                </validation-provider>

                <div class="form-group" v-if="'doctor' === user.type && !isProfile">
                    <label for="specialization">Specjalizacja</label>
                    <input type="text" name="specialization" id="specialization" class="form-control"
                           v-model="user.specialization">
                </div>

                <div class="form-group" v-if="'patient' === user.type && !isProfile">
                    <label for="bornAt">Data urodzenia</label>
                    <datepicker v-model="user.bornAt" class="" id="bornAt" :language="pl" format="yyyy-MM-dd 00:00"/>
                </div>

                <div>
                    <button type="submit" class="btn btn-primary" :disabled="invalid">Zapisz</button>
                </div>
            </form>
        </validation-observer>
    </div>
</template>

<script>
  import {pl} from "vuejs-datepicker/dist/locale";

  export default {
    name: "UserForm",
    data() {
      return {
        pl: pl,
      }
    },
    methods: {
      submitForm() {
        this.$emit('formSubmitted', this.user);
      }
    },
    props: {
      isProfile: {
        default: false,
        type: Boolean
      },
      user: {
        type: Object,
        default: () => ({
          email: null,
          password: null,
          passwordConfirmation: null,
          firstName: null,
          lastName: null,
          roles: null,
          phoneNumber: null,
          type: null,
          bornAt: null,
          specialization: null
        })
      }
    }
  }
</script>

<style scoped>

</style>
