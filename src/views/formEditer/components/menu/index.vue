<template>
	<el-card class="box-card">
		<el-collapse v-model="activeName" accordion v-for="item in mainMenu" :key="item.id">
			<el-collapse-item class="collapse-title" :title="item.title" :name="item.id">
				<draggable element="div" v-if="item.children" v-model="item.children" :options="dragOptions" @start="onStart"><!--:move="onMove"-->
					<transition-group tag="div">
						<template v-if="item.children" v-for="btn in item.children" >
							<el-button size="mini" :id="btn.id" :data-id="btn.id" :data-name="btn.name" :key="btn.id">{{btn.name}}</el-button>
						</template>
					</transition-group>
				</draggable>
			</el-collapse-item>
		</el-collapse>
	</el-card>
</template>

<script>
import draggable from 'vuedraggable'
import menuList from './draggableMenu'

export default{
	name:"mainMenu",
	components:{
		draggable
	},
	data(){
		return{
			activeName: '2',
			mainMenu:''
		}
	},
	computed: {
		dragOptions () {
      return  {
        animation: 150,
        group: { name: "dragEdit", pull: 'clone', put: false },
        sort:false,
        ghostClass: "collapse-title", 
				chosenClass: "collapse-title",
      };
    }
	},
	created() {
		this.mainMenu = menuList;
		this.activeName = 2;
	},
	methods: {
		onStart(evt){
			let evtName = evt.item.getAttribute('data-name');
			this.$store.commit('currentDragname', evtName);			
		}
	}
}
</script>

<style scoped>
	.collapse-title{
		text-align: center;
	}
</style>