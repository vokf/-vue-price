<template >
	<el-container style = "height: 500px; width: 100% ;margin: 0;padding: 0 ;background:  #d3dce6" >
		
		<el-container >
			<el-header height = "50px" style = "
			margin: auto;width:200px;font-size: 20px;margin-top: 50px;
			text-align: center ;" >
				欢迎登录
			</el-header >
			<el-main style = " width: 500px; margin: auto;padding: 50px" >
				<el-form ref = "form" :model = "user" style = "margin: auto" >
					<el-form-item label = "用户名" >
						<el-input
								prefix-icon = "el-icon-user"
								v-model = "user.userName"
								ref = "userName"
								name = "userName"
								placeholder = "请输入您的用户名" ></el-input >
					</el-form-item >
					<el-form-item label = "密码" >
						<el-input
								prefix-icon = "el-icon-key"
								placeholder = "请输入密码"
								name = "passWord"
								ref = "passWord"
								v-model = "user.passWord"
								show-password ></el-input >
					</el-form-item >
					<el-button
							type = "primary"
							style = "width: 100px ;margin-left: 130px;margin-top: 50px" @click = "login" >登录
					</el-button >
				
				</el-form >
			
			</el-main >
		
		</el-container >
		<el-footer style = "background: #d3dce6;width: 100%;height: 270px" >
		
		</el-footer >
	</el-container >


</template >

<script >
  

    export default {

        name: 'App',
        data() {
            return {
                userToken: ''
                ,
                user: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    phoneNumber: '',
                }, dataList: []
            }
        },
        methods: {
            login: function () {
                const _this = this;
                var userData = {};
                userData['userName'] = this.user.userName;
                userData['passWord'] = this.user.passWord;
                const loginData = JSON.stringify(userData);
                _this.$axios({
                        method: 'post',
                        url: 'http://localhost:8090/login',
                        data: loginData,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'dataType': "json",
                        }
                    }
                ).then(res => {
                    if (res.data.code === 1) {
                        const h = this.$createElement;
                        _this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        _this.$notify({
							title:'提示',
							type:'success',
							message:h('i', { style: 'color: teal'},'登录成功')
						});
                        _this.$router.push('/index');
                    } else {
                        const h = this.$createElement;
                        if (res.data.code === 0) {
                            _this.$message({
								
                                message: '登录失败',
								
                                type: 'error'
                            });
                            _this.$notify({
								type:'error',
                                title:'提示',
                                message:h('i', { style: 'color: teal'},'登录失败,可能是密码错误')
                            });
                        }

                    }
                }, err => {
                    _this.$message.error('服务器错误');
                    console.log(err);
                });
            }

        }
    }
</script >

<style >
	
	.el-header {
		
		color: #333;
		line-height: 50px;
	}
	
	.el-aside {
		color: #333;
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: #d3dce6;
	}


</style >
