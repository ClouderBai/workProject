<template>
	<div class="text item">
		<el-form label-width="80px" class="demo-ruleForm">
			<el-form-item :label="itemLabel">
				<!--文本型（text）属性--> 
				<el-input v-if="attr.type==='text'" type="text" v-model="value" size="mini"  @input="updateAttribute"></el-input>
				<!--数字型（number）属性--> 
				<el-input-number v-if="attr.type==='number'"  v-model="value" size="mini" :min="0" controls-position="right" @change="updateAttribute"></el-input-number>
				<!--数字型（colnumber）属性   列属性 设置   最大值24 最小值为1  --> 
				<el-input-number v-if="attr.type==='col-number'"  v-model="value" size="mini" :min="0" :max="24" @change="updateAttribute"></el-input-number>
				<!--开关（boolean）属性-->   
				<el-switch v-if="attr.type==='boolean'" v-model="value" size="mini" @change="updateAttribute"></el-switch>
				<!--选择型 (selection) 属性-->  
				<el-select v-if="attr.type==='select'"  v-model="value" size="mini" @input="updateAttribute">
					<el-option v-for="(item,index) in attr.items" :key="item.label" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<!--参数可添加 (optionsList) 属性-->  
				<template v-if="attr.type==='optionsList'">
					<span style="color: #FF0000;">注:添加删除选项后需点击保存</span>
					<setoption v-model="attr.items" :options="attr" @update="updateAttribute"></setoption>
				</template>
				<!--radiValue  根据添加的属性选择设置默认值-->
				<template v-if="attr.type==='radiValue'">
					<el-select v-model="value" clearable placeholder="设置默认值" size="mini" @clear="changeAttribute" @change="changeAttribute">
				    <el-option v-for="option in defaultOption.items" :key="option.value" :label="option.label" :value="option.value">
				    </el-option>
				  </el-select>
				</template>
				<!--checkboxValue  根据添加的属性选择设置默认值-->
				<template v-if="attr.type==='checkboxValue'">
					<el-select v-model="value" multiple placeholder="设置默认值" size="mini" @change="changeAttribute">
				    <el-option v-for="option in defaultOption.items" :key="option.value" :label="option.label" :value="option.value">
				    </el-option>
				  </el-select>
				</template>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import setoption from './setOption'	
export default{
	name:"attributesConfig",
	data(){
		return{
			value:"",
			optionValue:""
		}
	},
	components:{
		setoption
	},
	props: {
    attributes: {
      type: Object,
      default: null
    },
    id:{
    	type:String,
    	default: ''
    },
    name:{
    	type:String,
    	default: ''
    }
  },
  computed: {
  	itemLabel(){
    	return this.attributes.desc?this.attributes.desc:this.id;
   	},
    attr(){
    	this.value = this.attributes.value?this.attributes.value:'';
    	return this.attributes;
    },
    currentComponent(){
			return this.$store.state.formEditer.currentComponent
		},
    defaultOption(){
    	let currentOption = JSON.parse(JSON.stringify(this.currentComponent)).attributes.options;
    	return currentOption;
    },
		formFields(){
			return this.$store.state.formEditer.formFields;
		}
  },
	methods:{
		updateAttribute(val){//更新属性
			this.$store.commit('updateCurrentAttr', {name:this.id,value:val});
			let isNew = true;
			if(this.id === 'propName'){//修改的为字段名称   更新
				if(val === ''){
					this.$message.error('属性设置字段名不能为空，请填写字段名后继续操作！');
					return;
				}
				for(let i = 0;i < this.formFields.length; i++){
					if(this.formFields[i].id !== this.currentComponent.id && this.formFields[i].value === val){
						this.$message.error('属性设置字段名不能重复，请重新填写字段名后继续操作！');
						return;
					}
				}
				for(let i = 0;i < this.formFields.length; i++){
					if(this.formFields[i].id === this.currentComponent.id){
						this.formFields[i].value = val;
						isNew = false;
						return;
					}
				}
				if(isNew){
					this.formFields.push({id:this.currentComponent.id,value:val})
				}
				this.$store.commit('formFields', this.formFields);	
			}
		},
		changeAttribute(val){
			this.defaultOption.value = val;
			this.$store.commit('updateCurrentAttr', {name:'options',value:this.defaultOption});
			this.updateAttribute(val);
		}
	}
}


</script>

<style scoped>
	.el-form-item{
		margin-bottom: 10px;
	}
</style>