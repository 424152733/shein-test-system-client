import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import SNav from './components/layout/nav'
import TestCreateOrder from './components/module/test/create_order'
import TaskList from './components/module/task/list'
import TaskLog from './components/module/task/log'
import SystemSite from './components/module/system/site'
import SystemMenu from './components/module/system/menu'
import SystemAdmin from './components/module/system/admin'
import Auth from './components/auth/auth'
import store from './vuex/store'
import { loadingAnimation } from './vuex/actions'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

//拦截器
Vue.http.interceptors.push((request, next) => {
	loadingAnimation(store, true)
    next(response => {
    	response.body = typeof response.body == 'string'? JSON.parse(response.body): response.body
    	loadingAnimation(store, false)
    })
});

router.map({
	'/login': {
		component: Auth
	},
	'/': {
		component: SNav,
		subRoutes: {
			'/': {
				component: TaskList
			}
		}
	},
	'/:site': {
		component: SNav,
		subRoutes: {
			'/test/create_order': {
				component: TestCreateOrder
			},
			'/task/list': {
				component: TaskList
			},
			'/task/log': {
				component: TaskLog
			},
			'/system/site': {
				component: SystemSite
			},
			'/system/menu': {
				component: SystemMenu
			},
			'/system/admin': {
				component: SystemAdmin
			},
		}
	}
})

router.start(App, '#app')



