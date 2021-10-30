<template>
  <button class="rounded-xl h-14 text-2xl px-5 button-size" :style="{backgroundColor: colorCode}" @click="toggleButton">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    colorCode: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleButton() {
      this.$emit('toggleButton');
    }
  }
}
</script>

<style scoped>
.on-button {
  background-color: #ffaf08;
}

.off-button {
  background-color: #0064b3;
}

button {
  color: #f9f4df;
}

.button-size {
  min-width: 120px;
}
</style>
