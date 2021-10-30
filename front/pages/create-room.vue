<template>
  <div class="createroom-container w-3/5 max-w-screen-md">
    <img src="/images/ontooff.png" alt="おんとおふ" class="m-auto lg:h-48 product-name-img">
    <img src="/images/touhu.png" alt="とうふ" class="m-auto mb-10">
    <div class="flex justify-around inputbox-wrapper">
      <InputBox v-model="inputUserName" title="あなたの名前" class="mb-10 max-w-full" />
      <InputBox v-model="inputRoomName" title="部屋の名前" class="mb-10 max-w-full" />
    </div>
    <Button text="作成" color-code="#478633" class="px-20" @toggleButton="createRoom" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputUserName: '',
      inputRoomName: '',
    }
  },
  methods: {
    async createRoom() {
      try {
        const response = await this.$axios.$post(
          process.env.NUXT_ENV_CREATE_ROOM_URL,
          {
            UserName: this.inputUserName,
            RoomName: this.inputRoomName
          });
          this.toWaitRoom(response.UserId, response.RoomId);
      } catch (error) {
        return {
          statusCode: error
        }
      }
    },
    toWaitRoom(responseUserId, responseRoomId) {
      this.$router.push({
        name: 'wait-room-userId',
        params: { responseUserId },
        query: { roomId: responseRoomId }
      })
    },
  }
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .createroom-container .inputbox-wrapper {
    flex-direction: column;
  }
}

.createroom-container .product-name-img {
  max-height: 20vh;
}
</style>