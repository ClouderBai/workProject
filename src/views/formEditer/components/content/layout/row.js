/**
 * 参数	                  说明	           							类型				可选值	                                           	 默认值
 * gutter			栅格间隔											number			—																									0
 * */	
const item= {
	name:"row",
	type:"row",
	choose:false,
	children:[],
	//可放置的组件id
	allow:['col'],
	//基本属性
	attributes :{
		gutter:{//number
			desc:"栅格间隔",
			type:'col-number',
			value:0
		},
		style:{
      type: 'text',
      value: '',
      desc: 'style'
	  }
	},
	render:function(createElement){
		
	}
}
export default item