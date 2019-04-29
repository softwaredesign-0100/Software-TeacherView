<template>
	<div>
		<div class="header_container">
			<el-row>
				<el-col :span=3>
					<img src='../assets/Logo.png' class="avator">
				</el-col>
				<el-col :span=4 :offset=7>
					<el-menu :default-active="activeIndex" mode="horizontal" class="el-menu-demo" style="opacity: 0.5;"
							 @select="handleSelect">
						<el-menu-item index="1">首页</el-menu-item>
						<el-menu-item index="2">介绍</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span=1 :offset=7 style="margin-top : 15px">
					<el-button type="primary" round size="small" @click="SignInVisible = true">登录</el-button>
				</el-col>
				<el-col :span=1 :offset=0 style="margin-top : 15px ;margin-left: 12px">
					<el-button type="success" round size="small" @click="SignUpVisible = true">注册</el-button>
				</el-col>
			</el-row>
		</div>

		<el-dialog
				title="登 录"
				:visible.sync="SignInVisible"
				width="30%"
				center>

			<el-form :model="SignInForm" ref="SignInForm" label-width="60px" class="demo-dynamic">
				<el-form-item
						prop="account"
						label="账户"
						:rules="[{ required: true, message: '请输入账号', trigger: 'blur' },]">
					<el-input v-model="SignInForm.account"></el-input>
				</el-form-item>
				<el-form-item
						prop="password"
						label="密码"
						:rules="[
						{ required: true, message: '请输入密码', trigger: 'blur' },
					]">
					<el-input v-model="SignInForm.password" type="password"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="SignInCancel()">取 消</el-button>
				<el-button type="primary" @click="SignIn('SignInForm')">登 录</el-button>
			</span>
		</el-dialog>

		<el-dialog
				title="注册"
				:visible.sync="SignUpVisible"
				size="tiny"
				width="40%"
				center>
			<el-form :model="SignUpForm" status-icon :rules="rules2" ref="SignUpForm" label-width="80px"
					 class="demo-ruleForm">
				<el-form-item label="账号" prop="account">
					<el-col :span=16>
						<el-input v-model="SignUpForm.account"></el-input>
					</el-col>
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-col :span=16>
						<el-input type="password" v-model="SignUpForm.password" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPassword">
					<el-col :span=16>
						<el-input type="password" v-model="SignUpForm.checkPassword" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetForm('SignUpForm')">取 消</el-button>
				<el-button type="primary" @click="submitSignUpForm('SignUpForm')">确 定</el-button>
			</span>
		</el-dialog>

		<div>
			<div id="container" class="container">
				<div id="output"></div>
			</div>
			<div id="content">
				<el-carousel :interval="3000" indicator-position="none" :height="bannerHeight+'px'" style="width:1000px; margin-top:8%; margin-left: 23%; position:absolute">
					<el-carousel-item v-for="item in imagesbox" :key="item.id">
						<img ref="bannerHeight" :src="item.idView" class="image" @load="imgLoad"/>
					</el-carousel-item>
				</el-carousel>
			</div>
			<ul class="color">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.SignUpForm.checkPassword !== '') {
						this.$refs.SignUpForm.validateField('checkPassword');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.SignUpForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				bannerHeight:"",
				imagesbox:[{id:0,idView:require("../assets/no1.png")},{id:1,idView:require("../assets/no2.png")}],
				pinl: false,
				activeIndex: '1',
				backcolor: '#49dd84',
				SignInVisible: false,
				SignUpVisible: false,

				SignInForm: {
					account: '',
					password: ''
				},

				SignUpForm: {
					password: '',
					checkPassword: '',
					account: '',
					// pin: ''
				},
				rules2: {
					password: [
						{validator: validatePass, trigger: 'blur'}
					],
					checkPassword: [
						{validator: validatePass2, trigger: 'blur'}
					],
					account: [
						{required: true, message: '请输入账户', trigger: 'blur'},
						// {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
					],
					// pin: [
					//   {required: true, message: '请输入验证码', trigger: 'blur'}
					// ]
				}
			}
		},

		mounted() {
			this.imgLoad();
			window.addEventListener('resize',()=>{
				this.bannerHeight=this.$refs.bannerHeight[0].height
				this.imgLoad();
			},false)
			FSS("container", "output");
			var now = new Date();
			var day = now.getDay() + 1;
			this.backcolor = $(".color li:nth-child(" + day + ")").css("background-color")
			$("body").css("background-color", $(".color li:nth-child(" + day + ")").css("background-color"));
		},

		beforeRouteUpdate(to, from, next) {
			console.log(from)
			next()
		},

		methods: {
			imgLoad(){
				this.$nextTick(()=>{
					this.bannerHeight=this.$refs.bannerHeight[0].height
					console.log(this.$refs.bannerHeight[0].height);
				})
			},
			submitSignUpForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$store.dispatch('post_data', {
							api: '/api/sign_up',
							data: {
								'identify': this.$store.state.identify,
								'account': this.SignUpForm.account,
								'password': this.SignUpForm.password,
							}
						}).then((response) => {
							console.log('sign up response: ', response)
							if (response.data.status == 200) {
								this.$message({
									type: 'suucess',
									message: '注册成功！请前往登陆界面登陆',
									duration: 6000
								})
								this.SignUpVisible = false;
								this.SignInVisible = true;
							} else if (response.data == 400) {
								this.$message({
									message: "该用户名已存在",
									type: 'error',
									duration: 3000,
									showClose: true
								})
								this.SignUpForm.account = ''
							} else {
								this.$store.commit({
									type: 'show_message',
									status: response.data.status
								})
								console.log(response.data.status)
								this.$message(this.$store.state.app.message_box)
							}
						}).catch((error) => {
							alert(error)
						})
					} else {
						this.$message({
							message: '请检查格式后重新提交',
							type: 'warning',
							duration: 3000
						});
					}
				});
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.centerDialogVisible2 = false
			},

			SignInCancel() {
				this.SignInForm.account = ''
				this.SignInForm.password = ''
				this.SignInVisible = false
			},

			SignIn(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('Home.vue identify: ', this.$store.state.identify)
						this.$store.dispatch('post_data', {
							api: '/api/sign_in',
							data: {
								account: this.SignInForm.account,
								password: this.SignInForm.password,
								identify: this.$store.state.identify
							}
						}).then((response) => {
							console.log('sign in response: ', response)
							if (response.data.status == 200 || response.data.status == 401) {
								this.$message({
									type: 'success',
									message: '欢迎使用校园预约系统'
								})
								localStorage.setItem('account', this.SignInForm.account)
								if (response.data.status == 200) {
									this.$router.push('/Main')
								} else {
									this.$router.push('/personInfo')
								}
								location.reload()
							} else {
								this.$store.commit({
									type: 'show_message',
									status: response.data.status
								})
								console.log(response.data.status)
								this.$message(this.$store.state.app.message_box)
							}
						}).catch((error) => {
							alert(error)
						})
					}
				});
			},

			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},

			get_pin() {
				this.pinl = true
				this.$request.post('http://167.179.72.48:3000/pin', {
					'email': this.ruleForm2.email
				}).then((response) => {
					console.log(response)
					if (response.data.state == 'success') {
						this.$message({
							message: '验证码发送成功',
							type: 'success',
							duration: 3000
						});
					} else {
						this.$message({
							message: '验证码发送失败，请稍后重试',
							type: 'warning',
							duration: 3000
						});
					}
					this.pinl = false
				}).catch((error) => {
					this.$message({
						message: '网络错误,请稍后重试',
						type: 'warning',
						duration: 3000
					});
					this.pinl = false
				})
			},
		}
	}
