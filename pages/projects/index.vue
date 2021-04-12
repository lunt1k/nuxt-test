<template>
  <div class="container">
    <div
      v-if="projects"
      class="projects"
    >
      <Project
        v-for="project in sorted"
        :key="project.id"
        :project="project"
        :token="token"
      />
    </div>
    <div
      v-else
      class="request-error"
    >
      Request failed with status code {{ error.status }}: {{ error.name }}
      <span>{{ error.message }}</span>
    </div>
  </div>
</template>
<script>
import Project from '~/components/Project'

export default {
  name: 'Projects',
  components: {
    Project
  },
  asyncData: async ({ store, $auth }) => {
    try {
      const token = await $auth.$storage._state['_token.local']
      await store.dispatch('projects/getProjects', token)
      const projects = store.state.projects.projects

      return {
        projects,
        token
      }
    } catch (err) {
      return {
        projects: null,
        error: {
          status: err.status,
          name: err.name,
          message: err.message
        }
      }
    }
  },
  computed: {
    sorted () {
      return this.projects.slice().sort((a, b) => a.position - b.position)
    }
  }
}
</script>
