<template>
  <div class="usercard-container rounded-xl text-2xl h-14 p-5 box-content flex self-center border">
    <div>
      <img :src="image_src" :alt="image_alt" class="h-full">
    </div>
    <p class="flex-grow text-2xl text-left pl-4 pt-2">{{ userName }}</p>
    <Button v-if="!connectStatus && status" text="接続" :color-code="colorCode" />
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: "",
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    connectStatus: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      image_src: (this.connectStatus) ? "/images/on.png" : "/images/off.png",
      image_alt: (this.connectStatus) ? "通話中" : "通話可能"
    }
  },
  computed: {
    colorCode() {
      return "#ffaf08";
    }
  }
}
</script>

<style scoped>
.usercard-container {
  background-color: #FFFEF9;
}
</style>
