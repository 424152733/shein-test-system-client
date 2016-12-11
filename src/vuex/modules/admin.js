import { ADD_ADMIN, FETCH_ADMIN, DEL_ADMIN } from '../mutation-types'

let state = {
	list: [],
	page: {
		pagesize: 10,
		current: 1,
		total: 0,
	}
}

const mutations = {
	[FETCH_ADMIN] (state, { response }) {
		state.list = response.data.list
		state.page = response.data.page
	},

	[ADD_ADMIN] (state, { response }) {
		if(state.list.length === state.page.pagesize) {
			state.list.pop()
		}
		state.list = [response.data.info].concat(state.list)
		state.page = Object.assign({}, state.page, { total: state.page.total + 1 })
	},

	[DEL_ADMIN] (state, { id, response }) {
		state.list = response.data.list
		state.page = Object.assign({}, state.page, { total: state.page.total - 1 })
	},
}

export default {
  state,
  mutations
}