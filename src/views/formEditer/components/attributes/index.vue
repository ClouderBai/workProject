<template>
	<div>
		<form-config></form-config>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{name}}</span>
			</div>
			<div class="text item" :attributes="attributes">
				<template v-if="attributes" v-for="(v,k,i) in attributes">
					<attributes-config :attributes="v" :id="k" :name="name"></attributes-config>
				</template>
			</div>
		</el-card>
	</div>
</template>

<script>
import formConfig from './formConfig'	
import attributesConfig from './attributesConfig'

export default{
	name:"config",
	components:{
		formConfig,
		attributesConfig
	},
	data(){
		return{
			name:'属性设置',
		}
	},
	props: {
	  model: {
	    type: Object
	  }
	},
	computed: {
		currentComponent(){
			return JSON.parse(JSON.stringify(this.$store.state.formEditer.currentComponent));
		},
    attributes(){
    	this.name = (this.currentComponent.id?this.currentComponent.id:'')+(this.currentComponent.name?this.currentComponent.name+'属性设置':'属性设置');
    	return this.currentComponent.attributes?JSON.parse(JSON.stringify(this.currentComponent.attributes)):{};
    }
 	},
 	created() {
		
	},
	methods:{
		
	}
}


</script>

<style>
	.config-wrapper{
    width:300px;
    font-size: 14px;
	}
</style>