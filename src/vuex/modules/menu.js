import { ADD_MENU, DEL_MENU, FETCH_MENU, UPDATE_MENU } from '../mutation-types'

const state = {
	list: [],
	page: {
		pagesize: 10,
		current: 1,
		total: 0,
	}
}

const mutations = {
	[FETCH_MENU] (state, { response }) {
		state.list = response.data.list
		state.page = response.data.page
	},

	[ADD_MENU] (state, { response }) {
		if(state.list.length === state.page.pagesize) {
			state.list.pop()
		}
		state.list = [response.data.info].concat(state.list)
		state.page = Object.assign({}, state.page, { total: state.page.total + 1 })
	},

	[DEL_MENU] (state, { id, response }) {
		state.list = response.data.list
		state.page = Object.assign({}, state.page, { total: state.page.total - 1 })
	},

	[UPDATE_MENU] (state, { response }) {
		const array = state.list.concat()
		const index = state.list.findIndex(item =>   item._id == response.data.info._id)
		state.list[index] = response.data.info
		state.list = array
	}
}

export default {
  state,
  mutations
}