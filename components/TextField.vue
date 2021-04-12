<template>
  <div class="custom-input">
    <input
      :id="type"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :name="type"
      class="custom-input__input"
      :class="submitted && validator.$error ? 'custom-input__input--error' : ''"
      @input="$emit('input', $event.target.value)"
    >
    <label
      class="custom-input__label"
      :class="submitted && validator.$error ? 'custom-input__label--error' : ''"
      :for="type"
    >
      <div
        v-if="submitted && validator.$error"
      >
        <span v-if="!validator.required">{{ requiredText }}</span>
        <span v-if="!validator[checkValidationType]">{{ validText }}</span>
      </div>
      <div v-else>
        {{ placeholder }}
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    submitted: {
      type: Boolean,
      default: false
    },
    validator: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    requiredText () {
      if (this.type === 'password') {
        return 'Password can not be blank'
      } else if (this.type === 'email') {
        return 'Email can not be blank'
      }

      return null
    },
    validText () {
      if (this.type === 'password') {
        return 'Password must be at least 6 characters long'
      } else if (this.type === 'email') {
        return 'Email is not a valid email address'
      }

      return null
    },
    checkValidationType () {
      if (this.type === 'password') {
        return 'minLength'
      } else if (this.type === 'email') {
        return 'email'
      }

      return null
    }
  },
  watch: {
    value () {
      this.$emit('clear-errors')
    }
  }
}
</script>
