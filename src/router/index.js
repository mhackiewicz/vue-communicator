import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Test from '@/pages/WebSocketTest'
import Contacts from '@/pages/Contact/Contacts'
import Contact from '@/pages/Contact/Contact'
import addContact from '@/pages/Contact/AddContact'
import Dialog from '@/pages/Contact/Dialog'
import Invitations from '@/pages/Contact/Invitations'
import Unread from '@/pages/Contact/Unread'
import NoInternet from '@/pages/NoInternet'
Vue.use(Router)
const auth = (to, from, next) => {
    if (!navigator.onLine) {
        next('/nointernet');
    }
    if (localStorage.getItem('auth-key')) {
        next()
    } else {
        next('/login');
    }
}
export default new Router({
    routes: [{ 
    	path: '/', redirect: '/main' 
	},
    {
        path: '/main',
        name: 'main',
        component: Main,
        beforeEnter: auth
    },{
        path: '/contacts',
        name: 'contacts',
        component: Contacts,
        beforeEnter: auth
    },{
        path: '/invitations',
        name: 'invitations',
        component: Invitations,
        beforeEnter: auth
    },{
        path: '/unread',
        name: 'unread',
        component: Unread,
        beforeEnter: auth
    },{
        path: '/test',
        name: 'test',
        component: Test,
        beforeEnter: auth
    },{
        path: '/contacts/:id',
        name: 'contact',
        component: Contact,
        props: true,
        beforeEnter: auth
    },{
        path: '/dialog/:id',
        name: 'dialog',
        component: Dialog,
        props: true,
        beforeEnter: auth
    },{
        path: '/addContact',
        name: 'addContact',
        component: addContact,
        beforeEnter: auth
    },{
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/nointernet',
        name: 'NoInternet',
        component: NoInternet,
        beforeEnter: (to, from, next) => {
            if (navigator.onLine) {
                next('/');
            } else {
                next();
            }
        }
    }]
})