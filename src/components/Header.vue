<template>
    <div class="header_container">
		<el-breadcrumb separator="/" style="cursor:pointer">
			<el-breadcrumb-item  :to="{ path: '/test' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" style="cursor:pointer"  menu-align='start'>
			<img src="../assets/1.jpg" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
  export default {
    data(){
      return{ 
      }
    },
    computed: {
    },
    methods: {
      async handleCommand(command) {
		if (command == 'home') {
		  this.$router.push('/sys');
		}else if(command == 'signout'){
		  this.$message({
		    type: 'success',
		    message: '退出成功'
		  });
		  this.$router.push('/')
		  location.reload()
		}
	  },
	}
  }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
