<template>
  <form
    :novalidate="true"
    class="login-form"
    @submit.prevent="submit"
  >
    <div class="auth">
      <span class="login-form__title">
        Login
      </span>
      <div class="input-wrapper">
        <TextField
          v-model="email"
          type="email"
          placeholder="Email"
          :submitted="submitted"
          :validator="$v.email"
          @clear-errors="submitted = false"
        />
        <TextField
          v-model="password"
          type="password"
          placeholder="Password"
          :submitted="submitted"
          :validator="$v.password"
          @clear-errors="submitted = false"
        />
        <div class="btn-wrapper">
          <input
            class="btn__submit"
            type="submit"
            value="Login"
            :disabled="submitted"
          >
          <div
            class="box--error"
          >
            <span v-if="errorMessage">
              {{ errorMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import TextField from '~/components/TextField'

export default {
  name: 'LoginForm',
  components: { TextField },
  data: () => ({
    test: '',
    email: '',
    password: '',
    submitted: false,
    errorMessage: null
  }),
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    async submit () {
      this.submitted = true
      this.$v.$touch()

      if (!this.$v.$invalid) {
        try {
          const response = await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })

          await this.$auth.setToken('local', response.data.token)
          await this.$router.push('/projects')
        } catch ({ response }) {
          const errors = response.data.first_errors
          const error = Object.keys(errors).map((key) => {
            return errors[key]
          }).join(' ')
          this.showError(error)
        }
      }
    },
    showError (error) {
      this.errorMessage = error

      setTimeout(() => {
        this.errorMessage = null
      }, 3000)
    }
  }
}
</script>
