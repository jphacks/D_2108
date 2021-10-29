<template>
  <div>
    <div class="flex space-x-4 ...">
      <div class="icon">
        <p>オン</p>
      </div>
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name'],
}
</script>