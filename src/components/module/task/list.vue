<style>
	
</style>

<template>
	<div class="markdown">
      <span>定时任务 / 列表</span>
	  <div style="float: right">
	  	<i-button type="primary" :loading="loading" @click="modalVisibile('add')">添加任务</i-button> 	 
	  </div>
      <hr>
    </div>
    <n3-data-table  
		key="key"
		:source="source" 
		:columns="columns" 
		:refresh="refresh"
		:on-change="handlePagation"
		:pagination="pagination"
		page
	>
	</n3-data-table>
    <n3-modal title="任务配置" 
    	:show.sync="showModal" 
    	effect="fade" 
    	width="800px"
    	
    >
	  <div slot="body">
	    <n3-form v-ref:form>
	    	<n3-form-item
		        need
		        label="接口名称："
		        :label-col="4"
		        >
			   <n3-input
			      name="name"
			      :value.sync = "model.name"
			      :rules="[{type:'required'}]"
			      :width="'300px'"
			    >
			  </n3-input>
			</n3-form-item>

			<n3-form-item
		        need
		        label="接口地址："
		        :label-col="4"
		        >
			   <n3-input
			      name="url"
			      :value.sync = "model.url"
			      :rules="[{type:'required'}]"
			      :width="'300px'"
			    >
			  </n3-input>
			</n3-form-item>

			<n3-form-item
		        need
		        label="定时："
		        :label-col="4"
		        >
			   <n3-input
			      name="time"
			      :value.sync = "model.time"
			      :rules="[{type:'required'}]"
			      :width="'300px'"
			    >
			  </n3-input>
			</n3-form-item>

			<n3-form-item
		        need
		        label="请求方法："
		        :label-col="4">
			    <n3-select
		          name="method"
			      :value.sync = "model.method"
		          :options='profession'
		          :rules="[{type:'required'}]"
		          >
			    </n3-select>
			</n3-form-item>

			<n3-form-item
		        need
		        label="语言："
		        :label-col="4">
			    <n3-select
		          name="lang"
			      :value.sync = "model.lang"
		          :options='lang'
		          :rules="[{type:'required'}]"
		          >
			    </n3-select>
			</n3-form-item>

			<n3-form-item
		        need
		        label="货币："
		        :label-col="4">
			    <n3-select
		          name="currency"
			      :value.sync = "model.currency"
		          :options='currency'
		          :rules="[{type:'required'}]"
		          >
			    </n3-select>
			</n3-form-item>

			<n3-form-item
			        need
			        label="需要登录："
			        :label-col="4">
			    <n3-radio-group
			        name="login"
			        :value.sync = "model.login"
			        :rules="[{type:'required'}]">
			        <n3-radio value="1">是</n3-radio>
			        <n3-radio value="0">否</n3-radio>
			    </n3-radio-group>
			</n3-form-item>

			<n3-form-item
			       need
			       label="开启状态："
			       :label-col="4">
			     <n3-radio-group
			        name="status"
			        :value.sync = "model.status"
			        :rules="[{type:'required'}]">
			        <n3-radio value="1">是</n3-radio>
			        <n3-radio value="0">否</n3-radio>
			    </n3-radio-group>
			</n3-form-item>
			
			<n3-form-item
		        need
		        label="失败规则："
		        :label-col="4"
		        >
			   <n3-input
			      name="rule"
			      :value.sync = "model.rule"
			      :width="'300px'"
			    >
			  </n3-input>
			</n3-form-item>

			<n3-form-item
			       need
			       label="参数配置："
			       :label-col="4">
			     <n3-textarea
			         name="option"
			         :value.sync = "model.option"
					 :min-height="'100px'"
					 :width="'300px'"
			         >
			     </n3-textarea>
			</n3-form-item>


	    </n3-form>
	  </div>
	  <div slot="footer" class="shein-modal-footer">
	    <n3-button @click="showModal = false">取消</n3-button>
		<n3-button type="primary" @click="handleUpdate" :loading="loading" :disabled="loading">确定</n3-button>
	  </div>
	</n3-modal>
</template>

