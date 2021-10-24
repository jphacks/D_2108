<template>
  <div>
    <p>オフライン</p>
    <div class="flex space-x-4 ...">
      <p>{{ url }}</p>
      <button @click="copyUrlToClipboard(url)">コピー</button>
      <button>QRコード</button>
    </div>
    <div>
      <off-user-block></off-user-block>
      <on-user-block></on-user-block>
    </div>
    <button>終了</button>
    <button>更新</button>
  </div>
</template>

<script>
import OffUserBlock from '~/components/OffUserBlock.vue'
import OnUserBlock from '~/components/OnUserBlock.vue'

export default {
  components: { OffUserBlock, OnUserBlock },
  data() {
    return {
      url: 'http://localhost:3000/wait-room',
    }
  },
  methods: {
    copyUrlToClipboard(text) {
      navigator.clipboard.writeText(text).catch((e) => {})
    },
  },
}
</script>
