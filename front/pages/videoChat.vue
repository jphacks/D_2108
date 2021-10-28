<template>
  <div class="hello">
    <h1>
      Video Call<br><small style="font-size: 14pt;">Powered by Agora.io</small>
    </h1>
    <h4>Local video</h4>
    <div id="me"></div>
    <h4>Remote video</h4>
    <div id="container"></div>
  </div>
</template>

<script>
let AgoraRTC;
if (process.browser) {
  AgoraRTC = require('agora-rtc-sdk')
}
export default {
  name: 'Helloworld',
  mounted() {
    const client = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8',
    })
    const localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
    })
    client.init(process.env.APP_ID)
    client.join(
      process.env.TOKEN,
      process.env.CHANNEL_NAME,
      1,
      () => {
        localStream.init(() => {
          localStream.play('me')
          client.publish(localStream, handleError)
        }, handleError)
        client.on('stream-added', function (evt) {
          client.subscribe(evt.stream, handleError)
        })
        client.on('stream-subscribed', function (evt) {
          const stream = evt.stream
          const streamId = String(stream.getId())
          addVideoStream(streamId)
          stream.play(streamId)
        })
        client.on('stream-removed', function (evt) {
          const stream = evt.stream
          const streamId = String(stream.getId())
          stream.close()
          removeVideoStream(streamId)
        })
        client.on('peer-leave', function (evt) {
          const stream = evt.stream
          const streamId = String(stream.getId())
          stream.close()
          removeVideoStream(streamId)
        })
      },
      handleError
    )
  },
}
const handleError = function (err) {
  alert('Error: ', err)
}
function addVideoStream(elementId) {
  const streamDiv = document.createElement('div')
  streamDiv.id = elementId
  streamDiv.style.transform = 'rotateY(180deg)'
  streamDiv.style.width = '400px'
  streamDiv.style.height = '400px'
  document.getElementById('container').appendChild(streamDiv)
}
function removeVideoStream(elementId) {
  const remoteDiv = document.getElementById(elementId)
  if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv)
}
</script>

<style scoped>
* {
  font-family: sans-serif;
}
h1, h4 {
  text-align: center;
}
#me {
  width: 400px;
  height: 400px;
  margin: 0 auto;
}
#me video {
  position: relative !important;
}
#container video {
  position: relative !important;
}
</style>