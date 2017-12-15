<template id="addContact">
  <div>
      <alert></alert>           
      <md-toolbar>    
        <md-button class="md-icon-button" @click.native="goTo('contacts')">
          <md-icon>backspace</md-icon>
        </md-button>    
        <h2 class="md-title">Dodaj kontakt</h2>
        <span style="flex:1"></span>            
      </md-toolbar>

    <div class="container">
        <form >                                
        <md-input-container>          
          <md-input v-model="search" placeholder="Search contact..."></md-input>
          <md-icon>search</md-icon>
        </md-input-container>
        </form>
        <md-list v-for="contact in filteredList">      
          <md-list-item>           
            <md-avatar  class="md-avatar-icon">
              <md-icon>account_circle</md-icon>
            </md-avatar>

            <span>{{contact.name}}</span>
            <md-menu>
              <md-button md-menu-trigger>
                <md-icon>add</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item @click.native="addToList(contact)">Dodaj</md-menu-item>               
              </md-menu-content>
            </md-menu>
          
          </md-list-item>
        </md-list>        
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Alert from '../../components/Alert.vue'

  export default {
    name: 'main',
    data () {
      return {
        search: ""
      }
    },  
    components: {
      'alert': Alert
    },
    computed: {
      ...mapGetters({       
        'contacts_all' : 'contact/contacts_all',       
        'contacts_by_user' : 'contact/contacts_by_user',       
        'userId' : 'user/user_id',
        'user' : 'user/user',
        'token' : 'user/token'       
      }),
      filteredList() {
        return this.contacts_all.filter(contact => {
          if(this.search !== ''){           
            var tmp = false;
            this.contacts_by_user.forEach(contact_user => {               
                if(contact_user.contactId === contact.id){
                  tmp = true;
                }
            });
            if(this.userId === contact.id) {
              tmp = true;
            }
            if(!tmp){
               return contact.name.toLowerCase().includes(this.search.toLowerCase())   
            }
                
          }
                 
        })
      }      
    },
    mounted(){
      this.getContacts({       
        token: this.token
      });
      this.getUserContacts({       
        userId: this.userId,
        token: this.token
      });
    },
    methods: {
      ...mapActions({
         'getContacts' : 'contact/getContacts',
         'getUserContacts' : 'contact/getUserContacts',
         'save' : 'contact/save'     
      }),
      goTo(route, params) {
          this.$router.push({ name: route});
          if(params){
            this.$router.push({ name: route, params: params})

          }
      },  
      addToList(contact) {
        this.save({
          userId: this.userId,
          contactId: contact.id,
          contactName: contact.name,
          userName: this.user.username,
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