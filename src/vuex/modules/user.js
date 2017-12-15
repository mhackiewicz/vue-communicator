import conf from '../conf' 
import axios from 'axios';
import Alert from './alert';

const state = {
	user: {},
	user_id: null,	
	token: ''
}

const mutations = {
	REGISTER_USER(state,response) {
		console.log("REGISTER_USER");
		console.log(response);
		if(!response.data.success){			
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else{
			Alert.state.msg = response.data.msg;
			Alert.state.type = "success";
		}
		
	},
	UPDATE_USER(state,response) {
		console.log("UPDATE_USER");
		console.log(response);
		if(!response.data.success){			
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else{
			state.user = response.data.user;
			Alert.state.msg = response.data.msg;
			Alert.state.type = "success";
		}
		
	},	
	LOGIN_USER(state,response) {
		console.log("LOGIN USER");
		console.log(response);
		if(!response.data.success){					
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else{
			state.token = response.data.token;					
			state.user_id = response.data.user._id;
			state.user = response.data.user;
		}
		
	},
	LOGOUT_USER(state) {
		state.user = {};
		state.user_id = null;
	},
	API_FAILURE(state, response){				
		if(response == null){
			Alert.state.msg = 'Problem po stronie serwera';
			Alert.state.type = "error";
		}else{
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}
	}	
}

const actions = {
	login ({commit}, data) {
		axios.post(conf.apiUrl +'signin', {
		   username: data.username,
		   password: data.password
		})
		.then(function (response) {
		   console.log(response);
		   commit('LOGIN_USER',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});
		
	},
	logout ({commit}) {		
		commit('LOGOUT_USER')
	},
	register ({commit}, data) {
		axios.post(conf.apiUrl +'signup', {
		   username: data.username,
		   password: data.password,
		   email: data.email
		})
		.then(function (response) {
		   console.log(response);
		   commit('REGISTER_USER',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});		
	},	
	update ({commit}, data) {
		axios.post(conf.apiUrl +'updateUser', {
		   userId: data.userId,
		   username: data.username,
		   password: data.password,
		   email: data.email,
		   avatar: data.avatar
		},{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('UPDATE_USER',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});		
	}	
	
}

const getters = {
	user: state => {
		return state.user
	},
	user_id: state => {
		return state.user_id
	},
	token: state => {
		return state.token
	}
}

const user = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}

export default user