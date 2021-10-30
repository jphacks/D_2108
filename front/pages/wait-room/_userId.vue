<template>
  <div class="waitroom-container w-3/5 max-w-screen-md m-auto">
    <img src="/images/ontooff.png" alt="おんとおふ" class="m-auto lg:h-48 product-name-img">
    <p class="text-2xl user-name mx-8">{{ $route.query.userName }}</p>
    <div class="flex space-x-4 py-12">
      <input type="text" :value="url" onfocus="this.select();" class="border-4 url-text rounded-xl p-2 flex-grow">
      <Button text="コピー" color-code="#58340e" @toggleButton="copyUrlToClipboard()" />
    </div>
    <div v-for="user in users" :key="user.UserId">
      <UserCard :user-name="user.UserName" :status="user.AttendStatus" :connect-status="user.ConnectStatus" class="card-border mb-2" />
    </div>
    <button>終了</button>
    <button @click="getRoomUsers($route.query.id)">更新</button>
  </div>
</template>

<script>
export default {
  modules: [
    '@nuxtjs/axios',
  ],
  data() {
    return {
      url: ``,
      users: [],
    }
  },
  created() {
    this.url = 'http://localhost:3000/login-room/' + this.$route.query.roomId
    this.getRoomUsers(this.$route.query.roomId)
  },
  methods: {
    // 入室用URLをクリップボードにコピー
    copyUrlToClipboard() {
      navigator.clipboard.writeText(this.url).catch((e) => {})
    },
    // 入室しているUserのパラメータを取得
    async getRoomUsers(roomId) {
      try {
        const responce = await this.$axios.$get(
          process.env.NUXT_ENV_GET_ROOMUSERS_URL,
          {
            params: { RoomId: roomId },
          }
        )
        this.users = responce.Users
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

<style scoped>
.url-text, .card-border {
  border-color: #58340e;
}

.user-name {
  color: #58340e;
  font-weight: bold;
  border-bottom: #58340e 2px solid;
}

.waitroom-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
