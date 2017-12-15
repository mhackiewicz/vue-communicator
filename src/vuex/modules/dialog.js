import conf from '../conf' 
import axios from 'axios';
import Alert from './alert';

const state = {
	dialogs_by_contact: [],
	dialogs_new: []	
}

const mutations = {
	SAVE_DIALOG(state,response) {
		console.log("SAVE_DIALOG");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}		
	},
	READ_DIALOG(state,response) {
		console.log("READ_DIALOG");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}
	},
	GET_DIALOGS_BY_CONTACT(state,response) {
		console.log("GET_DIALOGS_BY_CONTACT");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else if(response.data.dialogs){
			state.dialogs_by_contact = response.data.dialogs;			
		}		
	},	
	GET_NEW_DIALOGS(state,response) {
		console.log("GET_NEW_DIALOGS");
		console.log(response);
		if(!response.data.success){
			Alert.state.msg = response.data.msg;
			Alert.state.type = "error";
		}else if(response.data.dialogs){
			state.dialogs_new = response.data.dialogs;			
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
	getDialogs ({commit}, data) {
		axios.post(conf.apiUrl +'dialogsByContact/'+data.userId, 
		{
			contactId: data.contactId			
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_DIALOGS_BY_CONTACT',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},
	getNewDialogs ({commit}, data) {
		axios.post(conf.apiUrl +'dialogsNew/'+data.userId, 
		{
			contactId: data.userId			
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('GET_NEW_DIALOGS',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
		
	},	
	checkAsOld ({commit}, data) {		
		axios.post(conf.apiUrl +'checkDialog/'+data.dialogId, {		  		  
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('READ_DIALOG',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
	},		
	save ({commit}, data) {		
		axios.post(conf.apiUrl +'dialog', {		  
		   	userId: data.userId,
		   	contactId: data.contactId,			
		   	text: data.text,
			lp: data.lp,
			type: data.type,
			contactName: data.contactName,		
			fileName: data.fileName,		
			fileContent: data.fileContent		
		},
		{
    		headers: { authorization: data.token }
		})
		.then(function (response) {
		   console.log(response);
		   commit('SAVE_DIALOG',response)
		})
		.catch(function (error) {
		   console.log(error.response);
		   commit('API_FAILURE',error.response)
		});	
	}	
}

const getters = {
	dialogs_by_contact: state => {
		return state.dialogs_by_contact
	},
	dialogs_new: state => {
		return state.dialogs_new
	}		
		
}

const dialog = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}

export default dialog