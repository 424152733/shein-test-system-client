<style>
	.shein-container{
		width:  100%;
	}
	.shein-left-container {
		width:  18%;
	    background: #333;
	    float: left;
	}
	.shein-right-container {
	   width:  82%;
	   padding:  20px 30px 0 40px;
	   background: #fff;
	   height: 90vh;
	   position: relative;
	   float: right;
    }
    .loading-shadow{
    	width:  100%;
    	position: absolute;
    	height:  100%;
    	left: 0;
    	top: 0;
    	background: rgba(255, 255, 255, 0.7);
    	z-index: 777;
    }
    .view{
      position: absolute;
      width: 100%;
      transition: opacity .2s ease;
      box-sizing: border-box;
    }
    .view .v-enter{
       opacity:0
     }
    .view .v-leave{
       opacity:0
     }
    
</style>

<template>
	<div class="shein-container">
		<div class="shein-left-container">
			<n3-nav theme="dark" type="vertical" >
			  <n3-nav-item v-for="item in menu_list" track-by="$index">
				 <n3-sub-nav :show="$index == 0" v-if="item.route != 'system'">
				 	<a slot="title"><n3-icon :type="item.icon"></n3-icon> {{item.name}}</a>
				 	<n3-nav-item v-for="item1 in item.child" track-by="$index" :active="item.sort == 1 && item1.sort == 1? active.indexOf(item1.url) > -1|| active.indexOf('?') == 1 || active == '/': active.indexOf(item1.url) > -1">
			        <a v-link="{ path: item1.url }"><n3-icon :type="item1.icon"></n3-icon> {{item1.name}}</a>
			      </n3-nav-item>
				 </n3-sub-nav>
			  </n3-nav-item>

			  <n3-nav-item>
				<n3-sub-nav>
			      <a slot="title"><n3-icon type="cog"></n3-icon> 系统配置</a>
			      <n3-nav-item :active="active.indexOf('/system/site') > -1">
			        <a v-link="{ path: '/all/system/site' }"><n3-icon type="tasks"></n3-icon> 站点配置</a>
			      </n3-nav-item>
			       <n3-nav-item :active="active.indexOf('/system/menu') > -1">
			        <a v-link="{ path: '/all/system/menu' }"><n3-icon type="th"></n3-icon> 菜单配置</a>
			      </n3-nav-item>
			      <n3-nav-item :active="active.indexOf('/system/admin') > -1">
			        <a v-link="{ path: '/all/system/admin' }"><n3-icon type="smile-o"></n3-icon> 管理员</a>
			      </n3-nav-item>
			    </n3-sub-nav>
			  </n3-nav-item>
			</n3-nav>
		</div>
		<div class="shein-right-container">
			<router-view></router-view>
			<div v-if="loading" class="loading-shadow">
				<n3-loading center size='lg' type="primary"></n3-loading>
			</div>
		</div>
	</div>
</template>

<script>
	import N3Components from 'N3-components/dist/blue.min.js'
	import { n3Nav, n3NavItem, n3SubNav, n3Icon, n3Loading } from 'N3-components'
	import { fetchMenu, initMenu, loadingReflash } from '../../vuex/actions'
	export default {
		vuex: {
			getters: {
		  		loading: ({ setting }) => {
		  			return setting.loading
		  		}
		  	},
		  	actions: {
		  		fetchMenu,
		  		loadingReflash
		  	}
		},

		route: {
			data(transition){
				this.active = transition.to.path
			}
		},

		ready() {
			this.fetchMenusMethod()
		},

		data() {
			return {
				active: '/shein/test/create_order',
				menu_list: []
			}
		},

		components: {
			n3Nav,
			n3NavItem,
			n3SubNav,
			n3Icon,
			n3Loading,
		},
		methods: {
			changeState() {
				this.active = !this.active
			},
			fetchMenusMethod() {
				this.loadingReflash(true)
				initMenu().then(res => {
					this.loadingReflash(false)
					if(res.code == 10010) {
						return window.location.href="/#!/login"
					}
					let array1 = res.list.filter(item => item.type == 1).sort((a, b) => a.sort - b.sort)
					let array2 = res.list.filter(item => item.type == 2)
					array1.forEach(item => {
						item.child = []
						array2.forEach(item1 => {
							if(item1.father == item._id){
								item.child.push(item1)
							}
							item.child.sort((a, b) => a.sort - b.sort)
						})
					})
					this.menu_list = array1
				})
			}
		}
	}
</script>