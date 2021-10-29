<template>
  <div>
    <p v-if="no_room">不正なroomIDです</p>
    <p>{{ roomname }}</p>
    <div>
      <p>名前</p>
      <input />
    </div>
    <button>オフライン参加</button>
    <button>オンライン参加</button>
  </div>
</template>

<script>
export default {
  modules: [
    // Using package name
    '@nuxtjs/axios',
  ],

  data() {
    return {
      roomname: '部屋名',
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
        const response = await this.$axios.$get(process.env.GET_ROOM_URL, {
          params: { RoomId: roomId },
        })
        this.roomname = response.RoomName
      } catch (error) {
        this.no_room = true
      }
    },
    // 部屋にログインする
    loginRoom() {
      return status
    },
  },
}
</script>
