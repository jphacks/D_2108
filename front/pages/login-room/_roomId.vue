<template>
  <div class="loginroom-container">
    <div v-if="no_room">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">不正なルームIDです！</strong>
      </div>
      <img src="/images/touhu.png" alt="とうふ" class="m-auto max-w-xl mb-10">
    </div>
    <div v-else>
      <h1 class="text-5xl pb-10">{{ roomName }}</h1>
      <img src="/images/touhu.png" alt="とうふ" class="m-auto max-w-xl mb-10">
      <InputBox v-model="inputText" title="あなたの名前" class="mb-10" />
      <div class="flex justify-around">
        <AttendButton text="オフラインで参加" :attend-value=false @toggleButton="toggleAttendButton" />
        <AttendButton text="オンラインで参加" :attend-value=true @toggleButton="toggleAttendButton" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  modules: ['@nuxtjs/axios'],

  data() {
    return {
      roomName: '部屋名',
      inputText: "",
      no_room: false,
      no_name: false
    }
  },
  async created() {
    await this.getRoomName(this.$route.params.roomId);
  },
  methods: {
    // 部屋名を取得する
    async getRoomName(roomId) {
      try {
        const response = await this.$axios.$get(
          process.env.NUXT_ENV_GET_ROOM_URL,
          {
            params: { RoomId: roomId },
          }
        )

        this.roomName = response.RoomName;

        if(this.roomName === undefined) {
          this.no_room = true;
        }
      } catch (error) {
        this.no_room = true
      }
    },
    // 部屋にログインする
    async loginRoom(roomId, userName, attendStatus) {
      try {
        const response = await this.$axios.$put(process.env.NUXT_ENV_ADD_USER_URL, {
          RoomId: roomId,
          UserName: userName,
          AttendStatus: attendStatus,
        });
        this.toWaitRoom(response);
      } catch (error) {
        return {
          statusCode: error,
        }
      }
    },
    toggleAttendButton(status) {
      const roomId = this.$route.params.roomId;
      const userName = this.inputText;
      const attendStatus = status;
      if (userName === "") {
        this.no_name = true;
      } else {
        this.no_name = false;
      }

      if(!this.no_name){
        this.loginRoom(roomId, userName, attendStatus);
      }
    },
    toWaitRoom(userId) {
      this.$router.push({
        name: 'wait-room-userId',
        params: { userId },
        query: { roomId: this.$route.params.roomId }
      })
    },
  },
}
</script>

<style>
.loginroom-container h1 {
  color: #656565;
}
</style>
