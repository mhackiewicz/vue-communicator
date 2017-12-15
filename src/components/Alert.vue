<template id="alert">          
      <md-snackbar  md-position="top right" ref="snackbar" :md-duration="4000">
        <span class="alert-msg" v-bind:class="type">{{msg}}</span>
        <md-button class="md-accent" md-theme="light-blue" @click.native="closeAlert">Close</md-button>
      </md-snackbar>         
</template>

<script>  
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'alert',
    data () {
      return {}
    },     
    watch : {     
      'msg' : function (value) {            
        if(value.length > 0){
          var that = this
          that.$refs.snackbar.open(); 
          setTimeout(function(){          
            that.clearAlert();
          },4050);        
        }
      }
    },
    computed: {
      ...mapGetters({
        'msg' : 'alert/msg',       
        'type' : 'alert/type'       
      })      
    },   
    methods: {
      ...mapActions({        
         'clearAlert' : 'alert/clearAlert'       
      }),
      closeAlert(){
        this.clearAlert();
        this.$refs.snackbar.close();
      }
    }
  }
</script>

<style>
  .alert-msg.error {
    color: red;
  }
  .alert-msg.success {
    color: green;
  }
</style>