<template>
	<div>
		<el-row v-if="item.name ==='row'" :gutter="gutter" :style='style'>
			<previewItem v-for="(element,index) in item.children" :key="index"  :item="element"></previewItem>
		</el-row>
		<el-col v-else-if="item.name === 'col'" :span="span" :style='style'>
			<previewItem v-for="(element,index) in item.children" :key="index"  :item="element"></previewItem>
		</el-col>
		<el-form-item v-else :label="label" :label-width="labelWidth" :prop='prop'>
			<!-- Input -->
			<el-input v-if="item.name === 'input'" :placeholder="placeholder" :type="type" v-model="value" ></el-input>
			<!-- RadioGroup -->			
			<el-radio-group v-else-if="item.name === 'radioGroup'" v-model="value">
				<el-radio v-for="(option,key) in item.attributes.options.items" :value="option.label" :key="option.label" :label="option.label">{{option.label}}</el-radio>
			</el-radio-group>
			<!-- CheckboxGroup -->
			<el-checkbox-group v-else-if="item.name === 'checkboxGroup'" v-model="value" >
				<el-checkbox v-for="(option,key) in item.attributes.options.items" :key="option.label" :label="option.label"></el-checkbox>
			</el-checkbox-group>
			<!-- Select -->
			<el-select v-else-if="item.name === 'select'" v-model="value" >
	      <el-option v-for="(option,key) in item.attributes.options.items" :key="option.label" :label="option.label" :value="option.label"></el-option>
	    </el-select>
			<!-- DatePicker -->
			<el-date-picker v-else-if="item.name === 'DatePicker'" type="date" :placeholder="placeholder" v-model="value" ></el-date-picker>
			<!-- TimePicker -->
			<el-time-picker v-else-if="item.name === 'TimePicker'" type="fixed-time" :placeholder="placeholder" v-model="value" ></el-time-picker>
			<!-- InputNumber -->
			<el-input-number v-else-if="item.name === 'inputNumber'" :max="max" :min="min" controls-position="right" v-model="value"></el-input-number >
			<!-- Switch -->
			<el-switch v-else-if="item.name === 'switch'" v-model="value"></el-switch>
		</el-form-item>
	</div>
</template>
<script>
export default {
    name: 'previewItem',
    components: {

    },
    data() {
        return {

        }
    },
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        span() { // 列参数计算
            return this.item.attributes.span ? this.item.attributes.span.value : 1
        },
        offset() {
            return this.item.attributes.offset ? this.item.attributes.offset.value : 0
        },
        push() {
            return this.item.attributes.push ? this.item.attributes.push.value : 0
        },
        pull() {
            return this.item.attributes.offset ? this.item.attributes.span.value : 0
        },
        gutter() {
            return this.item.attributes.gutter ? this.item.attributes.gutter.value : 0
        },
        type() {
            return this.item.attributes.type ? this.item.attributes.type.value : ''
        },
        style() {
            return this.item.attributes.style ? this.item.attributes.style.value : ''
        },
        prop() {
            return this.item.attributes.required.value ? this.item.attributes.propName.value : ''
        },
        placeholder() {
            return this.item.attributes.placeholder ? this.item.attributes.placeholder.value : ''
        },
        label() {
            return this.item.attributes.formItemlabel ? this.item.attributes.formItemlabel.value : ''
        },
        labelWidth() {
            return this.item.attributes.labelWidth ? `${this.item.attributes.labelWidth.value}px` : '0px'
        },
        max() {
            if (this.item.attributes.required.value && this.item.attributes.max.value) { return this.item.attributes.max.value }
            return 100
        },
        min() {
            if (this.item.attributes.required.value && this.item.attributes.min.value) { return this.item.attributes.min.value }
            return 1
        },
        size() {
            return this.item.attributes.size ? this.item.attributes.size.value : ''
        },
        value: {
            get: function() {
                return this.item.attributes.value ? this.item.attributes.value.value : ''
            },
            set: function() {
            }
        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style>
	
</style>