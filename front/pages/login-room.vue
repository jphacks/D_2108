<template>
  <div>
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
  data() {
    return {
      roomname: '部屋名',
    }
  },
}
</script>
