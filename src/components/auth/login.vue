<template>
  <div class="wrapper">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs10 sm7 md6 lg5 xl4>
          <v-card class="elevation-6 mb-5">
            <v-toolbar dark color="dark">
              <v-toolbar-title class="headline">Authentication</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-img width="140" :src="require('../../assets/smallLogoWhiteRed.png')"/>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <div class="mt-2 mb-4 text-sm-center subheading">Also try <b>Admin</b> account:
                  <b>admin@gmail.com</b> password: <b>123123</b></div>
                <v-alert
                    class="mt-0 mb-3 text-sm-center subheading pr-5"
                    :value=errorText
                    type="error"
                    transition="scale-transition">
                  {{ errorText }}
                </v-alert>
                <v-text-field
                    class="mb-1"
                    prepend-icon="person"
                    name="email"
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                    prepend-icon="lock"
                    name="password"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="Password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    @click:append="show = !show"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center pt-0 pb-4">
              <v-btn dark color="red" @click.prevent="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';
import email from 'vuelidate/src/validators/email';

export default {
  data() {
    return {
      show: false,
      email: 'staff@gmail.com',
      password: '123123',
      errorLoginNotification: false,
      errorText: ''
    };
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)}

  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('The e-mail must be valid!');
      !this.$v.email.required && errors.push('E-mail is required!');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required!');
      !this.$v.password.minLength && errors.push('Password must have at least 6 characters!');
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('login', formData).then((res) => {
        if (res.responseType !== 'undefined' && res.responseType === 'error' && res.errorMessage === 'invalidEmail') {
          this.errorText = 'User does not exist!';
        } else if (res.responseType !== 'undefined' && res.responseType === 'error' && res.errorMessage === 'invalidPassword') {
          this.errorText = 'Incorrect password!';
        }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-image: url('../../assets/loginbg.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
}
</style>