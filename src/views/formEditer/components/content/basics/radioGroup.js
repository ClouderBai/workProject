import radioItem from './radioGroup'
/***/
const item= {
	name:"radioGroup",
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
		value:{//默认值
			desc:'默认值',
			type:'radiValue',
			value:''
		},
		options:{//按钮可添加内容
			type:'optionsList',
			items:[
				{value:'选项内容',label:'选项内容'},
				{value:'选项内容1',label:'选项内容1'}
			],
			value:''
		},
		
	}
}
export default item