<template id="main">
  <div>         
      <md-toolbar>    
        <md-button class="md-icon-button" @click.native="goTo('main')">
          <md-icon>backspace</md-icon>
        </md-button>    
        <h2 class="md-title">Kontakty</h2>
        <span style="flex:1"></span>    
        <md-button class="md-icon-button" @click.native="goTo('addContact')">
          <md-icon class="md-size-2x">add</md-icon>
        </md-button> 
      </md-toolbar>

    <div class="container"> 
      <md-list v-for="contact in contacts_by_user">      
        <md-list-item >  
               
              <md-avatar  class="md-avatar-icon">
                <md-icon>account_circle</md-icon>
              </md-avatar>
              <div class="md-list-text-container has-ripple" @click.native="goTo('dialog', {id: contact.contactId})">
                <md-ink-ripple /> 
                <span>{{contact.contactName}}</span> 
                <p v-if="contact.status == 'pending'" style="color:red">Zaproszenie czeka do akceptacji</p>
              </div>

                
            <md-menu>
              <md-button md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item v-if="contact.status != 'pending'" @click.native="goTo('dialog', {id: contact.contactId})">Rozmawiaj</md-menu-item>               
                <md-menu-item @click.native="goTo('contact', {id: contact.contactId})">Info</md-menu-item>               
                <md-menu-item @click.native="remove(contact)">Usuń</md-menu-item>               
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
        'contacts_by_user' : 'contact/contacts_by_user',       
        'userId' : 'user/user_id',
        'token' : 'user/token'       
      })
    },
    mounted(){     
      this.getUserContacts({       
        userId: this.userId,
        token: this.token
      });
    },
    methods: {
      ...mapActions({
         'getUserContacts' : 'contact/getUserContacts',   
         'deleteContact' : 'contact/deleteContact'
      }),
      goTo(route, params) {                   
          if(params){
            this.$router.push({ name: route, params: params})
          }else{
            this.$router.push({ name: route});
          }
      },
      remove(contact){
        this.deleteContact({
           contactId: contact._id,
           token: this.token
        });
        this.getUserContacts({       
          userId: this.userId,
          token: this.token
        });
      }
    }   
  }
</script>