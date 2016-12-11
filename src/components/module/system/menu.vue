<style>
	
</style>

<template>
	<div class="markdown">
      <span>系统配置 / 菜单配置</span>
	  <div style="float: right">
	  	<i-button type="primary" @click="getTableItem('add')">添加菜单</i-button> 	 
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
    	width="800px"
    	:on-confirm="handleAdd"
    >
    	<div slot="body">
			<n3-form v-ref:form>
				<n3-form-item
			        need
			        label="菜单名称"
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
			        label="菜单类型"
			        :label-col="4"
			        >
				   <n3-select
				      name="type"
				      :value.sync = "model.type"
				      :rules="[{type:'required'}]"
				      :width="'100px'"
				    >
					<n3-option value="1">一级菜单</n3-option>
					<n3-option value="2">二级菜单</n3-option>
				  </n3-select>
				</n3-form-item>
				<n3-form-item
					need
					label="菜单排序"
					:label-col="4"

				>
					<n3-input-number 
						name="sort"
						:value.sync="model.sort"
						:rules="[{type:'required'}]"
				        :width="'200px'"
					>
					</n3-input-number>
				</n3-form-item>
				<div v-if="model.type == 2">
					<n3-form-item
				        need
				        label="父级菜单"
				        :label-col="4"
				        >
					    <n3-select
	   				      name="father"
	   				      :value.sync = "model.father"
	   				      :rules="[{type:'required'}]"
	   				      :width="'100px'"
	   				    >
		   					<n3-option v-for="item in father" :value="item._id">{{item.name}}</n3-option>
	   				    </n3-select>
					  </n3-input>
					</n3-form-item>
				</div>
				<n3-form-item
			        need
			        label="icon"
			        :label-col="4"
			        >
				   <n3-input
				      name="icon"
				      :value.sync = "model.icon"
				      :rules="[{type:'required'}]"
				      :width="'200px'"
				    >
				  </n3-input>
				</n3-form-item>
				<n3-form-item
			        need
			        label="路由标识"
			        :label-col="4"
			        >
				   <n3-input
				      name="route"
				      :value.sync = "model.route"
				      :rules="[{type:'required'}]"
				      :width="'200px'"
				    >
				  </n3-input>
				</n3-form-item>
				<n3-form-item
			        need
			        label="路由地址"
			        :label-col="4"
			        >
				   <n3-input
				      name="url"
				      :value.sync = "model.url"
				      :rules="[{type:'required'}]"
				      :width="'200px'"
				    >
				  </n3-input>
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
	import { iButton, Message } from 'iview'
	import { n3DataTable, n3Modal, n3Select, n3Option, n3Input, n3Form, n3FormItem, n3Button, n3InputNumber } from 'N3-components'
	import { dateFormat } from '../../../utils/common'
	import { addMenu, delMenu, fetchMenu, updateMenu } from '../../../vuex/actions'
	export default {
		vuex: {
			getters: {
				source: ({ menu }) => {
					return menu.list
				},
				pagination: ({ menu }) => {
		  			return menu.page
		  		},
		  		loading: ({ setting }) => {
		  			return setting.loading
		  		}
			},
			actions: {
				addMenu,
				delMenu,
				fetchMenu,
				updateMenu
			}
		},

		route: {
			data(transition) {
				this.fetchMenu().then(res => {
					if(res.code == 10010){
						window.location.href = '/#!/login'
					}
				})
			}
		},

		data() {
			return {
				model: {
					name: '',
					type: '',
					father: '',
					icon: '',
					route: '',
					url:'',
					sort: ''
				},
				showModal: false,
				updateTask: 'add',
				columns: [{
			      title: '菜单名称',
			      dataIndex: 'name',
			    }, {
			      title: '菜单类型',
			      dataIndex: 'type',
			      render: (text, record, index) => {
			      	const str = text == 1? '一级菜单': '二级菜单'
			      	return str
			      }
			    }, {
				  title: '父级菜单',
				  dataIndex: 'father',
				  render: ( text, record, index ) => {
				  	const obj = this.source.find(item => item._id == text)
				  	const name = obj? obj.name: ''
				  	return `<span>${name}</span>`
				  }
				}, {
				  title: '创建时间',
				  dataIndex: 'createTime',
				  render: ( text, record, index ) => {
				  	const str = dateFormat(new Date(text), 'yyyy-MM-dd hh:mm:ss')
				  	return `<span>${str}</span>`
				  }
				}, {
			      title: '操作',
			      render: ( text, record, index ) => {
			      	return `<a @click="getTableItem('update', ${index})">修改</a> <a @click="handleDelete(${index})">删除</a>`
			      }
			    }]			
			}
		},

		computed: {
			father() {
				return this.source.filter(item => item.type == 1)
			}
		},

		methods: {
			getTableItem(type, index) {
				this.model = type == 'add'? {}: this.source[index]
				this.$refs.form.validate = type == 'add'? false: true
				this.showModal = true
				this.updateTask = type
			},

			handleDelete(index) {
				const id = this.source.find((item, index1) => index1 == index)._id
				const { current, pagesize } = this.pagination
				this.delMenu(id, current, pagesize).then(res => {
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

			handleUpdate() {
				this.$refs.form.validateFields(result => {
					if(result.isvalid) {
						const data = {...this.model}
						if(this.updateTask == 'update') {
							this.updateMenu(data._id, data).then(res => {
								if(res.code === 0) {
									Message.success('修改成功！');
									this.showModal = false
								}else{
									Message.error('修改失败！')
								}
							})
						}else if(this.updateTask == 'add'){
							this.addMenu(this.model).then(res => {
								if(res.code == 0) {
									Message.success('添加成功！')
									this.showModal = false
								}else{
									Message.error('添加失败！')
								}
							})
						}else{
							this.showModal = false
						}
					}
				})
			}
		},

		components: {
			iButton,
			n3Button,
			n3DataTable, 
			n3Modal, 
			n3Input, 
			n3Select,
			n3Option,
			n3Form, 
			n3FormItem,
			n3InputNumber
		}
	}
</script>