<script>
	import { n3DataTable, n3Modal, n3Button, n3Alert, n3Input, n3Form, n3FormItem, n3Select, n3RadioGroup, n3Radio, n3Switch, n3Textarea, n3Toast, n3Icon } from 'N3-components'
	import { Message, iButton } from 'iview'
	import echarts  from 'echarts'
	import { syntaxHighlight, dateFormat } from '../../../utils/common.js'
	import { fetchScheduleTask, addScheduleTask, delScheduleTask, updateScheduleTask } from '../../../vuex/actions'
	export default {
		vuex: {
			getters: {
				source: ({ schedule }) => {
					return schedule.list
				},
				pagination: ({ schedule }) => {
		  			return schedule.page
		  		},
		  		loading: ({ setting }) => {
		  			return setting.loading
		  		}
			},
			actions: {
				fetchScheduleTask,
				addScheduleTask,
				delScheduleTask,
				updateScheduleTask
			}
		},

		route: {
			data(transition) {
				const { pagesize, current, url } = transition.to.query
				this.fetchScheduleTask(pagesize, current, url).then(res => {
					if(res.code == 10010){
						window.location.href = '/#!/login'
					}
				})
			}
		},

		data() {
			return{
				showModal: false,
				validate: false,
				updateTask: '',
				route_url: localStorage.getItem('site')||'shein_m',
				query: '',
				profession: [{
			      value: 'GET',
			      label: 'GET'
			    }, {
			      value: 'POST',
			      label: 'POST'
			    }],
			    lang: [{
			      value: 'en',
			      label: 'en'
			    }, {
			      value: 'es',
			      label: 'es'
			    }],
			    currency: [{
			      value: 'USD',
			      label: 'USD'
			    }, {
			      value: 'EURO',
			      label: 'EURO'
			    }],
			    model: {
			      _id: '',
		          name: '',
		          url: '',
		          method: '',
		          lang: '',
		          time: '',
		          currency: '',
		          rule: '',
		          login: '',
		          status: '',
		          option: ''
		        },
			    columns: [{
			      title: '接口名称',
			      dataIndex: 'name',
			    }, {
			      title: '接口地址',
			      dataIndex: 'url',
			    }, {
			      title: '任务状态',
			      dataIndex: 'status',
			      render: ( text, record, index) => {
			      	let color = text == 1? "#0099e5": "#e96900"
			      	return `<a style="color:${color}" @click="handleSwitch(${index})">${text == 1? '开启': '关闭'}</a>`
			      	// return `<n3-switch :value=${!!Number(text)}></n3-switch>`
			      }
			    }, {
			      title: '操作',
			      dataIndex: 'status',
			      render: ( text, record, index ) => {
			      	const route_url = this.route_url
			      	const _id = this.source.find((item, i) => { return i == index})._id
			      	return `<a @click="getTableItem(${index}, 'update')">修改</a> <a  @click="delTask(${index})">删除</a>
			      			<a style="margin-left: 10px" v-link="{ path: '/${route_url}/task/log', query: {id: '${_id}'}}" ><n3-icon type="eye"></n3-icon>查看记录</a>`
			      }
			    }]				   
			}
		},
		methods: {
			modalVisibile() {
				this.showModal = true;
				this.$refs.form.validate = false
				this.updateTask = 'add';
				this.model={}
			},

			handleUpdate() {
				this.$refs.form.validateFields(result => {
					if(result.isvalid) {
						const data = {...this.model}
						if(this.updateTask == 'update') {
							this.updateScheduleTask(data._id, data).then(res => {
								if(res.code === 0 || res.code === 100001) {
									Message.success('修改成功！');
									this.showModal = false
								}
							})
						}else if(this.updateTask == 'add'){
							this.addScheduleTask(data).then(res => {
								if(res.code === 0 || res.code === 100001) {
									Message.success('添加成功！');
									this.showModal = false
								}
							})
						}else{
							this.showModal = false
						}
					}
				})
			},

			delTask(index) {
				const id = this.source.find((item, index1) => index1 == index)._id
				const { current, pagesize } = this.pagination
				this.delScheduleTask(id, current, pagesize, this.query ).then(res => {
					if(res.code === 0) {
						Message.success('删除成功！')
					}
				})
			},

			handlePagation(pagination, query) {
				const { pagesize, current } = pagination
				this.query = query
			    let str = window.location.href
			    let url = str.indexOf('?') > -1? str.substr(0, str.indexOf('?')): str
			    if( query !== '' ) {
			    	window.location.href = typeof query !== 'string'? `${url}?pagesize=${pagesize}&current=${current}`: `${url}?pagesize=${pagesize}&current=${current}&url=${query}`
			    }
			},

			handleSwitch(index) {
				const id = this.source[index]._id
				this.source[index].status = this.source[index].status == 1? "0": "1"
				this.updateScheduleTask(id, this.source[index]).then(res => {
					if(res.code === 0 || res.code === 100001) {
						Message.success('修改成功！')
					}
				})
			},

			getTableItem(index, type) {
				this.model = this.source[index]
				this.showModal = true
				this.updateTask = type
			}

		},
		components: {
			n3DataTable,
			n3Modal,
			n3Button,
			n3Alert,
			n3Input,
			n3Form,
			n3FormItem,
			n3Select,
			n3RadioGroup,
			n3Radio,
			n3Textarea,
			n3Toast,
			n3Select,
			n3Switch,
			n3Icon,
			Message,
			iButton
		}
	}
</script>