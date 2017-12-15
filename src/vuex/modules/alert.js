const state = {	
	msg: '',
	type: 'error'
}

const mutations = {		
	CLEAR_ALERT(state){
		state.msg = ""
	},
	SET_ALERT(state,data){
		state.msg = data.msg;
		state.type = data.type;
	}
}

const actions = {
	clearAlert ({commit}) {		
		commit('CLEAR_ALERT')
	},
	setAlert({commit},data) {
		commit('SET_ALERT',data)
	}


}

const getters = {		
	msg: state => {
		return state.msg
	},
	type: state => {
		return state.type
	}
}

const error = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}

export default error