<template>
  <div>
    <p>{{ roomname }}</p>
    <div>
      <p>名前hogehoge</p>
      <input />
    </div>
    <button>オフライン参加</button>
    <button>オンライン参加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomname: '部屋名',
    }
  },
  methods: {
    // 部屋名を取得する
    getRoomName() {},
    // 部屋にログインする
    loginRoom() {},
  },
}
</script>
