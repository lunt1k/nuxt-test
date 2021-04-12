<template>
  <div class="navbar">
    <div class="logo logo--navbar">
      <img
        src="~/assets/images/quwi-logo.png"
        alt="quwi"
        width="25"
        height="25"
      >
    </div>
    <div
      v-if="$auth.loggedIn"
      class="nav-links"
    >
      <nuxt-link
        to="/projects"
        class="nav__link"
        active-class="nav-link__active"
      >
        projects
      </nuxt-link>
      <a
        class="nav__link nav__link-logout"
        @click="$emit('logout')"
      >
        logout
      </a>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Navbar'
}
</script>
