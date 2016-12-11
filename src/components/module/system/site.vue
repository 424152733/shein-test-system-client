<style>
	
</style>

<template>
	<div class="markdown">
      <span>系统配置 / 站点配置</span>
	  <div style="float: right;margin-top:5px">
	  	<n3-select 
		  	placeholder="配置当前站点" 
		  	style="width:120px" 
		  	:options="sites"
		  	:on-change="handleToggleSite"
		  	>
	  	</n3-select>
	  	<i-button type="primary" @click="toggleModal()">添加站点 </i-button> 	 
	  </div>
      <hr>
    </div>

    <n3-data-table  
		key="key"
		:source="source" 
		:columns="columns" 
		:refresh="refresh"
		:pagination="pagination"
		page
	>
	</n3-data-table>
	
	<n3-modal title="添加站点" 
    	:show.sync="showModal" 
    	effect="fade" 
    	width="800px"
    	:on-confirm="handleAdd"
    >
    	<div slot="body">
			<n3-form v-ref:form>
				<n3-form-item
			        need
			        label="站点名称："
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
			        label="路由："
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
			</n3-form>
		</div>
    </n3-modal>

</template>

<script>
	import { iButton, Message } from 'iview'
	import { n3DataTable, n3Modal, n3Input, n3Form, n3FormItem, n3Select, n3Option } from 'N3-components'
	import { dateFormat } from '../../../utils/common'
	import { addSite, delSite, fetchSite, toggleSiteOpera } from '../../../vuex/actions'
	export default {
		vuex: {
			getters: {
				source: ({ site }) => {
					return site.list
				},
				sites: ({ site }) => {
					var sites = []
					site.list.forEach(item => {
						let obj = {}
						obj.label = item.name
						obj.value = item.url
						sites.push(obj)
					})
					return sites
				},
				pagination: ({ site }) => {
		  			return site.page
		  		}
			},
			actions: {
				addSite,
				delSite,
				fetchSite,
				toggleSiteOpera
			}
		},

		route: {
			data(transition) {
				this.fetchSite().then(res => {
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
					url: ''
				},
				columns: [{
			      title: '站点名称',
			      dataIndex: 'name',
			    }, {
			      title: '站点路由',
			      dataIndex: 'url',
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
			      	return `<a @click="handleDelete(${index})">删除</a>`
			      }
			    }]			
			}
		},

		computed: {

		},

		methods: {
			toggleModal() {
				this.showModal = true
			},

			handleAdd() {
				this.$refs.form.validateFields(result => {
					if(result.isvalid) {
						this.addSite(this.model).then(res => {
							this.showModal = false
							if(res.code == 0) {
								Message.success('添加成功！')
							}else{
								Message.error(res.msg)
							}
						})
					}
				})
			},

			handleDelete(index) {
				const id = this.source.find((item, index1) => index1 == index)._id
				const { current, pagesize } = this.pagination
				this.delSite(id, current, pagesize).then(res => {
					if(res.code === 0) {
						Message.success('删除成功！')
					}
				})
			},

			handleToggleSite(value) {
				this.toggleSiteOpera(value).then(res => {
					if(res.code === 0) {
						Message.success('切换站点成功！')
						localStorage.setItem('site', value)
						// const route = this.$route.path.replace(/\/\w+/, value)
						// window.location.href = '#!/'+route
						window.location.reload()
					}
				})
			}
		},

		components: {
			iButton,
			n3DataTable,
			n3Modal,
			n3Input, 
			n3Form, 
			n3FormItem,
			n3Select,
			n3Option
		}
	}
</script>