</script>


<style scoped lang="less">
	@import '../style/mixin';

	.header_container {
		height: 60px;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}

	.avator {
		.wh(150px, 150px);
		margin-right: 37px;
		margin-top: -40px;
	}

	body {
		background-color: #00c1ff;
		-webkit-transition: background-color 400ms ease-in-out;
		-ms-transition: background-color 400ms ease-in-out;
		-o-transition: background-color 400ms ease-in-out;
		-moz-transition: background-color 400ms ease-in-out;
		transition: background-color 400ms ease-in-out;
	}

	.container {
		position: absolute;
		height: 100%;
		width: 100%;
	}

	#output {
		opacity: 0.3;
		width: 100%;
		height: 100%;
		-webkit-transition: all 400ms ease-in-out;
		-ms-transition: all 400ms ease-in-out;
		-o-transition: all 400ms ease-in-out;
		-moz-transition: all 400ms ease-in-out;
		transition: all 400ms ease-in-out;
	}

	.color {
		width: 210px;
		height: 20px;
		margin: 0 auto;
		position: fixed;
		left: 50%;
		margin-left: -110px;
		bottom: 20px;
	}

	.color li {
		float: left;
		margin: 0 5px;
		width: 20px;
		height: 20px;
		background: #ccc;
		box-shadow: 0 0 4px #FFF;
		list-style: none;
		cursor: pointer;
	}

	.color li:nth-child(1) {
		background: #00c1ff;
	}

	.color li:nth-child(2) {
		background: #49dd84;
	}

	.color li:nth-child(3) {
		background: #ff5a3d;
	}

	.color li:nth-child(4) {
		background: #ffac3f;
	}

	.color li:nth-child(5) {
		background: #2b7cd3;
	}

	.color li:nth-child(6) {
		background: #ff8864;
	}

	.color li:nth-child(7) {
		background: #45ada8;
	}

	.logo {
		width: 140px;
		height: 70px;
		position: fixed;
		top: 10px;
		left: 50%;
		margin-left: -70px;
		border: solid 1px #BBBBBB;
		-webkit-transition: all 400ms ease-in-out;
		-ms-transition: all 400ms ease-in-out;
		-o-transition: all 400ms ease-in-out;
		-moz-transition: all 400ms ease-in-out;
		transition: all 400ms ease-in-out;
	}

	.logo:hover {
		border: solid 1px #FFF;
		background: rgba(255, 255, 255, 0.2);
	}
</style>
