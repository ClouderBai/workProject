/***/
const item= {
	name:"switch",
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
			desc:'必选项',
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
			type:'boolean',
			value:false
		}
	}
}
export default item