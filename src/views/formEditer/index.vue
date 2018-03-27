<template>
	<div>
		<el-row class='min-H800'>
			<el-col :span='4'>
				<draggable-menu></draggable-menu>
			</el-col>
			<el-col :span='15'>
				<edit-content ref="content"></edit-content>
			</el-col>
			<el-col :span='5'>
				<attributes :model="formModel"></attributes>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import _ from 'underscore'
	import draggableMenu from './components/menu'
	import editContent from './components/content'
	import attributes from './components/attributes'
	import { CurrentForm, getFieldState } from '@/views/formEditer/editerUtils'
	
	export default {
	    name: 'formEditer',
	    components: {
	        draggableMenu,
	        editContent,
	        attributes
	    },
	    data() {
	        return {
	            formModel: {} // 初始化表数据
	        }
	    },
	    computed: {
	        currentForm() {
	            console.log(this.$store.state.formEditer.currentForm, 'this.$store.state.formEditer.currentForm')
	            return this.$store.state.formEditer.currentForm
	        },
	        originalForm() {
	            return this.$store.state.formEditer.originalForm; formFields
	        },
	        formFields() {
	            return this.$store.state.formEditer.formFields
	        },
	        currentComponent() {
	            return this.$store.state.formEditer.currentComponent
	        },
	        componentList() {
	            return this.$store.state.formEditer.componentList
	        }
	    },
	    mounted() {
	
	    },
	    methods: {
	        init(data) { // 初始化编辑器内容
	            if (data.id) {
	                this.$store.commit('currentForm', { data: data })
	                this.$store.commit('originalForm', data)
	            } else {
	                this.$store.commit('currentForm', { data: { id: 0, layout: [] }})
	                this.$store.commit('originalForm', {})
	            }
	            this.$store.commit('currentComponent', {})
	            this.formModel = data
	            console.log(this.currentForm, '    currentForm')
	        },
	        save() {
	            if (!this.checkOperation()) return false// 字段名
	            // 判断表单是否被修改 true未修改
	            const changed = _.isEqual(this.originalForm, this.currentForm)
	            const errorCount = []
	            if (!changed) {
	                this.currentForm.name ? '' : errorCount.push('表单名称')
	                this.currentForm.remark ? '' : errorCount.push('表单描述')
	                if (errorCount.length > 0) {
	                    this.$message.error(errorCount.toString() + '不能为空，请填写字段名后继续操作！')
	                    return false
	                }
	                // 判断发布表单内容是否为空   确定继续发布   取消放弃发布
	                if (this.componentList.length == 0) {
	                    this.$confirm('当前表单内容为空，不建议发布, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          center: true
		       	}).then(() => {
		        	console.log('表单内容为空发布，返回列表页')
		        	        return true
	                    }).catch(() => {
		                    return false
	                    })
	                } else {
	                    console.log('发布，返回列表页', this.currentForm)
	                    return true
	                }
	            } else {
	                this.$message('未修改，不需要发布！')
	                return false
	            }
	            return false
	        },
	        checkOperation() {
	            const fieldState = getFieldState(this.formFields, this.currentComponent)
	            if (fieldState === 'EMPTY') {
	                this.$message.error('属性设置字段名不能为空，请填写字段名后继续操作！')
	                return false
	            }
	            if (fieldState === 'REPEAT') {
	                this.$message.error('属性设置字段名不能重复，请重新填写字段名后继续操作！')
	                return false
	            }
	            return true
	        },
	        getFormdata() {
	            console.log('this.currentForm')
	            return this.currentForm
	        }
	    }
	}
</script>

<style>
	.min-H800{
		min-height: 800px;
	}	
</style>