import { FETCH_SYSTEM_SITE ,DEL_SYSTEM_SITE, ADD_SYSTEM_SITE } from '../mutation-types'

const state = {
	list: [],
	page: {
		pagesize: 10,
		current: 1,
		total: 0,
	}
}

const mutations = {
	[FETCH_SYSTEM_SITE](state, { response }) {
		state.list = response.data.list
		state.page = response.data.page
	},

	[ADD_SYSTEM_SITE](state, { response }) {
		if(state.list.length === state.page.pagesize) {
			state.list.pop()
		}
		state.list = [response.data.info].concat(state.list)
		state.page = Object.assign({}, state.page, { total: state.page.total + 1 })
	},

	[DEL_SYSTEM_SITE](state, { id, response }) {
		state.list = response.data.list
		state.page = Object.assign({}, state.page, { total: state.page.total - 1 })
	}
}

export default {
	state,
	mutations
}