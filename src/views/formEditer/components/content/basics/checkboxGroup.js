/**
 * min	可被勾选的 checkbox 的最小数量	number	—	—
	max	可被勾选的 checkbox 的最大数量
 * 
 * 按钮形式
 * */
const item= {
	name:"checkboxGroup",
	allow:null,
	//基本属性
	attributes :{
		formItemlabel:{//表单名称
			desc:'label',
			type:'text',
			value:'label'
		},
		propName:{//字段名称
			desc:'字段名',
			type:'text',
			value:''
		},
		required:{//必填项
			desc:'必填项',
			type:'boolean',
			value:false
		},
		labelWidth:{//
			desc:'label宽度',
			type:'number',
			value:'80'
		},
//		min:{
//			desc:'最少可被勾选',
//			type:'number',
//			value:0
//		},
//		max:{
//			desc:'最多可被勾选',
//			type:'number',
//			value:1
//		},
		value:{//默认值
			desc:'默认值',
			type:'checkboxValue',
			value:''
		},
		options:{//按钮可添加内容
			type:'optionsList',
			items:[
				{value:'选项内容',label:'选项内容'},
				{value:'选项内容1',label:'选项内容1'}
			],
			value:''//
		},
	}
}
export default item