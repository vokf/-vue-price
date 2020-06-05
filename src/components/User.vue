<template >
	
	<div style = "margin-top: 50px" >
		<!--<el-input placeholder="通过名字查询">-->
		<!--	<el-button>sou</el-button>-->
		<!--</el-input>-->
		<template >
			<el-form >
				<el-form-item label = "快捷查询" >
					<el-input
							v-model = "search"
							placeholder = "通过关键字查询"
							prefix-icon = "el-icon-search"
							style = "width: 200px" >
					</el-input >
				
				</el-form-item >
			</el-form >
		</template >
		<!--遍历表格-->
		<el-table
				:data = "tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				ref="user"
		>
			<el-table-column
					type = "index"
					prop = "userId"
					label = "id"
					width = "100" >
			
			</el-table-column >
			<el-table-column
					
					prop = "userName"
					label = "用户名"
					width = "150" >
			
			</el-table-column >
			<el-table-column
					prop = "phoneNumber"
					label = "联系方式"
					width = "150" >
			
			</el-table-column >
			<el-table-column
					prop = "age"
					label = "年龄"
					width = "100" >
			
			</el-table-column >
			<el-table-column
					prop = "email"
					label = "邮箱"
					width = "150" >
			
			</el-table-column >
			<el-table-column
					prop = "address"
					label = "住址"
					width = "220" >
			
			</el-table-column >
			<el-table-column
					prop = "role"
					label = "角色"
					width = "100" ></el-table-column >
			
			<el-table-column fixed = "right" label = "操作" width = "200" >
				
				<template slot-scope = "scope" >
					<!--编辑按钮-->
					<el-button type = "warning" size = "small" icon="el-icon-edit" @click = "dialogFormVisible=true" >
						编辑
					</el-button >
					<!--删除按钮-->
					<el-dialog title = "修改用户" :visible.sync = "dialogFormVisible" :modal-append-to-body = 'false' >
						<el-form :rules = "rules" status-icon :model = "updateUser" >
							<el-form-item
									label = "用户名"
									:rules = "[{ required: true, message: '请输入您的用户名', trigger: 'blur' }
      
						]"
							>
								<el-input v-model = "updateUser.userName" ></el-input >
							</el-form-item >
							<el-form-item
									label = "密码"
									:rules = "[{ required: true, message: '请输入您的密码', trigger: 'blur' }
      
						]"
							>
								<el-input
										show-password
										v-model = "updateUser.password"
										type = "password"
										auto-complete = "off" ></el-input >
							</el-form-item >
							<el-form-item
									label = "确认密码"
									:rules = "[{ required: true, message: '请确认您的密码', trigger: 'blur' }
      
						]"
							>
								<el-input
										show-password
										v-model = "updateUser.okPassWord"
										type = "password"
										auto-complete = "off" ></el-input >
							</el-form-item >
						
						</el-form >
						<div slot = "footer" >
							<el-button @click = "dialogFormVisible = false" >取 消</el-button >
							<el-button type = "primary" @click = "editUser(scope.$index,allData)" >确 定
							</el-button >
						</div >
					</el-dialog >
					<el-button
							icon="el-icon-delete"
							@click.native.prevent = "deleteById(scope.$index,allData)"
							type = "primary"
							size = "small"
					>删除
					</el-button >
					
				</template >
			</el-table-column >
		</el-table >
		<!--分页实现-->
		<template >
			<div class = "block" >
				<span ></span >
				<el-pagination
						
						:current-page = "currentPage"
						:page-size = "pagesize"
						:page-sizes = "[5, 10, 15, 20]"
						@size-change = "handleSizeChange"
						@current-change = "handleCurrentChange"
						background
						layout = "total, sizes, prev, pager, next, jumper"
						:total = "this.page.total" >
				</el-pagination >
			</div >
		</template >
	</div >
</template >

