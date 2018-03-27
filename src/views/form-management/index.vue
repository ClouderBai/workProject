<template>
	<el-card class="box-card">
		<el-form :inline="true" :model="searchFormData" @submit.native.prevent class="demo-form-inline">
		  <el-form-item label="编号：">
		    <el-input v-model="searchFormData.code" size="mini" @change="changeCode" placeholder="请输入编号搜索" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="表单名称:">
		    <el-input v-model="searchFormData.name" size="mini" @change="changeName" placeholder="请输入表单名称搜索" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" size="mini" @click="searchForm">查询</el-button>
		  </el-form-item>
		</el-form>
		<!--顶部   新建   设计  删除   启用/未启用   预览--->
		<div class="top-div">
			<el-button type="text" icon="el-icon-edit-outline" @click="createForm">新建</el-button>
			<template v-if="selectItem">
				<el-button type="text" icon="el-icon-edit" @click="editForm">设计</el-button>
				<el-button v-if="!enabled" type="text" icon="el-icon-circle-check-outline" @click="setEnableForm">启用</el-button>
				<el-button v-else type="text" icon="el-icon-circle-close-outline" @click="setEnableForm">停用</el-button>
				<el-button type="text" icon="el-icon-view" @click="previewForm">预览</el-button>
				<el-button type="text" icon="el-icon-delete" @click="deleteForm">删除</el-button>
			</template>
		</div>
		<!--表单列表-->
	  <form-list-table ref="formList" @selectForm="handleSelectForm"></form-list-table>
	  <!--预览-->
		<preview-form ref="preview" :isEditer='false' :formData="selectIteminfo"></preview-form>
	</el-card>
</template>

<script>
import formListTable from './listTable'
import previewForm from '@/components/Dialog/FormPreview'
import {openForm,deleteForm,switchEnable} from '@/api/workFlowForm'
	
export default {
	name:"formManagement",
	components: {
		formListTable,
		previewForm
	},
	data() {
		return {
			selectItem:false,//选择了某个表单
			enabled:false,//表单状态是否为启用
			selectIteminfo:{},//当前选择表单信息
			currentForm:{},//当前选择表单详细信息
			searchFormData:{//查询   编码或表名
				code:'',
				name:''
			},
		}
	},
	computed: {
		
	},
	mounted() {
		
	},
	methods: {
		handleSelectForm(data){//获取当前选择的表单数据
			if(data != null){
				this.selectItem = true;
				this.enabled = data.enabled;
				this.selectIteminfo = data;
			}else{
				this.selectItem = false;
				this.selectIteminfo = {};
			}
		},
		searchForm(){//查询  根据编号  表单名
			console.log('查询条件：code',this.searchFormData.code,' name： ',this.searchFormData.name)
			if(this.searchFormData.code == '' && this.searchFormData.name == ''){
				this.$message({message: '请输入搜索条件',type: 'warning'});
				return
			}
			this.$refs['formList'].searchList(this.searchFormData);
		},
		changeCode(val){
			this.searchFormData.code = val;
			this.$refs['formList'].searchList(this.searchFormData);
		},
		changeName(val){
			this.searchFormData.name = val;
			this.$refs['formList'].searchList(this.searchFormData);
		},
		createForm(){//新建表单
			this.$router.push({ name: 'formEditer',params:{ formId : 0 } });
		},
		editForm(){//编辑表单
			if(this.enabled){
				this.$confirm('只有未启用的表单才能编辑（必须停用表单才能编辑），停用表单后，功能、工作流将不能使用', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
       	}).catch(() => {
          
        });
			}else{
				this.getForm('EDIT');
			}
		},
		previewForm(){//预览
			this.getForm('PREVIEW');
		},
		setEnableForm(){//设置是否启用当前表
			try {
				this.enabled = !this.enabled;
				const params = {
					id:this.selectIteminfo.id,
					enabled:this.enabled
				}		
				switchEnable(params).then(res =>{ 
					this.selectIteminfo.enabled = this.enabled;
				})	
			} catch(error) {
				this.$message.error('获取列表失败')
			}
		},
		getForm(type){
			try {
				const params = {
					id:this.selectIteminfo.id
				}		
				openForm(params).then(res =>{ 
					this.currentForm = res;
					if(type === 'EDIT'){
						this.$router.push({ name: 'formEditer',params:{ formId : this.selectIteminfo.id, formData: res} });
					}
					if(type === 'PREVIEW'){
						this.$refs['preview'].open(this.currentForm);
					}
				});
			} catch(error) {
				this.$message.error(error.message)
			}
		},
		async deleteForm(){//删除
			try {
				const params = {
					id:this.selectIteminfo.id
				}		
				await deleteForm(params).then(res =>{ 
					this.$message({type: 'success',message: '删除成功!'});
					this.$refs['formList'].updateFormList();
				});
			} catch(error) {
				this.$message.error(error.message)
			}
		},
	}
}
</script>
<style>
	.top-div{
		background: #f1f1f1;
		padding: 0px 20px;
	}
	.search-label{
		text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	}
	.search-content{
		line-height: 40px;
    position: relative;
    font-size: 14px;
    display: inline-block;
	}
	.el-table th>.cell{
		text-align: center;
	}
	.el-table td{
		padding: 0;
	}
</style>