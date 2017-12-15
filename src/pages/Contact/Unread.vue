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
      <md-list v-for="dialog in dialogs_new">      
        <md-list-item  @click.native="goTo('dialog', {id: dialog.userId})">  
              <md-ink-ripple/>
              <md-avatar  class="md-avatar-icon">
                <md-icon>email</md-icon>
              </md-avatar>
              <div class="md-list-text-container has-ripple">               
                <span><b>{{dialog.contactName}}</b></span> 
                <small>{{dialog.text}}</small>
              </div>
                                      
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
        'dialogs_new' : 'dialog/dialogs_new',       
        'userId' : 'user/user_id',
        'token' : 'user/token'       
      })
    },
    mounted(){     
     
    },
    methods: {
      ...mapActions({        

      }),
      goTo(route, params) {         
          this.$router.push({ name: route});
          if(params){

            this.$router.push({ name: route, params: params})
          }
      }      
    }   
  }
</script>