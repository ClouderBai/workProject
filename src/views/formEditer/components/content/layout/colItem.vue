<template>
	<el-col class="drop-item" :span="span" :offset="offset" :push='push' :pull='pull'>
			<slot></slot>
	</el-col>
</template>

<script>
	
export default {
	name: 'colItem',
	components: {

	},
	props: {
		item: {
			type: Object
		}
	},
	computed: {
		span() { //列参数计算
			return this.item.attributes.span ? this.item.attributes.span.value : 1;
		},
		offset() { 
			return this.item.attributes.offset ? this.item.attributes.offset.value : 0;
		},
		push() { 
			return this.item.attributes.push ? this.item.attributes.push.value : 0;
		},
		pull() { 
			return this.item.attributes.offset ? this.item.attributes.span.value : 0;
		}
	},
	created() {

	},
	data() {
		return {

		}
	},
	methods: {
		setValue(val) {

		}
	}
}</script>

<style>
	.drop-item {
		min-height: 40px;
		transition: box-shadow .2s linear;
		padding: 10px;
		border: 1px dashed #1482F0;
	}
</style>