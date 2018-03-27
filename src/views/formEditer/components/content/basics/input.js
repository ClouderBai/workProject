
import {getStringTypeAttr} from '@/views/formEditer/editerUtils'
/***/
export function inputItem(){
	let name = "input";
	let allow = null;
	//基本属性
	let attributes = {
		formItemlabel:{//
			desc:'label',
			type:'text',
			value:'label'
		},
		propName:{//组件字段名称  属于必填项 表单获取数据时使用       ？？？？当前表单不可重复 检测？？？？
			desc:'字段名',
			type:'text',
			value:''
		},
		required:{
			desc:'必填项',
			type:'boolean',
			value:false
		},
		value:{//默认值
			desc:'默认值',
			type:'text',
			value:''
		},
		type:{//组件可选择类型
			desc:'input类型',
			type:'select',
			items:[
				{value:'text',label:'text'},
				{value:'textarea',label:'textarea'},
				{value:'password',label:'password'}],
			value:'text'
		},
		placeholder:{//占位
			desc:'占位符',
			type:'text',
			value:'请输入'
		},
		labelWidth:{//
			desc:'label宽度',
			type:'number',
			value:'80'
		},
//		size:{
//			desc:'输入框尺寸(默认空)',
//			type:'select',
//			items:[
//				{value:'',label:''},
//				{value:'medium',label:'medium'},
//				{value:'small',label:'small'},
//				{value:'mini',label:'mini'}],
//			value:''
//		},  
		min:{
			desc:'最少字符数',
			type:'number',
			value:'0'
		},
		max:{
			desc:'最多输入字符数',
			type:'number',
			value:500
		},
		
	};
	let strLabel = attributes.formItemlabel.value;
	let strAttr = getStringTypeAttr(attributes);
//	let template=`<el-input ${strAttr}></el-input>`
	let template = strAttr;//`<el-form-item label="${strLabel}"><el-input ${strAttr}></el-input></el-form-item>`

	let item = {"name":name,'attributes':attributes,'allow':allow}
	return item
}