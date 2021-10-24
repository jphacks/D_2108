<template>
  <div>
    <p>オフライン</p>
    <div class="flex space-x-4 ...">
      <p>{{url}}</p>
      <button @click="copyUrlToClipboard(url)">コピー</button>
      <button>QRコード</button>
    </div>
    <div>
      <div class="flex space-x-4 ...">
        <div class="icon">
          <p>オフ</p>
          <img src="" alt="">
        </div>
        <p>なまえ</p>
      </div>
      <div class="flex space-x-4 ...">
        <div class="icon">
          <p>オン</p>
          <img src="" alt="">
        </div>
        <p>なまえ</p>
      </div>      
    </div>
    <button>終了</button>
    <button>更新</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url:"http://localhost:3000/wait-room"
    }
  },
  methods:{
    copyUrlToClipboard(text){
      navigator.clipboard.writeText(text).catch((e)=>{

      });
    }
  }
}
</script>
