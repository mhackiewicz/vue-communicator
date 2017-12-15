import conf from '../conf' 
import axios from 'axios';
import Error from './alert';

const state = {
	profile: {		
		name: '',
		age: '',
		weight: '',
		growth: ''
	}	
}

const mutations = {
	SAVE_PROFILE(state,response) {
		console.log("SAVE_PROFILE");
		console.log(response);
		if(!response.data.success){
			Error.state.error = response.data.msg;
		}
		
	},
	GET_PROFILE(state,response) {
		console.log("GET_PROFILE");
		console.log(response);
		if(!response.data.success){
			Error.state.error = response.data.msg;
		}else if(response.data.profile){
			state.profile = response.data.profile;			
		}		
	},	
	API_FAILURE(state, response){
		Error.state.error = response.data.msg
	}
}

const actions = {
	getProfile ({commit}, data) {
		axios.get(conf.apiUrl +'profile/'+data.userId,
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_PROFILE',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},
	save ({commit}, data) {		
		axios.post(conf.apiUrl +'profile', {		  
		   	userId: data.userId,
		   	name: data.name,
			age: data.age,
			weight: data.weight,
			gender: data.gender,
			growth: data.growth
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('SAVE_PROFILE',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
	}	
}

const getters = {
	profile: state => {
		return state.profile
	}
}

const profile = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}

export default profile