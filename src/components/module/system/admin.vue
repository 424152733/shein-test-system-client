<style>
	
</style>

<template>
	<div class="markdown">
      <span>系统配置 / 管理员</span>
	  <div style="float: right">
	  	<i-button type="primary" @click="toggleModal">添加管理员</i-button> 	 
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

	<n3-modal title="添加菜单" 
    	:show.sync="showModal" 
    	effect="fade" 
    	width="600px"
    	:on-confirm="handleAdd">
		<div slot="body">
			<n3-form v-ref:form>
				<n3-form-item
			        need
			        label="用户名："
			        :label-col="4"
			        >
				   <n3-input
				      name="name"
				      :value.sync = "model.name"
				      :rules="[{type:'required'}]"
				      :width="'200px'"
				    >
				  </n3-input>
				</n3-form-item>
				<n3-form-item
			        need
			        label="密码："
			        :label-col="4"
			        >
				   <n3-input
				   	  type="password"
				      name="password"
				      :value.sync = "model.password"
				      :rules="[{type:'required'}]"
				      :width="'200px'"
				    >
				  </n3-input>
				</n3-form-item>
			</n3-form>
		</div>
    </n3-modal>

</template>

<script>
	import { iButton, Message } from 'iview'
	import { n3DataTable, n3Modal, n3Input, n3Form, n3FormItem } from 'N3-components'
	import { dateFormat } from '../../../utils/common'
	import { addUser, delUser, fetchUser } from '../../../vuex/actions'
	export default {
		vuex: {
			getters: {
				source: ({ admin }) => {
					return admin.list
				},
				pagination: ({ admin }) => {
		  			return admin.page
		  		},
		  		loading: ({ setting }) => {
		  			return setting.loading
		  		}
			},
			actions: {
				addUser,
				delUser,
				fetchUser
			}
		},

		route: {
			data(transition) {
				const { pagesize, current } = transition.to.query
				this.fetchUser(pagesize, current).then(res => {
					if(res.code == 10010){
						window.location.href = '/#!/login'
					}
				})
			}
		},

		data() {
			return {
				showModal: false,
				model: {
					name: '',
					password: ''
				},
				columns: [{
			      title: '账号',
			      dataIndex: 'name',
			    }, {
				  title: '创建时间',
				  dataIndex: 'createTime',
				  render: ( text, record, index ) => {
				  	const str = dateFormat(new Date(text), 'yyyy-MM-dd hh:mm:ss')
				  	return `<span>${str}</span>`
				  }
				}, {
			      title: '操作',
			      dataIndex: 'status',
			      render: ( text, record, index ) => {
			      	return ` <a @click="handleDelete(${index})">删除</a>`
			      }
			    }]			
			}
		},

		computed: {

		},

		methods: {
			toggleModal() {
				this.$refs.form.validate = false
				this.model = {}
				this.showModal = true
			},

			handleAdd() {
				this.addUser(this.model).then(res => {
					this.showModal = false
					if(res.code == 0) {
						Message.success('添加成功')
					}else{
						Message.error('添加失败')
					}
				})
			},

			handleDelete(index){
				const id = this.source.find((item, index1) => index1 == index)._id
				const { current, pagesize } = this.pagination
				this.delUser(id, current, pagesize).then(res => {
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
		},

		components: {
			iButton,
			n3DataTable,
			n3Modal,
			n3Input, 
			n3Form, 
			n3FormItem
		}
	}
</script>