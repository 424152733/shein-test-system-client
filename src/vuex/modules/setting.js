import { TOGGLE_LOADING, SWITCH_SETTING, TOGGLE_SITE, TOGGLE_REFLASH_LOADING } from '../mutation-types'

const state = {
	loading: false,
	reflash_loading: false,
	site_route: 'shein_m',
	lang: 'en',
	currency: 'USD',
}

const mutations = {
	[TOGGLE_LOADING] (state, bool) {
		state.loading = bool
	},

	[SWITCH_SETTING] (state, { response }) {
		state.currency = response.currency
		state.lang = response.lang
	},

	[TOGGLE_SITE] (state, site) {
		state.site_route = site
	},

	[TOGGLE_REFLASH_LOADING] (state, bool) {
		state.reflash_loading = bool
	}
}

export default {
	state,
	mutations
}