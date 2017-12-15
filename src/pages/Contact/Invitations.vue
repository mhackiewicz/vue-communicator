<template id="main">
  <div>         
      <md-toolbar>    
        <md-button class="md-icon-button" @click.native="goTo('main')">
          <md-icon>backspace</md-icon>
        </md-button>    
        <h2 class="md-title">Zaproszenia</h2>
        <span style="flex:1"></span>            
      </md-toolbar>

    <div class="container"> 
      <md-list v-for="contact in invitations">      
        <md-list-item >  
               
              <md-avatar  class="md-avatar-icon">
                <md-icon>account_circle</md-icon>
              </md-avatar>
              <div class="md-list-text-container has-ripple">               
                <span>{{contact.userName}}</span> 
              </div>

                
            <md-menu>
              <md-button md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item @click.native="accept(contact)">Akceptuj</md-menu-item>               
                <md-menu-item @click.native="discard(contact.contactId)">Odrzuc</md-menu-item>               
                            
              </md-menu-content>
            </md-menu>      
          
        </md-list-item>
       </md-list>                                  
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'main',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({                   
        'invitations' : 'contact/invitations',       
        'userId' : 'user/user_id',
        'token' : 'user/token'       
      })
    },
    mounted(){     
     
    },
    methods: {
      ...mapActions({
         'getUserContacts' : 'contact/getUserContacts',   
         'acceptInvitations' : 'contact/acceptInvitations'  

      }),
      goTo(route, params) {         
          this.$router.push({ name: route});
          if(params){

            this.$router.push({ name: route, params: params})
          }
      },
      accept(contact){
         this.acceptInvitations({  
            id: contact._id,  
            userId: this.userId,
            contactId: contact.userId,
            contactName: contact.userName,
            userName: contact.contactName,
            token: this.token
          }); 
      },
      discard(contactId){

      }
    }   
  }
</script>