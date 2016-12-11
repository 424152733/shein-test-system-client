<style>
	.login-container{
		width: 100vw;
		height:100vh;
		background: url('../../assets/bg.jpg');
		background-size: 100% 100%;
		padding-top:150px;
		position: absolute;
		top:  0;
	}

	.login-container .logo{
		width: 200px;
		height:  100px;
		background: url('http://m.shein.com/es/src/images/shein.png') no-repeat center;
		margin:  auto;
	}
	
	.login-container .login{
		padding:40px 30px;
		width:350px;
		height:200px;
		background: #ffffff;
		margin: auto;
		border-radius: 10px;
	}
</style>

<template>
	<div class="login-container">
		<div class="logo"></div>
		<div class="login">
			<n3-form v-ref:form>
				<n3-form-item
			        need
			        label="账号："
			        :label-col="3"
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
			        :label-col="3"
			        >
				   <n3-input
				      name="password"
				      type="password"
				      :value.sync = "model.password"
				      :rules="[{type:'required'}]"
				      :width="'200px'"
				    >
				  </n3-input>
				</n3-form-item>
				<div style="float: right;margin-right: 10px">
					<n3-button @click="handleSubmit" type="primary" :loading="loading" :disabled="loading">登录</n3-button>
				</div>
			</n3-form>
		</div>
	</div>
</template>

<script>
	import { n3Input, n3Form, n3FormItem, n3Button } from 'N3-components'
	import { Message } from 'iview'
	import { userLogin } from '../../vuex/actions'
	export default {
		vuex: {
			getters: {
				loading: ({setting}) => setting.loading
			}
		},

		data() {
			return {
				model: {
					name: '',
					password: ''
				}
			}
		},

		methods: {
			handleSubmit() {
				this.$refs.form.validateFields(result => {
					if(result.isvalid) {
						userLogin(this.model).then(res => {
							if(res.code == 0) {
								Message.success('登录成功！')
								setTimeout(_ => {
									window.location.href = "/#!/"
								}, 400)
							}else{
								Message.error('用户名或密码错误！')
							}
						})
					}
				})
			}
		},

		components: {
			n3Input,
			n3Form,
			n3FormItem,
			n3Button
		}
	}
</script>