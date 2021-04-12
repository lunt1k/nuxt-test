<template>
  <div
    class="notification"
    :class="color"
  >
    {{ notification }}
  </div>
</template>
<script>
export default {
  name: 'Notification',
  props: {
    notification: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  }
}
</script>
