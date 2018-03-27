<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix p10">
			<span>表单信息</span>
		</div>
		<div class="text item">
			<el-form label-width="80px" class="demo-ruleForm">
				<el-form-item v-if='(currentForm.code==undefined?false:true)' class="margin-b0" label="表单编号">
					<el-input type="text" size="mini" :disabled="true" v-model="currentForm.code"></el-input>
				</el-form-item>
				<el-form-item v-if='(currentForm.createUserName==undefined?false:true)' class="margin-b0" label="创建人">
					<el-input type="text" size="mini" :disabled="true" v-model="currentForm.createUserName"></el-input>
				</el-form-item>
				<el-form-item class="margin-b0" label="表单名称">
					<el-input type="text" size="mini" v-model="currentForm.name" @input="updateFormName"></el-input>
				</el-form-item>
				<el-form-item class="margin-b0" label="表单描述">
					<el-input type="textarea" size="mini" v-model="currentForm.remark" @input="updateFormDesc"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</el-card>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	computed: {
		currentForm(){
			return this.$store.state.formEditer.currentForm;
		}
 	},
	methods:{
		updateFormName(val){
			this.currentForm.name = val;
			this.updateForm();
		},
		updateFormDesc(val){
			this.currentForm.remark = val;
			this.updateForm();
		},
		updateForm(){
			this.$store.commit('currentForm',{data:this.currentForm});
		}
	}
}


</script>

<style scoped>
	.margin-b0{
		margin-bottom:0;
	}
	.p10{
		padding:10px;
	}
</style>