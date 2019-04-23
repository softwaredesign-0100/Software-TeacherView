<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
			<el-col :span="4"  style="min-height: 100%; background-color: #545c64">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
					<template>
						<img src="../assets/1.jpg" class="avator">
					</template>
					<el-menu-item index="/Main" ><i class="zhao-icon-third-icon_work_fill"></i> &nbsp; 主页</el-menu-item>

                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>预约管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/Main" ><i class="zhao-icon-third-icon_search"></i> &nbsp; 我的预约</el-menu-item>
                            <el-menu-item index="/seekRes" ><i class="zhao-icon-third-icon_synergy"></i> &nbsp; 查询预约</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>&nbsp;考试管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/showExam" ><i class="zhao-icon-third-icon_task"></i> &nbsp; 我的考试</el-menu-item>
                            <el-menu-item index="/seekExam" ><i class="zhao-icon-third-icon_search"></i> &nbsp; 查询考试</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>我的历史</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/hisRes" ><i class="zhao-icon-third-icon_statistics"></i> &nbsp; 历史预约</el-menu-item>
                            <el-menu-item index="/hisExam" ><i class="zhao-icon-third-icon_statistics"></i> &nbsp; 历史考试</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
					<el-menu-item index="/personInfo" ><i class="zhao-icon-third-icon_sketch"></i> &nbsp; 个人信息</el-menu-item>
					<el-menu-item index="/changePassword" ><i class="zhao-icon-third-icon_boss"></i> &nbsp; 修改密码</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
			sidebar_disabled: function(){
				// this.disabled = this.$store.state.sidebar_disabled
				// return this.$store.state.sidebar_disabled

				let disabled = localStorage.getItem('sidebar_disabled')
				this.disabled = Boolean(disabled)
				return this.disabled
			}
		},
		methods:{
			data() {
				return {
					disabled: false,
				}
			}
		}
	}
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-left: 58px; margin-top: 15px;margin-bottom: 10px
	}
</style>
