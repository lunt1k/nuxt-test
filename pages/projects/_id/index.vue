<template>
  <div class="container">
    <div class="project">
      <button class="project__btn-back" @click="$router.go(-1)">
        Back
      </button>
      <div class="project__info">
        <div class="project__info-content">
          <span class="project__info-input-name">Name</span>
          <input
            v-model="name"
            type="text"
            class="project__name-input"
          >
          <button
            class="project__info-btn"
            @click="edit"
          >
            ok
          </button>
        </div>
        <Notification
          :notification="notification"
          :color="!hasError ? 'success' : 'error'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import Notification from '~/components/Notification'

export default {
  name: 'EditProject',
  components: {
    Notification
  },
  asyncData: async ({ params, $auth, $axios }) => {
    const token = await $auth.$storage._state['_token.local']
    const id = params.id
    const { data } = await $axios.get(`/projects-manage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const project = data.project
    return {
      id: project.id,
      name: project.name,
      token
    }
  },
  data: () => ({
    notification: '',
    hasError: false
  }),
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions({
      updateProjectName: 'projects/updateProjectName'
    }),
    async edit () {
      try {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          await this.updateProjectName(
            {
              id: this.id,
              name: this.name,
              token: this.token
            }
          )
          this.showNotification('Project saved')
        } else {
          this.hasError = true
          this.showNotification('Name can not be empty')
        }
      } catch (error) {
        this.hasError = true
        this.showNotification(error.message)
      }
    },
    showNotification (message) {
      this.notification = message

      setTimeout(() => {
        this.hasError = false
        this.notification = ''
      }, 2000)
    }
  }
}
</script>
