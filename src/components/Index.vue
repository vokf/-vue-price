<template >
	<el-container >
		
		<el-header style = "width: 100%;height: 60px;" >
			购物后台管理系统
		</el-header >
		<el-container >
			<el-aside width = "300px" >
				<el-menu
						
						:default-active = "this.$route.path"
						router
						mode="vertical" >
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>管理员</span>
						</template>
						<el-menu-item-group>
							<template slot="title">操作</template>
							<el-menu-item index="1-1">操作</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>用户</span>
						</template>
						<el-menu-item-group>
							<template slot="title">操作</template>
							<el-menu-item index="/index/user">用户管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-document"></i>
							<span>商品</span>
							
						</template>
						<el-menu-item-group>
							<template slot="title">操作</template>
							<el-menu-item index="/index/shoe">商品管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu >
			</el-aside >
			<el-main style="margin-top: 50px">
				<el-row :gutter="20">
					<el-col :span="19"><div class="grid-content"></div></el-col>
					<el-col :span="1">
						<el-tooltip content="退出登录" placement="bottom" >
							<el-button type="primary" @click = "logout">退出</el-button>
						</el-tooltip>
						
					</el-col>
				</el-row>
				<router-view></router-view>
			</el-main>
		</el-container >
	</el-container >
</template >

<script >
    export default {
        name: "Index",
        data() {
            return {
                user: {}
            }
        },
        methods: {
            logout: function () {
                const _this = this;
                _this.$confirm('是否确认退出', '提示', {
                    
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                   
                }).then(() => {
                    _this.$router.push('/login');
                    const h = this.$createElement;
                    _this.message({
                        type: 'success',
                        message: '登出成功'
                    });
                    _this.$notify({
                        title:'提示',
                        type:'success',
                        message:h('i', { style: 'color: teal'},'退出成功')
                    });
                }).catch(() => {
                    const h = this.$createElement;
                    _this.$message({
                        type: 'info',
                        message: '已经取消'
                    });
                    _this.$notify({
                        title:'提示',
                        type:'info',
                        message:h('i', { style: 'color: teal'},'已经取消了')
                    });
                })
            }
        }
    }
</script >

<style scoped >
	.el-container {
		width: 100vw;
		height: 100vh;
		/*background: #409EFF;*/
	}
	.el-header {
		background: #d4d1d1;
		line-height: 180px;
		text-align: center;
		font-weight: 100;
		font-size: 40px;
		letter-spacing: 15px;
	}
	.el-aside {
		background: rgba(223, 223, 223, 0.589);
	}
	.grid-content {
		border-radius: 4px;
		min-height: 20px;
	}
	
</style >