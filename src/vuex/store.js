import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

import schedule from './modules/schedule'
import setting from './modules/setting'
import tests from './modules/tests'
import schedule_log from './modules/schedule_log'
import site from './modules/site'
import menu from './modules/menu'
import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		schedule,
		setting,
		tests,
		schedule_log,
		site,
		menu,
		admin
	}
})