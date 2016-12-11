import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.headers = { "X-Requested-With": "XMLHttpRequest"}
Vue.http.options.emulateJSON = true;

var host = `http://${window.location.host}`;
// var host = 'http://localhost:5000'
//loading
export const loadingAnimation = ({ dispatch, state } ,bool) => {
	dispatch('TOGGLE_LOADING', bool)
}

export const loadingReflash = ({ dispatch, state } ,bool) => {
	dispatch('TOGGLE_REFLASH_LOADING', bool)
}

//切换语言,货币
export const handleSetting = (lang, currency) => {
	return Vue.http.get(`${host}/user/handleSetting?lang=${lang}&currency=${currency}`).then(response => {
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//切换接口环境
export const handleApi = (env) => {
	return Vue.http.get(`${host}/handleApi?env=${env}`).then(response => {
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//自动化测试->生成订单
export const testAddOrder = ({ dispatch, state }, url) => {
	return Vue.http.get(host + '/test/create-order?url='+url).then(response => {
		dispatch('ADD_TEST_ORDER_LOG', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//自动化测试->获取订单列表
export const getTestOrderList = ({ dispatch, state }, pagesize = 10, current = 1, code, url) => {
	return Vue.http.get(`${host}/log/order-list?pagesize=${pagesize}&current=${current}&code=${code}&url=${url}`).then(response => {
		if(response.body.code != 10010) {
			dispatch('FETCH_TEST_ORDER_LIST', {
				response
			})
		}
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//定时任务->查询
export const fetchScheduleTask = ({ dispatch, state }, pagesize = 10, current = 1, url) => {
	return Vue.http.get(`${host}/schedule/fetch-task?pagesize=${pagesize}&current=${current}&url=${url}`).then(response => {
		if(response.body.code != 10010) {
			dispatch('FETCH_SCHEDULE_TASK', {
				response
			})
		}
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//定时任务->添加
export const addScheduleTask = ({ dispatch, state }, data) => {
	return Vue.http.post(`${host}/schedule/add-task`, data).then(response => {
		dispatch('ADD_SCHEDULE_TASK', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//定时任务->删除
export const delScheduleTask = ({ dispatch, state }, id, current, pagesize, query) => {
	return Vue.http.get(`${host}/schedule/remove-task?id=${id}&current=${current}&pagesize=${pagesize}&query=${query}`).then(response => {
		dispatch('DEL_SCHEDULE_TASK', {
			id,
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//定时任务->修改
export const updateScheduleTask = ({ dispatch, state }, id, data) => {
	return Vue.http.post(`${host}/schedule/update-task?id=${id}`, data).then(response => {
		dispatch('UPDATE_SCHEDULE_TASK', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//定时任务->获取日志
export const fetchScheduleLog= ({ dispatch, state }, id, pagesize = 10, current = 1, code) => {
	return Vue.http.get(`${host}/log/task-logs?pagesize=${pagesize}&current=${current}&code=${code}&id=${id}`).then(response => {
		if(response.body.code != 10010) {
			dispatch('FETCH_SCHEDULE_LOG_LIST', {
				response
			})
		}
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//添加站点
export const addSite = ({ dispatch, state }, data) => {
	return Vue.http.post(`${host}/system/site-add`, data).then(response => {
		dispatch('ADD_SYSTEM_SITE', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//删除站点
export const delSite = ({dispatch, state }, id, current, pagesize) => {
	return Vue.http.get(`${host}/system/site-del?pagesize=${pagesize}&current=${current}&id=${id}`).then(response => {
		dispatch('DEL_SYSTEM_SITE', {
			response,
			id
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//查询站点
export const fetchSite = ({dispatch, state}, pagesize = 10, current = 1) => {
	return Vue.http.get(`${host}/system/site-fetch?pagesize=${pagesize}&current=${current}`).then(response => {
		if(response.body.code != 10010) {
			dispatch('FETCH_SYSTEM_SITE', {
				response
			})
		}
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	}) 
}

//新增菜单
export const addMenu = ({ dispatch, state }, data) => {
	return Vue.http.post(`${host}/system/menu-add`, data).then(response => {
		dispatch('ADD_MENU', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//删除菜单
export const delMenu = ({dispatch, state }, id, current, pagesize) => {
	return Vue.http.get(`${host}/system/menu-del?pagesize=${pagesize}&current=${current}&id=${id}`).then(response => {
		dispatch('DEL_MENU', {
			response,
			id
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//修改菜单
export const updateMenu = ({ dispatch, state }, id, data) => {
	return Vue.http.post(`${host}/system/menu-update?id=${id}`, data).then(response => {
		dispatch('UPDATE_MENU', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//查询菜单
export const fetchMenu = ({dispatch, state}, current = 1, pagesize = 10) => {
	return Vue.http.get(`${host}/system/menu-fetch?current=${current}&pagesize=${pagesize}`).then(response => {
		if(response.body.code != 10010) {
			dispatch('FETCH_MENU', {
				response
			})
		}
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	}) 
}

//初始化菜单
export const initMenu = _ => {
	return Vue.http.get(`${host}/system/init-menu`).then(response => {
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	}) 
}

//选择站点
export const toggleSiteOpera = ({ dispatch, state }, site) => {
	return Vue.http.get(`${host}/user/toggleSite?site=${site}`).then(response => {
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//用户登录
export const userLogin = (body) => {
	console.log(body)
	return Vue.http.post(`${host}/user/login`, body).then(response => {
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//用户注销
export const userLoginOut = () => {
	return Vue.http.get(`${host}/user/logout`).then(response => {
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//添加用户
export const addUser = ({ dispatch, state }, body) => {
	return Vue.http.post(`${host}/user/register`, body).then(response => {
		dispatch('ADD_ADMIN', {
			response
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//删除用户
export const delUser = ({ dispatch, state }, id, current, pagesize) => {
	return Vue.http.get(`${host}/user/delete?id=${id}&current=${current}&pagesize=${pagesize}`).then(response => {
		dispatch('DEL_ADMIN', {
			response,
			id
		})
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	})
}

//查询用户
export const fetchUser = ({ dispatch, state }, pagesize = 10, current = 1 ) => {
	return Vue.http.get(`${host}/user/fetch?current=${current}&pagesize=${pagesize}`).then(response => {
		if(response.body.code != 10010) {
			dispatch('FETCH_ADMIN', {
				response
			})
		}
		return Promise.resolve(response.body)
	}).catch(error => {
		return Promise.reject(error)
	}) 
}
