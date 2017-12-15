<template id="main">
  <div>   
      <alert></alert>        
      <md-toolbar>        
        <h2 class="md-title">Communicator v1.0</h2>
        <span style="flex:1"></span>  
         
         <md-button class="md-icon-button" @click.native="goTo('invitations')">
          <span style="margin-left: 23px; color:#00ff2d;">{{invitations.length }}</span>
          <md-icon>supervisor_account</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click.native="goTo('unread')">
          <span style="margin-left: 23px; color:#00ff2d;">{{dialogs_new.length}}</span>
          <md-icon>message</md-icon>
        </md-button>       
      </md-toolbar>

    <div class="container">                        
        <md-layout class="view" md-align="center" md-column md-gutter>
          <md-button class="md-primary" style="flex:1"  @click.native="goTo('contacts')">Kontakty</md-button> 
        </md-layout> 
        <md-layout class="view" md-align="center" md-column md-gutter>
          <md-button class="md-primary" style="flex:1">Ostatnie rozmowy</md-button> 
        </md-layout>
        <md-layout class="view" md-align="center" md-column md-gutter>
          <md-button class="md-primary" style="flex:1" @click.native="goTo('contact', {id: userId})">Ustawienia</md-button> 
        </md-layout>
            
        <md-layout class="view" md-align="center" md-column md-gutter>
          <md-button class="md-accent" style="flex:1"  @click.native="logoutUser">Wyloguj</md-button> 
        </md-layout>           
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Alert from '../components/Alert.vue'

  export default {
    name: 'main',
    data () {
      return {}
    },
    components: {
      'alert': Alert
    },
    computed: {
      ...mapGetters({                   
        'invitations' : 'contact/invitations',
        'dialogs_new' : 'dialog/dialogs_new',
        'userId' : 'user/user_id',
        'token' : 'user/token'       
      })
    },
    mounted(){   
      this.getInvitations({       
        userId: this.userId,
        token: this.token
      }); 
      this.getNewDialogs({
        userId: this.userId,
        token: this.token
      });  
    },
    methods: {
      ...mapActions({
         'logout' : 'user/logout',   
         'getInvitations' : 'contact/getInvitations',  
         'getNewDialogs' : 'dialog/getNewDialogs'   
              
      }),
      goTo(route, params) {                   
          if(params){
            this.$router.push({ name: route, params: params})
          }else{
            this.$router.push({ name: route});
          }
      },
      logoutUser() {
        this.logout();
        localStorage.removeItem('auth-key');
        this.$router.push('login')
      }
    }   
  }
</script>
