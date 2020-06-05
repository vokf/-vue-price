<template >
	<el-container style = "background:#d3dce6 " >
		<el-header >
			<div ><h2 style = "text-align: center;margin-top: 30px" >注册</h2 ></div >
		</el-header >
		<el-main
				style = "height: 900px;margin-left: auto;margin-right: auto;width:700px" >
			<el-form
					
					:model = "user"
					:rules = "rules"
					status-icon
					ref = "user" >
				<el-form-item
						
						label = "用户名"
						prop = "userName" >
					<el-input v-model = "user.userName" prefix-icon = "el-icon-user" ></el-input >
				</el-form-item >
				<el-form-item label = "密码" autocomplete = "off" prop = "passWord" >
					<el-input
							v-model = "user.passWord"
							type = "password"
							prefix-icon = "el-icon-key" ></el-input >
				</el-form-item >
				<el-form-item
						show-password
						label = "确认密码"
						autocomplete = "off"
						prop = "okPassWord" >
					<el-input
							show-password
							v-model = "user.okPassWord"
							type = "password"
							prefix-icon = "el-icon-key" ></el-input >
				</el-form-item >
				<el-form-item
						:rules = "[{ required: true, message: '请输入您的电话号码', trigger: 'blur' }
      
						]"
						label = "手机号码"
						prop = "phoneNumber" >
					<el-input
							v-model = "user.phoneNumber"
							prefix-icon = "el-icon-mobile" ></el-input >
				</el-form-item >
				<el-form-item
						label = "邮箱"
						prop = "email"
						:rules = "[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
				>
					<el-input
							v-model = "user.email"
							prefix-icon = "el-icon-postcard" ></el-input >
				</el-form-item >
				<el-form-item label = "年龄" prop = "age" >
					<el-input
							
							v-model.number = "user.age"
							autocomplete = "off"
							type = "age"
							prefix-icon = "el-icon-s-custom" ></el-input >
				</el-form-item >
				<el-form-item label = "地址" prop = "address" >
					<el-input
							v-model = "user.address"
							prefix-icon = "el-icon-location-outline" ></el-input >
				</el-form-item >
				<el-button
						
						type = "primary"
						style = "width: 100px;margin-left: 270px"
						@click = "register()" >提交
				</el-button >
			</el-form >
		</el-main >
	</el-container >

</template >

<script >
    export default {
        data() {
            var checkUser = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入您的用户名'));
                }

            };
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            // var checkPass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.user.passWord !== '') {
            //             this.$refs.user.validateField('passWord');
            //         }
            //         callback();
            //     }
            // };
            // var checkokPass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.user.passWord) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };

           
            var checkAddress = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的地址'));
                }
            };


            return {
                user: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    okPassWord: '',
                    age: ''
                }, dataList: [],
                rules: {
                    userName: [{
                        required: true, message: '请输入您的用户名', trigger: 'blur'
                    }, {
                        validator: checkUser, trigger: 'blur'
                    }],
                    passWord: [{
                        required: true, message: '请输入您的密码', trigger: 'blur'
                    }, {
                        // validator: checkPass, trigger: 'blur'
                    }],
                    okPassWord: [{
                        required: true, message: '请再次确认您的密码', trigger: 'blur'
                    }, {
                        // validator: checkokPass, trigger: 'blur'
                    }],
                    age: [{
                        required: true, message: '请输入您的年龄', trigger: 'blur'
                    }, {
                        validator: checkAge, trigger: 'blur'
                    }], address: [{
                        required: true, message: '请输入您的地址', trigger: 'blur'
                    }, {
                        validator: checkAddress, trigger: 'change'
                    }]
                },

            }
        },

        methods: {
            register: function () {
                var _this = this;
                var userData = {};
                userData['userName'] = _this.user.userName;
                userData['passWord'] = _this.user.passWord;
                userData['phoneNumber'] = _this.user.phoneNumber;
                userData['age'] = _this.user.age;
                userData['email'] = _this.user.email;
                userData['address'] = _this.user.address;
                const registData = JSON.stringify(userData);

                
                        _this.$axios({
                            method: 'post',
                            url: 'http://localhost:8090/register',
                            data: registData,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'dataType': "json",
                            }
                        }).then(res => {
                            if (res.data.code === 1) {
                                const h = this.$createElement;
                                _this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                _this.$notify({
                                    title: '提示',
                                    type: 'success',
                                    message: h('i', {style: 'color: teal'}, '注册成功')
                                });
                                this.$router.push('/login');
                            } else {
                                if (res.data.code === 0) {
                                    const h = this.$createElement;
                                    _this.$message({
                                        message: '注册失败',
                                        type: 'error'
                                    });
                                    _this.$notify({
                                        type: 'error',
                                        title: '提示',
                                        message: h('i', {style: 'color: teal'}, '注册失败')
                                    });
                                }
                            }
                        }, err => {
                            const h = this.$createElement;
                            _this.$message.error('服务器错误');
                            _this.$notify({
                                type: 'error',
                                title: '提示',
                                message: h('i', {style: 'color: teal'}, '登录失败,可能是密码错误')
                            });
                            console.log(err);
                        });
				

            },

        }
    }
</script >

<style scoped >

</style >