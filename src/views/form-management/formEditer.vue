<template>
	<div class="">
		<div style="text-align: center;">
			<el-button-group>
				<el-button type="primary" size="mini" icon="el-icon-view" @click="preview">预览</el-button>
				<el-button type="primary" size="mini" icon="el-icon-share" @click="save">发布</el-button>
			</el-button-group>
		</div>
		<!--表单编辑-->
		<form-editer ref='formediter'></form-editer>
		<!--预览窗口-->
		<preview ref="preview" :isEditer="true" :formData="formData"></preview>
		<!--发布窗口-->
		<release ref='release' :model="formData"></release>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import formEditer from '../formEditer'
	import preview from '@/components/Dialog/FormPreview'
	import release from '@/components/Dialog/FormRelease'

	export default {
		name: "editer",
		components: {
			draggable,
			formEditer,
			preview,
			release
		},
		data() {
			return {
				formData:{}
			}
		},
		computed: {
			
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){//初始化进入编辑页 
				if(this.$route.params.formId > 0){
					this.formData = this.$route.params.formData;
					this.formData.layout = JSON.parse(this.formData.layout);
				}else{
					this.formData = {};
				}
				this.$refs['formediter'].init(this.formData);
			},
			save(){//保存 发布
				if(this.$refs['formediter'].save()){
					//获取编辑页面全部数据
					let formData = this.$refs['formediter'].getFormdata();
					this.$refs['release'].open(formData);
				}
			},
			preview(){//预览
				this.formData = this.$refs['formediter'].getFormdata();
				this.$refs['preview'].open(this.formData);
			},
			
		},
	}
</script>

<style>
	
</style>