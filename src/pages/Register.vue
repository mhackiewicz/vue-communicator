<template id="register">
  <div class="login-form">
    <alert></alert>   
      <md-toolbar class="md-transparent">        
        <h2 class="md-title">REJESTRACJA</h2>
        <span style="flex:1"></span>
       <md-button>
          <router-link to="/login">Logowanie</router-link>
       </md-button>    
    </md-toolbar>

    <md-layout md-align="center" >
      <div class="register-container">                 
          <form>
            <md-input-container>
              <label>Nazwa użytkownika</label>
              <md-input v-model="user.username"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Adres email</label>
              <md-input v-model="user.email"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Hasło</label>
              <md-input type="password" v-model="user.password"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Powtórz hasło</label>
              <md-input type="password" v-model="user.repassword"></md-input>
            </md-input-container>
          </form>
          <md-layout class="view" md-align="center" md-column md-gutter>
            <md-button class="md-raised md-primary" style="flex:1" @click.native="registerUser(user)">ZAREJESTRUJ SIĘ</md-button> 
          </md-layout>
        
        
      </div>
    </md-layout>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Alert from '../components/Alert.vue'

  export default {
    name: 'register',
    data () {
      return {}
    }, 
    components: {
      'alert': Alert
    },
    computed: {
      ...mapGetters({
        'alert' : 'alert/msg',
        'alertType' : 'alert/type',
        'user' : 'user/user',
      })      
    },   
    methods: {
      ...mapActions({
         'register' : 'user/register',       
         'setAlert' : 'alert/setAlert'        
      }),
      validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      registerUser(user){

        if(!this.validateEmail(this.user.email)){
           this.setAlert({
            msg: "Email niepoprawny!",
            type: "error"
          });
        }else if(this.user.password === this.user.repassword){
          this.register(user)
        }else{
          this.setAlert({
            msg: "Błędne powtórzone hasło!",
            type: "error"
          });          
        } 
        
      } 
    }
  }
</script>