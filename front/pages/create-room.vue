<template>
  <div>
    <div class="nameinput">
      <p>なまえ</p>
      <input v-model="name" placeholder="おなまえ" />
    </div>
    <div class="roominput">
      <p>部屋名入力欄</p>
      <input v-model="roomName" placeholder="" />
    </div>
    <div class="createbutton">
      <button>作成</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      roomName: '',
    }
  },
}
</script>