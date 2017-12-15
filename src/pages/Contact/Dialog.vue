<template id="main">
    <div>
        <md-toolbar>
            <md-button @click.native="goTo('contacts')" class="md-icon-button">
                <md-icon>
                    backspace
                </md-icon>
            </md-button>
            <h2 class="md-title">
                Rozmowa z {{contact.username}}
            </h2>
            <span style="flex:1">
            </span>
        </md-toolbar>
        <div class="container">
            <md-list class="dialog-list">
                <md-list-item class="dialog" v-bind:class="{'request': isReqiestOrResponse(dialog)}" v-for="dialog in dialogs_by_contact">
                    <span>
                        <p>{{dialog.text}}</p>
                        <p v-if="dialog.fileContent"><b>Załącznik</b><br/><a v-bind:href="dialog.fileContent">{{dialog.fileName}}</a></p>

                    </span>

                </md-list-item>
            </md-list>
            <md-list class="dialog-list" v-if="showTyping">
                <md-list-item class="dialog fejk-dialog">
                    <span>
                        <b>
                            {{contact.username}} pisze
                        </b>
                        <md-spinner :md-size="20" md-indeterminate="">
                        </md-spinner>
                    </span>
                </md-list-item>
            </md-list>
            <md-list class="dialog-list">
                <md-list-item class="dialog fejk-dialog">
                    <span>
                    </span>
                </md-list-item>
            </md-list>
            <div class="write-box">
                <textarea @click="startTyping" ref="textToSend" v-model="message">
                </textarea>
                <!-- <md-input-container>
		  	<md-file v-model="file"></md-file>
		</md-input-container> -->
		 		<label for="files" class="btn">		 			
       			 	<md-icon style="margin-bottom: 16px;">attach_file</md-icon>
       			 </label>
  				<input id="files" @change="onFileChange" style="visibility:hidden;width: 0px;" type="file">
                
                    <!-- <md-button class="md-icon-button" @click.native="attach()">
          <md-icon>attach_file</md-icon>
        </md-button>  -->
                <md-button @click.native="send()" class="md-icon-button">
                    <md-icon>
                        done
                    </md-icon>
                </md-button>
                <div class="attached-files" v-if="fileContent">
                	<span><b>Załącznik: </b>{{fileName}}</span>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex' 
  import io from 'socket.io-client';

  export default {
    name: 'main',
    props: ['id'],
    data () {
      return {
      	socket: {},
      	message: "",
      	showTyping: false,
      	file: null,
      	fileName: null,
      	fileContent: null
      }
    },
    watch : {     
      'message' : function (value) {      
        if(value.length >0){
        	console.log('client typing');
        	this.emitTyping(true);
        }else {
        	this.emitTyping(false);
        }              
      }
    },
    computed: {
      ...mapGetters({              
        'contact' : 'contact/contact',
        'dialogs_by_contact' : 'dialog/dialogs_by_contact',
        'userId' : 'user/user_id',
        'user' : 'user/user',
        'token' : 'user/token'       
      }),
      sortedDialogs(){
      	return
      }
      
    },
    mounted(){ 	   
      let vm = this;
      vm.setScrollPosition();  
      vm.getContact({       
        contactId: vm.id,
        token: vm.token
      });  
      vm.getDialogs({  
      	userId: vm.userId,     
        contactId: vm.id,
        token: vm.token
      }); 

      vm.socket = io('https://cryptic-hamlet-97705.herokuapp.com/');


      vm.socket.on('sendMessage', function(data){
      	 console.log(data)    	     
	  });

	   vm.socket.on('showTyping', function(data){
	   	if(data.contactId == vm.userId){
      	 	vm.showTyping = data.value;	     
	   	}
	  });

	  
	  vm.socket.on('newMessage', function(data){	    
	      vm.dialogs_by_contact.push(data);
	      vm.setScrollPosition();  
	      if(data.contactId == vm.userId){
	      	vm.checkAsOld({dialogId: data._id, token: vm.token});
	      }
	  });
	          
    },
    destroyed() {    	
    	this.socket.disconnect();
    },
    methods: {
      ...mapActions({
         'getContact' : 'contact/getContact',        
         'getDialogs' : 'dialog/getDialogs',        
         'checkAsOld' : 'dialog/checkAsOld',        
         'save' : 'dialog/save'       
      }),
      emitTyping(value){
      	    var vm = this;
			vm.socket.emit('isTyping', {
        		value: value,
        		userId: vm.userId,
        		contactId: vm.id
        	});
      },
      isReqiestOrResponse(dialog){
      	return dialog.userId === this.userId
      },
      goTo(route, params) {                   
          if(params){
            this.$router.push({ name: route, params: params})
          }else{
            this.$router.push({ name: route});
          }
      },
      startTyping(e){      	
        e.target.style.height = '150px'
        document.querySelector('.fejk-dialog').style.height = '200px'; 
        this.setScrollPosition();
      }, 
      endTyping(){
      	this.$refs.textToSend.style.height = '30px'
      	document.querySelector('.fejk-dialog').style.height = '20px'; 
      	this.setScrollPosition();
      },        
      attach(){

      },
      onFileChange(e){
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
		    vm.image = e.target.result;		   
		    vm.fileName = file.name;
		    vm.fileContent = e.target.result;

		  };
		  reader.readAsDataURL(file);
	  },
      setScrollPosition(){
      	var body = document.querySelector('body');      	
	 	body.scrollTop = body.scrollHeight;
      }, 
      send() {
      	this.endTyping();      	
      	var dialog = {
      		text: this.$refs.textToSend.value,
  			lp: this.dialogs_by_contact.length + 1,
  			userId: this.userId,     
    		contactId: this.id,
    		contactName: this.user.username,
    		type: "request",
    		token: this.token,
    		fileName: this.fileName,
    		fileContent: this.fileContent
      	};     	   
  		this.save(dialog);
      	
      	this.message = "";
      	this.fileContent = null;
      	this.fileName = null;
      	this.emitTyping(false);      	
      }
      
       
    }   
  }
</script>
<style>
    .dialog-list {
  	display: list-item;
  }
  .dialog.fejk-dialog {
  	background-color: transparent;
  	box-shadow: none;
  	border: none;
  }
  .dialog {
  	width: 70%;
  	margin: 10px;
  	border-radius: 10px;
  	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  	background-color: #88da47;	
    float: left;  
  } 
  .request.dialog {
	background-color: #efe369;	
    float: right;    
  }
  .write-box {
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;   
    background-color: white;
    border-top: 1px solid #ababab;
  }
  .write-box textarea {
  	border-radius: 10px;
  	border: 1px solid #ababab;
  	margin-top: 5px;
  	margin-left: 20px;
  	height: 30px;
  	width: 70%;
  }
  .write-box .md-button.md-icon-button {
  	/*float: left;*/
  }
  .md-file {
  	width: 30px;
    display: inline-flex;
  }

  .md-file input {
  	display: none;
  }

  .md-input-container.md-has-file {
  	width: 10px;
    margin: 0;
    display: inline-block;
    padding-top: 0;
  }
</style>