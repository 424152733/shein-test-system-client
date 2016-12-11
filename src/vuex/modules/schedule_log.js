import { FETCH_SCHEDULE_LOG_LIST } from '../mutation-types'

const state = {
	list: [],
	schedules: [],
	page: {
		pagesize: 10,
		current: 1,
		total: 0,
	}
}

const mutations = {
	[FETCH_SCHEDULE_LOG_LIST](state, { response }) {
		state.list = response.data.list
		state.schedules = response.data.schedules.length > 0? response.data.schedules: state.schedules
		state.page = response.data.page
	}
}

export default {
	state,
	mutations
}