<template style = "height: 500px; width: 600px;border: 1px solid red" >
	<div style = " margin-top:50px;" >
		<template >
			<el-form >
				<el-form-item label = "快捷查询" >
					<el-input
							v-model = "search"
							placeholder = "通过关键字查询"
							prefix-icon = "el-icon-search"
							style = "width: 200px" ></el-input >
				</el-form-item >
			</el-form >
		</template >
		<!--遍历-->
		<el-table :data = "tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" >
			<el-table-column
					prop = "id"
					label = "商品排号"
					width = "100" >
			</el-table-column >
			<el-table-column
					prop = "goodName" label = "商品名称" width = "250" >
			
			</el-table-column >
			<el-table-column
					prop = "goodPrice"
					label = "价格"
					width = "100" >
			
			</el-table-column >
			<el-table-column
					prop = "goodImage"
					label = "图片"
					width = "250" >
			
			</el-table-column >
			<el-table-column
					prop = "brand"
					label = "品牌"
					width = "100" >
			
			</el-table-column >
			<el-table-column
					prop = "hotGood"
					label = "热销"
					width = "100" >
			
			</el-table-column >
			<el-table-column
					fixed = "right"
					label = "操作"
					width = "200" >
				<template slot-scope = "scope" >
					
					<el-button
							@click.native.prevent = "deleteById(scope.$index,allData)"
							type = "primary"
							size = "small"
					>删除
					</el-button >
				</template >
			</el-table-column >
		</el-table >
		<!--添加按钮-->
		<el-button type = "primary" @click = "dialogFormVisible=true" >添加</el-button >
		<!--点击之后弹出dialog-->
		<el-dialog title = "添加" :visible.sync = "dialogFormVisible" width = "40%" >
			<el-form label-width = "80px" :model = "updateShoe" :rules = "rules" status-icon >
				<el-form-item label = "商品名字:" >
					<el-input v-model = "updateShoe.goodName" ></el-input >
				</el-form-item >
				<el-form-item label = "价格:" >
					<el-input v-model = "updateShoe.goodPrice" ></el-input >
				</el-form-item >
				<!---->
				<el-form-item label = "品牌:" >
					<el-input v-model = "updateShoe.brand" ></el-input >
				</el-form-item >
				<el-form-item label = "是否热销:" >
					<el-input v-model = "updateShoe.hotGood" ></el-input >
				</el-form-item >
			</el-form >
			<div slot = "footer" >
				<el-button @click = "dialogFormVisible = false" >取 消</el-button >
				<el-button type = "primary" @click = "add" >确 定</el-button >
			</div >
		</el-dialog >
		<template >
			<div class = "block" >
				<span class = "demonstration" ></span >
				<!--分   页-->
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
        inject: ["reload"],
        data() {
            return {
                //搜索数据绑定
                search: '',
                dialogFormVisible: false,
                loading: false,
                currentPage: 1, //初始页
                pagesize: 5,    //    每页的数据
                //所有的数据集合
                allData: [],
                //对应后台的实体类
                shoe: {
                    id: '',
                    goodName: '',
                    goodPrice: '',
                    goodImage: '',
                    hotGood: '',
                    brand: '',
                    imageUrl: ''
                },
                updateShoe: {
                    id: '',
                    goodName: '',
                    goodPrice: '',
                    goodImage: '',
                    hotGood: '',
                    brand: '',
                },
                //分页数据
                page: {
                    total: 0,
                },
                rules: {
                    goodName: [{
                        require: true,
                        message: '请输入商品的名字',
                        trigger: 'blur',
                    }], goodPrice: [{
                        require: true,
                        message: '请输入商品的价格',
                        trigger: 'blur'
                    }], hotGood: [{
                        require: true,
                        message: '请输入该商品是否是热销商品',
                        trigger: 'blur'
                    }, {
                        min: 1,
                        max: 2,
                        message: '请确定是或者不是'
                    }], brand: [{
                        require: true,
                        message: '请输入该商品的品牌',
                        trigger: 'blur'
                    }]
                }
            };
            //所有的方法
        },
        methods: {
            //通过id删除 ，从数据库中删除
            deleteById: function (index, allData) {
                const _this = this;
                //在用户删除前进行确认
                _this.$confirm('此操作将会删除该商品,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                    //确认删除之后，然后再向后台请求数据
                ).then(function () {
                    //用axios向后台发送数据
                    _this.$axios({
                        method: 'get',
                        url: 'http://localhost:8090/deleteGood',
                        header: {
                            'Access-Control-Allow-Origin': '*',
                        },
                        //参数
                        params: {
                            id: allData[index].id
                        }
                        //请求后台成功之后处理后台的响应
                    }).then(function (response) {
                        //当后台服务器处理成功返回1之后进行的操作
                        if (response.data.code === 1) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            allData.splice(index, 1);
                        } else {
                            //当后处理结果返回0之后前台的处理结果
                            if (response.data.code === 0) {
                                _this.$message({
                                    message: '删除失败',
                                    type: 'error'
                                })
                            }
                        }
                        //当后台服务器没有响应之后的处理结果
                    }).catch(function () {
                        _this.$message.error("服务器错误");
                    })
                    //当用户点击取消按钮之后的处理结果
                }).catch(function () {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //向后台数据库添加数据
            add: function () {
                const _this = this;
                var userData = {};
                userData['goodName'] = _this.updateShoe.goodName;
                userData['goodPrice'] = _this.updateShoe.goodPrice;
                userData['goodImage'] = _this.updateShoe.goodImage;
                userData['hotGood'] = _this.updateShoe.hotGood;
                userData['brand'] = _this.updateShoe.brand;
                const registData = JSON.stringify(userData);
                _this.$axios({
                    method: 'post',
                    url: 'http://localhost:8090/addItem',
                    data: registData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'dataType': "json",
                    }
                }).then(res => {
                   
                    if (res.data.code === 1) {
                        _this.dialogFormVisible = false;
                        _this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    } else {
                        if (res.data.code === 0) {
                            _this.dialogFormVisible = false;
                            _this.$message.error("添加失败");
                        }
                    }
                }).catch(function () {
                    _this.$message.error("服务器错误");
                })

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }, created() {
            var _this = this;
            const h = this.$createElement;
            _this.$axios({
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': "json",
                },
                method: 'get',
                url: "http://localhost:8090/findAll"
            }).then(res => {
                _this.allData = res.data;
                _this.$notify({
                    title:'提示',
                    type:'success',
                    message:h('i', { style: 'color: teal'},'所有商品的信息获取成功'),
					offset:100
                });
            }).catch(function () {
                _this.$message.error("服务器错误");
            });
            _this.$axios({
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': "json",
                },
                method: 'get',
                url: 'http://localhost:8090/totalGood'
            }).then(function (response) {
                _this.page.total = response.data;
            }).catch(function () {
                _this.$message.error("服务器错误");
                _this.$notify({
					
                    type:'error',
                    title:'提示',
                    message:h('i', { style: 'color: teal'},'获取所有商品的信息失败')
                });
            });

        }, computed: {
            tables() {
                const search = this.search;

                if (search) {
                    return this.allData.filter(data => {
                        return Object.keys(data).some(key => {
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.allData;
            }
        }

    }
</script >

<style scoped >
	.avatar-uploader {
		
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}


</style >