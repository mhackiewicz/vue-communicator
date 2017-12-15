<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <p>CliendId: "{{clientId}}"</p>
    <button @click="pingServer()">Ping Server</button>
    <button @click="getClientId()">getClientId</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    isConnected: false,
    socketMessage: '',
    clientId: ''
  }),
  mounted(){  
    console.log("Test");    
    console.log(this.$options.sockets);    
    console.log(this.$socket);    
    this.$options.sockets.messageChannel = (data) => {
      console.log(data)
      this.socketMessage = data;
    },
    this.$options.sockets.sendClientId = (data) => {
      console.log(data)
      this.clientId = data.client_id;
    }
  },
  methods: {
    pingServer() {
      console.log("Send message");
      this.$socket.emit('pingServer', 'PING!')
    },
    getClientId(){
      this.$socket.emit('getClientId', null)
    }
  }
}
</script>