<script >

    export default {

        name: "User",
        //要用到的变量
        data() {
            //返回的数据
            return {
                //所有的数据
                allData: [],
                //关键字绑定输入
                search: '',
                loading: false,
                //初始页
                currentPage: 1,
                //    每页的数据
                pagesize: 5,
                dialogFormVisible: false,
                //对应后台的实体类
                user: {
                    userId: '',
                    userName: '',
                    phoneNumber: '',
                    age: '',
                    role: '',
                    email: '',
                    address: ''
                },
                updateUser: {
                    userName: '',
                    password: '',
                    okPassWord: ''

                },
                //页面
                page: {
                    total: 0,
                },
                rules: {}
            }
        },
        //监听方法
        computed: {
            //监听表格
            tables() {
                //获取input的值
                const search = this.search;
                if (search) {
                    //根据关键字查询
                    return this.allData.filter(data => {
                        return Object.keys(data).some(key => {
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                //返回表格数据
                return this.allData
            }
        },
        //所有的方法
        methods: {
            editUser: function (index, allData) {
                const _this = this;
                _this.$confirm('此操作将会修改用户信息,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    _this.$axios({
                        method: 'get',
                        url: 'http://localhost:8090/updateUserName',
                        params: {
                            userId: allData[index].userId,
                            userName: _this.updateUser.userName,
                            password: _this.updateUser.password
                        }
                    }).then(res=>{
                        if (res.data.code === 1){
                            _this.dialogFormVisible=false;
                            _this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
						} if (res .data.code ===0){
                            _this.dialogFormVisible=false;
                            _this.$message.error("添加失败");
						}
					})

                })
            },
            //处理页面改变
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            //页面改变
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            //通过id删除
            deleteById: function (index, allData) {
                const _this = this;
                //先提示用户是否删除
                _this.$confirm('此操作将会删除该用户,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    //请求后台数据接口
                    _this.$axios({
                        //请求方式
                        method: 'get',
                        //url
                        url: 'http://localhost:8090/deleteUser',
                        //设置的请求头
                        header: {
                            'Access-Control-Allow-Origin': '*',
                        },
                        //请求参数
                        params: {
                            userId: allData[index].userId
                        }

                    }).then(function (response) {
                        //对应后台返回的数据进行判断
                        if (response.data.code === 1) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            allData.splice(index, 1);
                        } else {
                            if (response.data.code === 0) {
                                _this.$message({
                                    message: '删除失败',
                                    type: 'danger'
                                })
                            }
                        }
                    }).catch(function () {
                        //请求错误
                        _this.$message.error("服务器错误");
                    })
                }).catch(function () {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },

        },
        // 页面加载完成之后从后端请求数据
        created() {

            //获取数据库中的数据
            var _this = this;
            const h = this.$createElement;
            // 通过axios
            _this.$axios({
                //请求头
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': "json",
                },
                method: 'get',
                //请求路径
                url: 'http://localhost:8090/total'
            }).then(function (response) {
                _this.page.total = response.data;
                _this.$notify({
                    title:'提示',
                    type:'success',
                    message:h('i', { style: 'color: teal'},'数据库的表的总条数获取成功')
                });
               
            }).catch(function () {
                this.$message.error("服务器错误");
                _this.$notify({
					offset:150,
                    type:'error',
                    title:'提示',
                    message:h('i', { style: 'color: teal'},'数据库的表的总条数获取失败')
                });
            });
            // 获取所有的商品
            _this.$axios({
				
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': "json",
                },
                method: 'get',
                url: 'http://localhost:8090/findAllUser',
            }).then(function (res) {
                _this.allData = res.data;
                _this.$notify({
					offset:155,
                    title:'提示',
                    type:'success',
                    message:h('i', { style: 'color: teal'},'获取所有用户信息成功')
                });
            }).catch(function () {
                _this.$message.error("服务器错误");
                _this.$notify({
                    type:'error',
                    title:'提示',
                    message:h('i', { style: 'color: teal'},'获取所有用户的信息失败')
                });
            })
        }
    }
</script >

<style scoped >

</style >