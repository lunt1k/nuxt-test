export const actions = {
  async getProjects ({ commit }, token) {
    try {
      const { data } = await this.$axios.get('/projects', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_PROJECTS', data.projects)
    } catch ({ response }) {
      throw response.data
    }
  },
  async updateProjectName ({ commit }, payload) {
    try {
      await this.$axios.post(`/projects-manage/update?id=${payload.id}`, {
        name: payload.name
      },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })

      commit('UPDATE_PROJECT_NAME', {
        id: payload.id,
        name: payload.name
      })
    } catch ({ response }) {
      throw response.data
    }
  }
}

export const state = () => ({
  projects: []
})

export const mutations = {
  SET_PROJECTS (state, payload) {
    state.projects = payload
  },
  TRANSFORM_PROJECTS (state, { id, addition }) {
    state.projects = state.projects.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          ...addition
        }
      } else {
        return project
      }
    })
  },
  UPDATE_PROJECT_NAME (state, { id, name }) {
    state.projects = state.projects.map((project) => {
      if (project.id === id) {
        project.name = name
        return project
      } else {
        return project
      }
    })
  }
}
