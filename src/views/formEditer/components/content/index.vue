<template>
	<div ref="editform">
		<drop-item :item="mainItem"></drop-item>
	</div>
</template>

<script>
	import dropItem from './dropItem'

	export default {
		name: "editForm",
		components: {
			dropItem
		},
		data() {
			return {
				mainItem:{name:'main'}
			}
		},
		computed: {
			
		},
		created() {

		},
		methods: {
			
		}
	}
</script>

<style>	
	
</style>