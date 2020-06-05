<template>
	<div class="dormitory">
		<div class="searchWord">
			<div style="display: inline-block"> 搜索：</div>
			<el-input v-model="search" style="display: inline-block;width: 1300px" placeholder="请输入搜索内容">
			</el-input>
		</div>
		<!-- // 遍历表格 -->
		<div class="dormitoryData">
			<el-table border ref="dormitoryTable" :data="tables" tooltip-effect="dark" stripe style="width: 100%">
				<el-table-column type="selection" width="45"></el-table-column>
				<el-table-column label="序号" type="index" width="65"></el-table-column>
				<el-table-column label="人物" prop="userId">
				</el-table-column>
				<el-table-column label="关系" prop="userName">
				</el-table-column>
				<el-table-column label="初见" prop="passWord">
				</el-table-column>
				<el-table-column label="地点" prop="phoneNumber">
				</el-table-column>
				<el-table-column label="昵称" prop="role">
				</el-table-column>
				<el-table-column label="认识年限" prop="email">
				</el-table-column>
				<el-table-column label="成名之作" prop="address">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                dormitory: [],
                search: '',
                user: {
                    passWord:'',
                    userId: '',
                    userName: '',
                    phoneNumber: '',
                    role: '',
                    email: '',
                    address: ''
                },
            }
        },
        computed: {
            // 模糊搜索
            tables() {
                const _this=this;
                const search = _this.search
				console.log(search)
                if (search) {
                    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                    // 注意： filter() 不会对空数组进行检测。
                    // 注意： filter() 不会改变原始数组。
                    return this.dormitory.filter(data => {
                        // some() 方法用于检测数组中的元素是否满足指定条件;
                        // some() 方法会依次执行数组的每个元素：
                        // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                        // 如果没有满足条件的元素，则返回false。
                        // 注意： some() 不会对空数组进行检测。
                        // 注意： some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
                            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.dormitory
            }
        },
        created: function () {
            var _this = this;
            _this.$axios({
                method: 'get',
                url: 'http://localhost:8090/findAllUser',
            }).then(function (res) {
                _this.dormitory = res.data
            })
        }
    }
</script>