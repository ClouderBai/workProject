<template>
	<!--当前组件可以选择和删除-->
	<div @click.stop="onChoose(item)">
			<!--
					item.name  当前组件的类型名称 
					item.id  当前组件随机生成的id
					item.children   组件内的子组件列表
			-->
		<div v-if="item.name ==='main'">
			<draggable element="div" class="list-group" :options="dragEditOptions" @add.stop="onAddchild($event,0)">
				<transition-group name="no" class="list-group" tag="div" id="mainEditer">
					<drop-item v-if="hackReset" v-for="(element,index) in componentList" :key="index" :item="element" :name="element.id"></drop-item>
				</transition-group>
			</draggable>			
		</div>
		<rowItem class="drop-item" :id="item.id" :item="item" v-else-if="item.name ==='row'">
			<span><i class="el-icon-delete" @click.stop="onDelete(item.id)"></i>{{item.name}}-{{item.id}}</span>
			<draggable element="div" :options="dragEditOptions" @add.stop="onAddchild($event,item.id)" :disabled="disabled">
				<transition-group name="no" class="drop-div" tag="div" :id="'child'+item.id">
					<drop-item v-if="hackReset" v-for="(element,index) in item.children" :key="index"  :item="element" :name="element.id"></drop-item>
				</transition-group><!--v-if="(item.children&&item.children.length>0)?true:false" -->
			</draggable>
		</rowItem>
		<colItem :id="item.id" :item="item" v-else-if="item.name === 'col'">
			<span><i class="el-icon-delete" @click.stop="onDelete(item.id)"></i>{{item.name}}-{{item.id}}</span>
			<draggable element="div" :options="dragEditOptions" @add.stop="onAddchild($event,item.id)" :disabled="disabled">
				<transition-group name="no" class="drop-div" tag="div" :id="'child'+item.id">
					<drop-item v-if="hackReset" v-for="(element,index) in item.children" :key="index"  :item="element" :name="element.id"></drop-item>
				</transition-group>
			</draggable>
		</colItem>
		<formItem class="drop-item" :id="item.id"  v-else :item="item" :name="item.name">
			<span><i class="el-icon-delete" @click.stop="onDelete(item.id)"></i>{{item.name}}-{{item.id}}</span>
		</formItem>
	</div>
</template>
<script>
	import draggable from 'vuedraggable'
	import rowItem from './layout/rowItem'
	import colItem from './layout/colItem'
	import formItem from './basics/formItem'
	import {getElement, delComponent,getFieldState,updateFieldlist} from '@/views/formEditer/editerUtils'

	export default {
		name: "dropItem",
		components: {
			draggable,
			rowItem,
			colItem,
			formItem
		},
		data() {
			return {
				disabled:false
			}
		},
		props: {
			item: {
				type: Object
			}
		},
		computed: {
			dragEditOptions() {//可拖拽区域基本设置
				return {
					animation: 150,
					group: { name: "dragEdit", pull: false, put: this.changeOption()},
					scrollSensitivity: 10,
					sort: false,
					disabled: false
				};
			},
			componentList() {
				return this.$store.state.formEditer.componentList;
			},
			currentComponent(){
				return this.$store.state.formEditer.currentComponent;
			},
			currentDragname() {
				return this.$store.state.formEditer.currentDragname;
			},
			hackReset(){
				return this.$store.state.formEditer.hackReset;
			},
			formFields(){
				return this.$store.state.formEditer.formFields;
			}
		},
		created() {
			
		},
		methods: {
			changeOption(){//设置区域是否可以放置
				if(this.item.name == 'main' && this.currentDragname != 'col')
					return true;
				if(this.currentDragname === this.item.name)
					return false;
				if(this.item.allow == null)// null 表示不能在里面放置其他组件
					return false;
				if(this.item.allow.length == 0)//[]  表示可以放置任何组件
					return true;
				if(this.item.allow.includes(this.currentDragname))//allow内包含当前拖拽的组件  则可以放置
					return true;
				return false;
			},
			onChoose(currentItem) {
				if(!currentItem.id) return; 
	 			let prevItem = JSON.parse(JSON.stringify(this.currentComponent));
				let prevID = prevItem.id? prevItem.id : '';
				if(currentItem.id != prevID){
					if(!this.checkOperation()) return;
					this.$store.commit('currentComponent', currentItem);
					this.$nextTick(() => {
					  if(prevID!=''){
							document.getElementById(prevItem.id).style.background = '#ffffff';
						}
						document.getElementById(currentItem.id).style.background = '#f0f8ff';
					})
				}
				console.log(currentItem,"当前编辑id",currentItem.id," 前一个编辑id",prevID)
			},
			onAddchild(evt,pid) { // pid 父组件id
				//添加之前先判断当前编辑对象是否添加了字段名
				if(!this.checkOperation()) return;
				//当前需要放置对象
				let component = getElement(this.currentDragname);
				let componentInfo = {
					parentId:pid,
					addItem:component,
					parentList: this.componentList,
					newIndex :evt.newIndex
				}
				this.$store.dispatch('addComponent',componentInfo);
				this.$forceUpdate();
				this.onChoose(component);
			},
			onDelete(id) {
				//删除操作之前判断当前编辑组件是否设置了字段名   如删除的为当前操作的 则不判断？
				if(id != this.currentComponent.id)
					if(!this.checkOperation()) return;
				let item = delComponent(id,this.componentList);
				this.$store.commit('componentList',{data:item});
				this.$store.commit('currentComponent', {});
				this.$store.commit('hackReset',false);
				this.$store.commit('formFields',updateFieldlist(this.componentList));
				this.$nextTick(() => {
				  this.$store.commit('hackReset',true);
				})
				
			},
			checkOperation(){
				let fieldState = getFieldState(this.formFields,this.currentComponent);
				if(fieldState === 'EMPTY'){
					this.$message.error('属性设置字段名不能为空，请填写字段名后继续操作！');
					return false;
				}
				if(fieldState === 'REPEAT'){
					this.$message.error('属性设置字段名不能重复，请重新填写字段名后继续操作！');
					return false;
				}
				return true;
			}
		}
	}
</script>

<style scoped>
	.drop-div {
		width: auto;
		padding: 10px;
	}
	.drop-item {
		min-height: 40px;
		transition: box-shadow .2s linear;
		padding: 10px;
		border: 1px dashed #1482F0;
	}
	.drop-item span{
		color: #cccccc;
	}
	.drop-item i {
		-webkit-transition: opacity .2s;
		transition: opacity .2s;
		opacity: 0;
		display: inline-block;
		cursor: pointer;
		color: #c00;
		font-size: 20px;
	}
	.drop-item:hover i {
		opacity: 1;
	}
	.list-group {
		display: block;
		min-width: 300px;
		min-height: 1000px;
		width: 100%;
		height: 100%;
	}
</style>