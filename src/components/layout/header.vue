<style>
	#shein-header {
		width:  100%;
		font-size:  16px;
		background: #333;
		height:  115px;
	}
	#shein-header .logo {
		float: left;
	    height: 50px;
	    line-height: 50px;
	    margin: 17px 0px 17px 18px;
	    font-size: 24px;
	    font-family: "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", sans-serif;
	    font-weight: 600;
	    letter-spacing: 2px;
	    color: #57c5f7;
	}
	#shein-header .setting {
		height: 100px;
		margin: 0;
		padding: 0;
		font-size: 0.775em;
		float: right;
		margin-right: 5px;
	}
	#shein-header .setting .header-img {
		width: 50px;
		height:  50px;
		border-radius: 25px;
		border:  1px solid #fff;
		margin: 15px 0px 8px 60px;
		background:  url('../../assets/admin.jpg') center no-repeat;
		background-size: 50px 50px;
	}
</style>

<template>
	<header id="shein-header" class="clearfix">
		<div class="logo">
			<span>SHEIN预警监控系统</span>
		</div>
		<div class="setting">
			<div class="header-img"></div>
			<div style="color: #33adea;margin-left: 27px;font-weight:bold" href="javascript:void(0)">当前站点：{{site}}</div>
			<a style="color: white;margin-left: 10px" href="javascript:void(0)" @click="showModal2 = true"><n3-icon type="pencil-square-o"></n3-icon> 环境</a>
			<a style="color: white;margin-left: 10px" href="javascript:void(0)" @click="showModal1 = true"><n3-icon type="pencil-square-o"></n3-icon> 语言</a>
			<a style="color: white;margin-left: 10px" href="javascript:void(0)" @click="handleLogout"><n3-icon type="cog"></n3-icon> 注销</a>
		</div>
	</header>
	<n3-modal 
		title="修改配置" 
		:show.sync="showModal1" 
		effect="fade" 
		width="400px" 
		:on-confirm="changeSetting"
	>
	  <div slot="body">
	    <div style="padding-bottom: 10px">
    	    <label>语言：</label>
    	    <n3-radio-group type="primary" :on-change="changeLang">
    		  <n3-radio-btn value="en" checked>en</n3-radio-btn>
    		  <n3-radio-btn value="es">es</n3-radio-btn>
    		  <n3-radio-btn value="ar">ar</n3-radio-btn>
    		  <n3-radio-btn value="us">us</n3-radio-btn>
			  <n3-radio-btn value="de">de</n3-radio-btn>
			  <n3-radio-btn value="fr">fr</n3-radio-btn>
    		</n3-radio-group>
	    </div>
		<div style="padding-top: 10px">
			<label>货币：</label>
		    <n3-radio-group type="primary" :on-change="changeCurrency">
			  <n3-radio-btn value="USD" checked>USD</n3-radio-btn>
			  <n3-radio-btn value="EURO">EURO</n3-radio-btn>
			</n3-radio-group>
		</div>
	  </div>
	</n3-modal>

	<n3-modal 
		title="接口环境：" 
		:show.sync="showModal2" 
		effect="fade" 
		width="400px" 
		:on-confirm="changeRestFull"
	>
	  <div slot="body">
	    <div style="padding-bottom: 10px">
    	    <label>环境</label>
    	    <n3-radio-group type="primary" :on-change="changeApi">
    		  <n3-radio-btn value="production">生产环境</n3-radio-btn>
    		  <n3-radio-btn value="dev" checked>测试环境</n3-radio-btn>
    		</n3-radio-group>
	    </div>
	  </div>
	</n3-modal>
	
</template>

<script>
	import { n3Button, n3Icon, n3Modal, n3RadioGroup, n3Radio, n3RadioBtn, n3Select, n3Option } from 'N3-components'
	import { Message } from 'iview'
	import { handleSetting, handleApi, userLoginOut } from '../../vuex/actions'
	export default {
		data() {
			return{
				lang: 'en',
				currency: 'USD',
				api: 'dev',
				showModal1: false,
				showModal2: false,
				ajaxStauts: false,
				testResult: 'danger',
				site: localStorage.getItem('site')||'shein_m'
			}
		},
		methods:{
			changeSetting() {
				handleSetting(this.lang, this.currency).then(res => {
					this.showModal1 = false
					if(res.code == 0) {
						Message.success('配置成功！')
					}else{
						Message.error('配置失败！')
					}
				})
			},

			changeRestFull() {
				handleApi(this.api).then(res => {
					this.showModal2 = false
					if(res.code == 0) {
						Message.success('配置成功！')
					}else{
						Message.error('配置失败！')
					}
				})
			},

			changeLang(value) {
				this.lang = value
			},

			changeCurrency(value) {
				this.currency = value
			},

			changeApi(value) {
				this.api = value
			},

			handleLogout() {
				userLoginOut().then(res => {
					if(res.code == 0) {
						this.site = 'shein_m'
						Message.success('注销成功！')
						localStorage.setItem('site', '')
						window.location.href = '/#!/login'
					}else{
						Message.error('注销失败！')
					}
				})
			}
		},
		components: {
			n3Button,
			n3Icon,
			n3Modal,
			n3RadioGroup,
			n3Radio,
			n3RadioBtn,
			n3Select,
			n3Option
		}
	}
</script>