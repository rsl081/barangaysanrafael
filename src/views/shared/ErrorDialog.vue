<template>
  <base-material-alert
    :value="true"
    color="error"
    dismissible
    @input="onClose"
  >
    <span>Error</span> — {{ text }}
  </base-material-alert>
</template>

<script>
  export default {
    name: 'ErrorNotification',

    props: ['text'],

    methods: {
      onClose () {
        this.$emit('dismissed')
      },
    },
  }
</script>
