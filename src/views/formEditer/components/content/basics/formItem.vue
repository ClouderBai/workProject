<template>
	<el-form class="minH">
		<slot></slot>
		<el-form-item :prop="prop" :label="label" :label-width="labelWidth">
			<!-- Input -->
			<el-input v-if="item.name === 'input'" :size="size" :placeholder="placeholder" :type="type" v-model="value"  @input="setValue" ></el-input>
			<!-- RadioGroup -->
			<el-radio-group v-else-if="item.name === 'radioGroup' && attributes.options" v-model="value" >
				<el-radio v-for="(option,key) in attributes.options.items" :value="option.value" :key="option.value" :label="option.value">{{option.value}}</el-radio>
			</el-radio-group>
			<!-- CheckboxGroup -->
			<el-checkbox-group v-else-if="item.name === 'checkboxGroup' && attributes.options" v-model="value">
				<el-checkbox v-for="(option,key) in attributes.options.items" :key="option.value" :label="option.value"></el-checkbox>
			</el-checkbox-group>
			<!-- Select -->
			<el-select v-else-if="item.name === 'select' && attributes.options" v-model="value" :placeholder="item.placeholder"  @input="setValue">
	      <el-option v-for="(option,key) in attributes.options.items" :key="option.value" :label="option.value" :value="option.value"></el-option>
	    </el-select>
			<!-- DatePicker -->
			<el-date-picker v-else-if="item.name === 'datePicker'" type="date" :placeholder="placeholder" v-model="value" @input="setValue"></el-date-picker>
			<!-- TimePicker -->
			<el-time-picker v-else-if="item.name === 'timePicker'" type="fixed-time" :placeholder="placeholder" v-model="value" @input="setValue"></el-time-picker>
			<!-- InputNumber -->
			<el-input-number v-else-if="item.name === 'inputNumber'" :max="max" :min="min" controls-position="right" v-model="value" @change="setValue"></el-input-number >
			<!-- Switch -->
			<el-switch v-else-if="item.name === 'switch'" v-model="value" @change="setValue"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	
export default {
	name: 'formItem',
	components: {
	
	},
	props: {
		item: {
			type: Object
		}
	},
	computed: {
		attributes(){
			return this.item.attributes;
		},
		prop() {
			return this.attributes.required.value ? this.attributes.propName.value : '';
		},
		placeholder() {
			return this.attributes.placeholder ? this.attributes.placeholder.value : ''
		},
		label() {
			return this.attributes.formItemlabel ? this.attributes.formItemlabel.value : ''
		},
		labelWidth(){
			return this.attributes.labelWidth?`${this.attributes.labelWidth.value}px`:'120px';
		},
		type() {
			return this.attributes.type.value;
		},
		max(){
			if(this.attributes.required.value && this.attributes.max.value)
	   	 	return this.attributes.max.value
	   	return 100
	  },
	 	min(){
	 		if(this.attributes.required.value && this.attributes.min.value)
	   	 	return this.attributes.min.value
	   	return 1
	 	},
	 	size(){
			return this.attributes.size ? this.attributes.size.value : ''
	  },
	 	value:{
	 		get: function () {
	      return this.attributes.value ? this.attributes.value.value : ''
	    },
	    set: function () {
	    }
	 	}
	},
	data() {
		return {
			
		}
	},
	created () {
		
 	},
	methods: {
		addData(){
//			if(this.item.fieldType === 'CheckboxGroup'){
//		 		this.checkboxOption = this.item.value;
//		 	}
//		 	if(this.attributes.fieldType === 'Switch'){
//		 		this.switchValue = this.attributes.value;
//		 	}
//		 	this.value = this.attributes.value;
		},
		setValue(val) {
			//预览时用于验证
		}
	}
}
</script>

<style>
.minH{
	min-height: 20px;
}
</style>