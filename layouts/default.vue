<template>
  <div class="main">
    <Navbar @logout="logout" />
    <nuxt />
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
export default {
  name: 'Default',
  components: {
    Navbar
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      await this.$router.push('/login')
    }
  }
}
</script>
