<template id="login">
  <div class="login-form">          
      <alert></alert>  
      <md-toolbar class="md-transparent">        
        <h2 class="md-title">LOGOWANIE</h2>
        <span style="flex:1"></span>
       <md-button>
          <router-link to="/register">Rejestracja</router-link>
       </md-button>    
    </md-toolbar>

    <md-layout md-align="center" >
      <div class="register-container">                 
          <form>
            <md-input-container>
              <label>Nazwa uzytkownika</label>
              <md-input v-model="user.username"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Hasło</label>
              <md-input type="password" v-model="user.password"></md-input>
            </md-input-container>
          </form>
          <md-layout class="view" md-align="center" md-column md-gutter>
            <md-button class="md-raised md-primary" style="flex:1" @click.native="login(user)">ZALOGUJ SIĘ</md-button> 
          </md-layout>            
      </div>
    </md-layout>
  </div>
</template>

<script>  
  import { mapActions, mapGetters } from 'vuex'
  import Alert from '../components/Alert.vue'

  export default {
    name: 'login',
    data () {
      return {}
    }, 
    components: {
      'alert': Alert
    },
    watch : {
      'user_id' : function (value) {
        if(value){
           localStorage.setItem('auth-key',value);
           this.$router.push('main');         
        }
      },     
    },
    computed: {
      ...mapGetters({
        'error' : 'user/error',
        'user' : 'user/user',
        'user_id' : 'user/user_id'
      })      
    },   
    methods: {
      ...mapActions({
         'login' : 'user/login'               
      })
    }
  }
</script>