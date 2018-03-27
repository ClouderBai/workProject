<template>
	<el-form ref="optionValidateForm" class="demo-dynamic" :model="optionA">
			<el-form-item :inline="true" v-for="(option, index) in optionArr" :key="index">
				<el-input type="text" v-model="option.value" size="mini"> <!---->
					<el-button slot="append" icon="el-icon-delete" @click.prevent="removeOption(option)"></el-button>
				</el-input>
			</el-form-item>
			<el-form-item>
		    <el-button size="mini" @click="addOption">添加</el-button>
		    <el-button type="primary" size="mini" @click="saveOptions">保存</el-button>
		  </el-form-item>
		</el-form>
</template>

<script>
import {deepCopy} from '@/views/formEditer/editerUtils'

export default{
	name:"setOption",
	data(){
		return{
			optionArr:[]
		}
	},
	props: {
    options: {
      type: Object,
      default: []
    }
 	},
 	computed: {
    optionA () {
    	this.optionArr = this.options.items;
    	return this.options;
    }
 	},
	methods:{
		saveOptions(){//更新属性
			this.options.items = deepCopy(this.optionArr);
			this.$emit('update', this.options)
		},
		removeOption(item) {
			if(this.optionArr.length <= 1){
				this.$message.error('不能删除，至少存在一个选项');
				return;
			}
			var index = this.optionArr.indexOf(item)
			if(index !== -1) {
				this.optionArr.splice(index, 1)
			}
		},
		addOption() {
			let id = this.optionArr.length;
			this.optionArr.push({value:'选项内容'+id,label:'选项内容'+id});
		}
	}
}
</script>

<style>
</style>