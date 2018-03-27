/**
 * 参数	说明	类型	可选值	默认值
 * span	栅格占据的列数	number	—	24
 * offset	栅格左侧的间隔格数	number	—	0
 * push	栅格向右移动格数	number	—	0
 * pull	栅格向左移动格数	number	—	0
 * xs	<768px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
 * sm	≥768px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
 * md	≥992px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
 * lg	≥1200px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
 * xl	≥1920px 响应式栅格数或者栅格属性对象	number/object (例如： {span: 4, offset: 4})	—	—
 * 
 * */
const item= {
	name:"col",
	type:"col",
	allow:[],
	//基本属性
	attributes:{
		span:{
			desc:'栅格占据的列数',
			type:'col-number',
			value:12
		},
//		offset:{
//			desc:'栅格左侧的间隔格数',
//			type:'col-number',
//			value:0
//		},
//		push:{
//			desc:'栅格向右移动格数',
//			type:'col-number',
//			value:0
//		},
//		pull:{
//			desc:'栅格向左移动格数',
//			type:'col-number',
//			value:0
//		},
//		style:{
//    type: 'text',
//    value: '',
//    desc: ''
//	 }
	},
	render:function(createElement){
		
	}
}
export default item