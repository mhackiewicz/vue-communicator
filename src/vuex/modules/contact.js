import conf from '../conf' 
import axios from 'axios';
import Alert from './alert';

const state = {
	contacts_by_user: [],
	contacts_all: [],
	contact: {},
	invitations: []
}

const mutations = {
	SAVE_CONTACT(state,response) {
		console.log("SAVE_CONTACT");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}
		
	},
	DELETE_CONTACT(state,response) {
		console.log("DELETE_CONTACT");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else{
			Alert.state.msg = response.data.msg;
			Alert.state.type = "success";
		}		
	},	
	ACCEPT_INVITATION(state,response) {
		console.log("ACCEPT_INVITATION");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}
		
	},	
	GET_ALL_CONTACT(state,response) {
		console.log("GET_ALL_CONTACT");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else if(response.data.contacts){
			state.contacts_all = response.data.contacts;			
		}		
	},
	GET_USER_CONTACT(state,response) {
		console.log("GET_USER_CONTACT");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else if(response.data.contacts){
			state.contacts_by_user = response.data.contacts;			
		}		
	},	
	GET_CONTACT(state,response) {
		console.log("GET_CONTACT");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else if(response.data.contact){
			state.contact = response.data.contact;			
		}		
	},	
	GET_INVITATIONS(state,response) {
		console.log("GET_INVITATIONS");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else if(response.data.invitations){
			state.invitations = response.data.invitations;			
		}		
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
	getContacts ({commit}, data) {
		axios.get(conf.apiUrl +'contacts',
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_ALL_CONTACT',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},
	getContact ({commit}, data) {
		axios.get(conf.apiUrl +'contact/'+data.contactId,
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_CONTACT',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},
	getUserContacts ({commit}, data) {
		axios.get(conf.apiUrl +'contacts/'+data.userId,
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_USER_CONTACT',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},	
	getInvitations ({commit}, data) {
		axios.get(conf.apiUrl +'invitations/'+data.userId,
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_INVITATIONS',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},
	acceptInvitations ({commit}, data) {
		axios.post(conf.apiUrl +'acceptInvitations/'+data.id,
		{		  		   
		   	userId: data.userId,			
		   	contactId: data.contactId,			
		   	contactName: data.contactName,			
		   	userName: data.userName			
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('ACCEPT_INVITATION',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},	
	save ({commit}, data) {		
		axios.post(conf.apiUrl +'contacts', {		  
		   	userId: data.userId,
		   	userName: data.userName,
		   	contactId: data.contactId,			
		   	contactName: data.contactName			
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('SAVE_CONTACT',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
	},
	deleteContact ({commit}, data) {		
		axios.delete(conf.apiUrl +'contacts/'+data.contactId,
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);		 
		   commit('DELETE_CONTACT',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
	}		
}

const getters = {
	contacts_by_user: state => {
		return state.contacts_by_user
	},
	contacts_all: state => {
		return state.contacts_all
	},
	contact: state => {
		return state.contact
	},
	invitations: state => {
		return state.invitations
	}
	
}

const contact = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}

export default contact