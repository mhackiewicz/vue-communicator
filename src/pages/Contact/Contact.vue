<template id="main">
<div>
  <alert></alert>   
  <div v-if="!isCurrentUser">         
      <md-toolbar>    
        <md-button class="md-icon-button" @click.native="goTo('contacts')">
          <md-icon>backspace</md-icon>
        </md-button>    
        <h2 class="md-title">Kontakt info</h2>
        <span style="flex:1"></span>  
              
      </md-toolbar>

    <div class="container">                               
       {{contact.username}}
    </div>
  </div>
   <div v-if="isCurrentUser">         
      <md-toolbar>    
        <md-button class="md-icon-button" @click.native="goTo('main')">
          <md-icon>backspace</md-icon>
        </md-button>    
        <h2 class="md-title">Ustawienia</h2>
        <span style="flex:1"></span>  
              
      </md-toolbar>
    <br/>
    <div class="container">
      <md-layout md-align="center" >     
          <label for="files" class="btn" v-if="!avatar">                
               <md-avatar  class="md-avatar-icon md-large" >
                <md-icon>account_circle</md-icon>
              </md-avatar> 
          </label>
          <label for="files" class="btn" v-if="avatar">              
               <md-avatar  class="md-avatar-icon md-large" >
                <img v-bind:src="avatar" alt="Avatar">
              </md-avatar> 
          </label>
          <input id="files" @change="addAvatar" style="visibility:hidden;width: 0px;" type="file">                                        
      </md-layout>
      <br/>
      <br/>
      <md-layout md-align="center" > 
         <form>
            <md-input-container>
              <label>Nazwa użytkownika</label>
              <md-input v-model="contact.username"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Adres email</label>
              <md-input v-model="contact.email"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Hasło</label>
              <md-input type="password" v-model="newPassword"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Powtórz hasło</label>
              <md-input type="password" v-model="rePassword"></md-input>
            </md-input-container>
          </form>
      </md-layout>
      <md-layout  md-align="center" >
          <md-button class="md-raised md-primary" style="flex:0.5" @click.native="updateUser(contact)">Zapisz</md-button> 
      </md-layout>
    </div>
  </div>
</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Alert from '../../components/Alert.vue'

  export default {
    name: 'main',
    props: ['id'],
    components: {
      'alert': Alert
    },
    data () {
      return {
        isCurrentUser: false,
        avatar: null,
        newPassword: "",
        rePassword: ""
      }
    },
    computed: {
      ...mapGetters({              
        'contact' : 'contact/contact',
        'userId' : 'user/user_id',
        'token' : 'user/token'       
      }),
    },
    mounted(){   
      if(this.id === this.userId){
        this.isCurrentUser = true;
      }
      this.getContact({       
        contactId: this.id,
        token: this.token
      });
      if(this.contact.avatar){
        this.avatar = this.contact.avatar;
      }

    },
    methods: {
      ...mapActions({
         'getContact' : 'contact/getContact',        
         'update' : 'user/update',        
         'setAlert' : 'alert/setAlert'            
      }),
      goTo(route, params) {                   
          if(params){
            this.$router.push({ name: route, params: params})
          }else{
            this.$router.push({ name: route});
          }
      },
      updateUser(user) {
        console.log("Update");
        console.log(user);
       
        if(!this.validateEmail(user.email)){
           this.setAlert({
            msg: "Email niepoprawny!",
            type: "error"
          });
        }else if(this.newPassword === this.rePassword){
          this.update({
            userId: this.userId,
            username: user.username,
            password: this.newPassword,
            email: user.email,
            avatar: this.avatar,
            token: this.token
          });
        }else{
          this.setAlert({
            msg: "Błędne powtórzone hasło!",
            type: "error"
          });          
        } 
      },
      addAvatar(e){
        console.log("addAvatar");
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {                
          vm.avatar = e.target.result

        };
        reader.readAsDataURL(file);
      },
      validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }  
    }   
  }
</script>