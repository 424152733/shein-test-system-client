<style>
	
</style>

<template>
	<div class="markdown">
      <span>定时任务 / 记录查询</span>
	  <div style="float: right;margin-top:5px">
		<n3-select
		 :value.sync="schedule_id"
		 :search="true"
		 :options="schedules"
		 :on-change="handleSelect"
		 placeholder="请选择任务"
		 >
		 </n3-select>
	  </div>
      <hr>
    </div>
    <n3-data-table  
		key="key"
		:source="source" 
		:columns="columns" 
		:refresh="refresh"
		:pagination="pagination"
		:on-change="handlePagation"
		page
	>
	</n3-data-table>
	<n3-modal title="日志详情" :show.sync="showModal" effect="fade" width="800px" >
	  <div slot="body">
	    <pre>{{{modalContent}}}</pre>
	  </div>
	</n3-modal>
</template>

<script>
	import { n3DataTable, n3Modal, n3Select, n3Option, n3Icon } from 'N3-components'
	import { Message, iButton } from 'iview'
	import { syntaxHighlight, dateFormat } from '../../../utils/common.js'
	import { fetchScheduleLog } from '../../../vuex/actions'

	export default {
		vuex: {
			getters: {
				source: ({ schedule_log }) => {
					return schedule_log.list
				},
				schedules: ({ schedule_log }) => {
					var schedules = []
					schedule_log.schedules.forEach(item => {
						let obj = {}
						obj.label = item.name
						obj.value = item._id
						schedules.push(obj)
					})
					return schedules
				},
				pagination: ({ schedule_log }) => {
		  			return schedule_log.page
		  		}
			},

			actions: {
				fetchScheduleLog
			}
		},

		route: {
			data(transition) {
				const { id, pagesize, current, code } = transition.to.query
				this.fetchScheduleLog(id, pagesize, current, code).then(res => {
					if(res.code == 10010){
						window.location.href = '/#!/login'
					}
					if(res.code == 0) {
						if(id && this.schedules.length) {
							this.schedule_id = this.schedules.find(item => item.value == id).value
						}else{
							this.schedule_id = this.schedules.length?  this.schedules[0].value: ''
						}
					}
				})
			}
		},

		data() {
			return{
				modalContent: '',
				schedule_id: '',
				selected_id: '',
				showModal: false,
				columns: [{
				  title: '状态码',
				  dataIndex: 'code'
				}, {
				  title: '状态码说明',
				  dataIndex: 'remark',
				  render: ( text, record, index) => {
				  	let color = text !== '成功'? '#e96900': '#0099e5'
				  	return `<span style="color:${color}"}>${text}</span>`
				  }
				}, {
				  title: '创建时间',
				  dataIndex: 'createTime',
				  render: ( text, record, index ) => {
				  	const str = dateFormat(new Date(text), 'yyyy-MM-dd hh:mm:ss')
				  	return `<span>${str}</span>`
				  }
				}, {
				  title: '出错信息',
				  dataIndex: 'detail',
				  render: (text, record, index) => {
				  	const str = `<span class="item">
				              <a href="javascript:void(0);" @click="toggleModal(${index})"><n3-icon type="eye"></n3-icon> 查看</a>
				            </span>`
				    return str
				  }
				}],
			}
		},

		methods: {
			toggleModal(index) {
				this.modalContent = syntaxHighlight(JSON.parse(this.source[index].detail))
				this.showModal = true
			},

			handleSelect(value) {
				let str = window.location.href
				let url = str.indexOf('?') > -1? str.substr(0, str.indexOf('?')): str
				window.location.href = `${url}?id=${value}`
				this.selected_id = value
				const { pagesize, current } = this.pagination
				const code = ''
				this.fetchScheduleLog(value, pagesize, current, code)
			},

			handlePagation(pagination, query) {
				const { pagesize, current } = pagination
			    let str = window.location.href
			    let url = str.indexOf('?') > -1? str.substr(0, str.indexOf('?')): str
			    window.location.href = typeof query !== 'string'? `${url}?pagesize=${pagesize}&current=${current}`: `${url}?pagesize=${pagesize}&current=${current}&code=${query}&id=${this.selected_id}`
			},
		},

		components: {
			n3DataTable,
			n3Modal,
			n3Select,
			Message,
			iButton,
			n3Option,
			n3Icon
		}
	}
</script>