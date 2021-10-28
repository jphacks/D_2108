<template>
  <div>
    <div class="flex space-x-4 ...">
      <div class="icon">
        <p>オフ</p>
      </div>
      <p>{{ name }}</p>
      <button>憑依</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name'],
}
</script>
