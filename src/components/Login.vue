<template >
	<el-container style = "height: 500px; width: 100% ;margin: 0;padding: 0 ;background:  #d3dce6" >
		
		<el-container >
			<!--header-->
			<el-header height = "50px" style = "
			margin: auto;width:200px;font-size: 20px;margin-top: 50px;
			text-align: center ;" >
				欢迎登录
			</el-header >
			<!-- main -->
			<el-main style = " width: 500px; margin: auto;padding: 50px" >
				<!--表单-->
				<el-form ref = "form" :model = "user" style = "margin: auto" >
					<!--表单的第一项-->
					<el-form-item label = "用户名" >
						<!--输入框-->
						<el-input
								prefix-icon = "el-icon-user"
								v-model = "user.userName"
								ref = "userName"
								name = "userName"
								placeholder = "请输入您的用户名" ></el-input >
					</el-form-item >
					<!--密码-->
					<el-form-item label = "密码" >
						<el-input
								prefix-icon = "el-icon-key"
								placeholder = "请输入密码"
								name = "passWord"
								ref = "passWord"
								v-model = "user.passWord"
								show-password ></el-input >
					</el-form-item >
					<!--提交登录的按钮-->
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
            //直接返回的数据
            return {
                
                userToken: ''
                ,
				//与后端对应的实体类
                user: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    phoneNumber: '',
                },
				// 从后端获取到数据之后存到list
				dataList: []
            }
        },
        methods: {
            // 登录方法
            login: function () {
                const _this = this;
                //定义json
                var userData = {};
                // 给定义的json装值
                userData['userName'] = this.user.userName;
                userData['passWord'] = this.user.passWord;
                // 将数据转换成 json
                const loginData = JSON.stringify(userData);
                // 向后端请求数据 用$axios
                _this.$axios({
						// 请求方式
                        method: 'post',
						// 请求url
                        url: 'http://localhost:8090/login',
						// 请求参数
                        data: loginData,
						// 在请求头中添加一下内容
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'dataType': "json",
                        }
                    }
                    
                ).then(res => {
                    // 响应成功的处理
                    if (res.data.code === 1) {
                        // 接受到的code 为1 之后 ，请求成功 给提示
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
                        // 处理 向后端请求成功之后 ，返回的 code 是0 的情况
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
                    // 处理服务器没有响应的情况
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
