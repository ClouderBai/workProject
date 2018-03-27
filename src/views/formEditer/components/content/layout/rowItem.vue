<template>
	<div class="minH">
		<el-row :gutter="gutter" :style="style">
			<slot></slot>
		</el-row>
	</div>
</template>

<script>
	
export default {
	name: 'rowItem',
	components: {
	
	},
	props: {
		item: {
			type: Object
		}
	},
	computed: {
		gutter() {
			return this.item.attributes.gutter?this.item.attributes.gutter.value : 0;
		},
		style(){
			return this.item.attributes.style?this.item.attributes.style.value : '';
		},
	},
	created () {
		
  },
	data() {
		return {
			
		}
	},
	methods: {
		setValue(val) {
			
		}
	}
}
</script>

<style>
.minH{
	min-height: 20px;
}
</style>