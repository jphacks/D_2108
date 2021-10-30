<template>
  <div class="inputbox-container box-content m-auto pb-4 rounded-xl h-20 w-72">
    <p class="title text-2xl p-2">{{ title }}</p>
    <input :value="inputText" type="text" class="text-center rounded-md h-8" placeholder="テキストを入力" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    inputText: {
      type: String,
      default: "",
      required: false
    }
  },
  methods: {
    returnInputText() {
      this.$emit('changeText',this.inputText);
    }
  }
}
</script>

<style>
.inputbox-container {
  background-color: #58340e;
}

.inputbox-container .title {
  color: #f9f4df;
}

.inputbox-container input {
  background-color: #f9f4df;
}
</style>
