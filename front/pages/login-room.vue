<template>
  <div>
    <p v-if="no_room">不正なroomIDです</p>
    <p>{{ roomname }}</p>
    <div>
      <p>名前</p>
      <input v-model="name" placeholder="おなまえ" />
    </div>
    <button @click="loginRoom($route.query.id, name, false)">
      オフライン参加
    </button>
    <button @click="loginRoom($route.query.id, name, true)">
      オンライン参加
    </button>
  </div>
</template>

<script>
export default {
  modules: ['@nuxtjs/axios'],

  data() {
    return {
      roomname: '部屋名',
      name: ``,
      no_room: false,
    }
  },
  async created() {
    await this.getRoomName(this.$route.query.id)
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
        this.roomname = response.RoomName
      } catch (error) {
        this.no_room = true
      }
    },
    // 部屋にログインする
    async loginRoom(roomId, userName, attendStatus) {
      try {
        await this.$axios.$put(process.env.NUXT_ENV_ADD_USER_URL, {
          RoomId: roomId,
          UserName: userName,
          AttendStatus: attendStatus,
        })
        this.toWaitRoom()
      } catch (error) {
        return {
          statusCode: error,
        }
      }
    },
    toWaitRoom() {
      this.$router.push({
        path: `wait-room`,
        query: { id: this.$route.query.id },
      })
    },
  },
}
</script>
