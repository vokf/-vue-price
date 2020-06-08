<template >
	<el-container >
		<!--头部-->
		<el-header style = "width: 100%;height: 60px;" >
			购物后台管理系统
		</el-header >
		<el-container >
			<!--aside-->
			<el-aside width = "300px" >
				<!--menu -->
				<el-menu
						:default-active = "this.$route.path"
						router
						mode="vertical" >
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>管理员</span>
						</template>
						<!--menu-item-->
						<el-menu-item-group>
							<template slot="title">操作</template>
							<el-menu-item >操作</el-menu-item>
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
			<!--main-->
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
			<el-tooltip effect="dark" content="theme" placement="bottom">
				<el-color-picker
						v-model="theme"
						class="theme-picker"
						size="small"
						popper-class="theme-picker-dropdown"/>
			</el-tooltip>
		</el-container >
	</el-container >
</template >

<script >
    const version = require('element-ui/package.json').version // element-ui version from node_modules
    const ORIGINAL_THEME = '#409EFF' // default color
    export default {
        name: "Index",
        props: {
            default: {
                type: String,
                default: ORIGINAL_THEME
            },
            size: {
                // 初始化主题，可由外部传入
                type: String,
                default: 'small'
            }
        },
        data() {
            return {
                chalk: '', // content of theme-chalk css
                theme: ORIGINAL_THEME,
                showSuccess: true // 是否弹出换肤成功消息
            }
        },
        mounted() {
            if (this.default !== null) {
                this.theme = this.default
                this.$emit('onThemeChange', this.theme)
                this.showSuccess = false
            }
        },
        watch: {
            theme(val, oldVal) {
                if (typeof val !== 'string') {
                    return
                }
                const themeCluster = this.getThemeCluster(val.replace('#', ''))
                let originalCluster = this.getThemeCluster(oldVal.replace('#', ''))

                const getHandler = (variable, id) => {
                    return () => {
                        originalCluster = this.getThemeCluster(
                            ORIGINAL_THEME.replace('#', '')
                        )
                        const newStyle = this.updateStyle(
                            this[variable],
                            originalCluster,
                            themeCluster
                        )

                        let styleTag = document.getElementById(id)

                        if (!styleTag) {
                            styleTag = document.createElement('style')
                            styleTag.setAttribute('id', id)
                            document.head.appendChild(styleTag)
                        }
                        styleTag.innerText = newStyle
                    }
                }

                const chalkHandler = getHandler('chalk', 'chalk-style')

                if (!this.chalk) {
                    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`

                    this.getCSSString(url, chalkHandler, 'chalk')
                } else {
                    chalkHandler()
                }

                const styles = [].slice
                    .call(document.querySelectorAll('style'))
                    .filter(style => {
                        const text = style.innerText

                        return (
                            new RegExp(oldVal, 'i').test(text) &&
                            !(/Chalk Variables/).test(text)
                        )
                    })

                styles.forEach(style => {
                    const { innerText } = style

                    if (typeof innerText !== 'string') {
                        return
                    }
                    style.innerText = this.updateStyle(
                        innerText,
                        originalCluster,
                        themeCluster
                    )
                })

                // 响应外部操作
                this.$emit('onThemeChange', val)
                //存入localStorage
                if (this.showSuccess) {
                    this.$message({
                        message: '颜色更换成功',
                        type: 'success'
                    })
                } else {
                    this.showSuccess = true
                }
            }
        },
        methods: {
            //登出方法
			
            logout: function () {
                const _this = this;
                _this.$confirm('是否确认退出', '提示', {
                    // 确认按钮对应的
                    confirmButtonText: '确定',
					// 取消按钮
                    cancelButtonText: '取消',
                    type: 'warning' //type
                   
                }).then(() => {
                    //方法执行成功之后 将页面推到登录页面
                    _this.$router.push('/login');
                    //给用户来提示消息
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
                    //错误处理
                    const h = _this.$createElement;
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
            },
			updateStyle(style, oldCluster, newCluster) {
                let newStyle = style
                oldCluster.forEach((color, index) => {
                    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
                })
                return newStyle
            },

            getCSSString(url, callback, variable) {
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                        callback()
                    }
                }
                xhr.open('GET', url)
                xhr.send()
            },

            getThemeCluster(theme) {
                const tintColor = (color, tint) => {
                    let red = parseInt(color.slice(0, 2), 16)
                    let green = parseInt(color.slice(2, 4), 16)
                    let blue = parseInt(color.slice(4, 6), 16)

                    if (tint === 0) { // when primary color is in its rgb space
                        return [red, green, blue].join(',')
                    } else {
                        red += Math.round(tint * (255 - red))
                        green += Math.round(tint * (255 - green))
                        blue += Math.round(tint * (255 - blue))

                        red = red.toString(16)
                        green = green.toString(16)
                        blue = blue.toString(16)

                        return `#${red}${green}${blue}`
                    }
                }

                const shadeColor = (color, shade) => {
                    let red = parseInt(color.slice(0, 2), 16)
                    let green = parseInt(color.slice(2, 4), 16)
                    let blue = parseInt(color.slice(4, 6), 16)

                    red = Math.round((1 - shade) * red)
                    green = Math.round((1 - shade) * green)
                    blue = Math.round((1 - shade) * blue)

                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)

                    return `#${red}${green}${blue}`
                }

                const clusters = [theme]
                for (let i = 0; i <= 9; i++) {
                    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
                }
                clusters.push(shadeColor(theme, 0.1))
                return clusters
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
		background: #409EFF;
		line-height: 180px;
		text-align: center;
		font-weight: 100;
		font-size: 40px;
		letter-spacing: 15px;
	}
	.el-aside {
		background: #409EFF;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 20px;
	}
	.el-main{
	
	}
	.theme-picker .el-color-picker__trigger {
		vertical-align: middle;
	}
	
	.theme-picker-dropdown .el-color-dropdown__link-btn {
		display: none;
	}
</style >