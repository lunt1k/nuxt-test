<template>
  <nuxt-link
    :to="`/projects/${project.id}`"
    class="project__card"
  >
    <div class="project__card-img-wrapper">
      <img
        :src="project.logo_url || defaultImg"
        alt="project_logo"
        class="project__logo"
      >
    </div>
    <div class="project__card-img-wrapper">
      <span>{{ project.name }}</span>
    </div>
    <div
      class="project__card-img-wrapper"
      :class="project.is_active ? 'success' : 'error'"
    >
      {{ project.is_active ? 'Active' : 'Inactive' }}
    </div>
    <div>
      <div
        v-for="(value, key, index) in timers"
        :key="index"
        class="project__card-time"
      >
        <span>
          {{ timerName(key) }}
        </span>
        <span>
          {{ timer(value) }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapMutations } from 'vuex'
import defaultImg from '@/assets/images/default-img.png'

export default {
  name: 'Project',
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    token: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    timers: {
      timeThisWeek: 0,
      thisMonth: 0,
      total: 0
    },
    defaultImg
  }),
  async created () {
    const response = await this.$axios.get(`/projects-manage/${this.project.id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    const addition = {
      users: response.data.project.users,
      spent_time_week: response.data.project.spent_time_week,
      spent_time_month: response.data.project.spent_time_month,
      spent_time_all: response.data.project.spent_time_all,
      is_owner_watcher: response.data.project.is_owner_watcher
    }

    this.TRANSFORM_PROJECTS(
      {
        id: this.project.id,
        addition
      }
    )

    this.timers.timeThisWeek = addition.spent_time_week
    this.timers.thisMonth = addition.spent_time_month
    this.timers.total = addition.spent_time_all
  },
  methods: {
    ...mapMutations({
      TRANSFORM_PROJECTS: 'projects/TRANSFORM_PROJECTS'
    }),
    timer (time) {
      if (!time) { return '00:00:00' }
      const seconds = time % 60
      let minutes = Math.floor(time / 60)
      const hours = Math.floor(minutes / 60)

      minutes = minutes % 60

      return `${hours}:${minutes}:${seconds}`
    },
    timerName (key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/([A-Z])(.*)/, str => str.toLowerCase())
    }
  }
}
</script>
