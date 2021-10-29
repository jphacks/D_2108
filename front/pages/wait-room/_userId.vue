<template>
  <div>
    <p>オフライン</p>
    <div class="flex space-x-4 ...">
      <p>{{ url }}</p>
      <button @click="copyUrlToClipboard(url)">コピー</button>
      <button>QRコード</button>
    </div>
    <ul>
      <li v-for="user in users" :key="user.UserId">
        <div>
          <OnUserBlock
            v-if="user.AttendStatus === true"
            :name="user.UserName"
          />
          <OffUserBlock v-else :name="user.UserName" />
        </div>
      </li>
    </ul>
    <button>終了</button>
    <button @click="getRoomUsers($route.query.id)">更新</button>
  </div>
</template>

<script>
import OffUserBlock from '~/components/OffUserBlock.vue'
import OnUserBlock from '~/components/OnUserBlock.vue'

export default {
  modules: [
    // Using package name
    '@nuxtjs/axios',
    // Inline definition
    function () {},
  ],
  components: { OffUserBlock, OnUserBlock },
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
    copyUrlToClipboard(text) {
      navigator.clipboard.writeText(text).catch((e) => {})
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
