<template>
    <main class="login-form">
        <div class="col-md-6">
            <notifications-list/>
            <div class="card">
                <div class="card-header">
                    Logowanie
                </div>

                <div class="card-body">
                    <validation-observer v-slot="{invalid}">
                        <form @submit.prevent="submitForm">
                            <validation-provider rules="required" v-slot="{errors}">
                                <div class="form-group row">
                                    <label for="email_address" class="col-md-4 col-form-label text-md-right">
                                        Email
                                    </label>
                                    <div class="col-md-6">
                                        <input type="text" id="email_address" class="form-control" name="email-address"
                                               required autofocus v-model="email" :class="{'is-invalid':errors.length}">
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                    </div>

                                </div>
                            </validation-provider>

                            <validation-provider rules="required" v-slot="{errors}">
                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Hasło</label>
                                    <div class="col-md-6">
                                        <input type="password" id="password" class="form-control" name="password"
                                               required
                                               v-model="password" :class="{'is-invalid':errors.length}">
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                    </div>
                                </div>
                            </validation-provider>

                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" :disabled="invalid">
                                    Zaloguj
                                </button>
                            </div>
                        </form>
                    </validation-observer>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
  import {LOGIN} from "../../store/actions.type";
  import NotificationsList from "../../components/shared/notifications/NotificationsList";

  export default {
    name: "Login",
    components: {NotificationsList},
    data() {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      submitForm() {
        this.$store.dispatch(LOGIN, {email: this.email, password: this.password})
          .then(() => this.$router.push({name: 'dashboard'}));
      }
    }
  }
</script>

<style scoped lang="sass">
    .login-form
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
</style>
