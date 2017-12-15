import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import profile from './modules/profile'
import contact from './modules/contact'
import dialog from './modules/dialog'
import alert from './modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {		
		user: user,
		profile: profile,
		alert: alert,
		contact: contact,
		dialog: dialog
	}
});