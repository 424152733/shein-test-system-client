<style>
	/* .echarts{
		min-height: 500px
	} */
</style>

<template>
	<div class="markdown">
      <span>自动化测试 / 创建订单</span>
	  <div style="float: right">
	  	<i-button type="primary"  @click="handleTestOrder">开始测试</i-button>  
	  </div>
      <hr>
    </div>
    <n3-data-table  
		key="key"
		:source="list" 
		:columns="columns" 
		:refresh="refresh"
		:on-change="handlePagation"
		:pagination="pagination"
		page
	>
	</n3-data-table>
	<n3-modal title="日志详情" :show.sync="showModal" effect="fade" width="800px">
	  <div slot="body">
	    <pre>{{{modalContent}}}</pre>
	  </div>
	</n3-modal>
	<div class="echarts"></div>
</template>

<script>
	import { n3DataTable, n3Modal, n3Button, n3Alert, n3Icon } from 'N3-components'
	import { Message, iButton } from 'iview'
	import echarts  from 'echarts'
	import { syntaxHighlight, dateFormat } from '../../../utils/common.js'
	import { testAddOrder, getTestOrderList } from '../../../vuex/actions.js'
	export default {
		vuex: {
		  	getters: {
		  		list: ({ tests }) => {
		  			return tests.list
		  		},

		  		pagination: ({ tests }) => {
		  			return tests.page
		  		}
		  	},
		  	actions: {
		  		testAddOrder,
		  		getTestOrderList
		  	}
	    },
		route: {
			data(transition) {
				const str = transition.to.path
				const { pagesize, current, code } = transition.to.query
				this.url = str.indexOf('?') > -1? str.substr(0, str.indexOf('?')): str
				this.getTestOrderList(pagesize, current, code, this.url).then(res => {
					if(res.code == 10010){
						window.location.href = '/#!/login'
					}
				})
			}
		},

		data() {
			return {
			  modalContent: '',
			  showModal: false,
			  url:'',
			  columns: [{
			    title: '状态码',
			    dataIndex: 'code',
			    width:'100px'
			  }, {
			    title: '状态码说明',
			    dataIndex: 'remark',
			    render: ( text, record, index) => {
			    	let color = text !== '成功'? '#e96900': '#0099e5'
			    	return `<span style="color:${color}"}>${text}</span>`
			    }
			  }, {
			    title: '时间',
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

		// ready() {
		// 	this.chart = echarts.init(document.querySelector('.echarts'))
		// 	this.chart.setOption({})
		// },

		methods: {
			toggleModal(index) {
				this.modalContent = syntaxHighlight(JSON.parse(this.list[index].detail))
				this.showModal = true
			},

			handleTestOrder() {
				this.testAddOrder(this.url).then(res => {
					if(res.code == 0) {
						Message.success('测试通过！')
					}else{
						Message.warning('测试失败！')
					}

				})
			},

			handlePagation(pagination, query) {
				const { pagesize, current } = pagination
			    window.location.href = typeof query !== 'string'? `/#!${this.url}?pagesize=${pagesize}&current=${current}`: `/#!${this.url}?pagesize=${pagesize}&current=${current}&code=${query}`
			}
		},

		components: {
			n3DataTable,
			n3Modal,
			n3Button,
			n3Alert,
			Message,
			n3Icon,
			iButton
		}
	}
</script>