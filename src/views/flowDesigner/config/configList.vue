<template>
	<!--节点基本属性设置列表-->
	<div>
		<!--基本流程设置-->
		<properties v-if='type==="default"'></properties>
		<!--开始节点属性设置-->
		<start-config v-else-if='type==="start"'></start-config>
		<!--动作节点属性设置-->
		<action-config v-else-if='type==="action"'></action-config>
		<!--人工任务节点属性设置-->
		<task-config v-else-if='type==="task"'></task-config>
		<!--会签任务节点属性设置-->
		<countersign-config v-else-if='type==="countersignTask"'></countersign-config>
		<!--动态分支节点属性设置-->
		<foreach-config v-else-if='type==="foreach"'></foreach-config>
		<!--子流程节点属性设置-->
		<subprocess-config v-else-if='type==="subprocess"'></subprocess-config>
		<!--路由决策节点属性设置-->
		<decision-config v-else-if='type==="decision"'></decision-config>
		<!--结束分支节点属性设置-->
		<end-config v-else-if='type==="end"'></end-config>
		<!--结束流程节点属性设置-->
		<end-terminal-config v-else-if='type==="endTerminal"'></end-terminal-config>
		<!--分支节点属性设置-->
		<fork-config v-else-if='type==="fork"'></fork-config>
		<!--聚合节点属性设置-->
		<join-config v-else-if='type==="join"'></join-config>
	</div>
</template>

<script>
	import * as nodeEvent from '../node/NodeProducerEvent.js'
import properties from './properties'
import startConfig from './startConfig'
import actionConfig from './actionConfig'
import taskConfig from './taskConfig'
import countersignConfig from './countersignConfig'
import subprocessConfig from './subprocessConfig'
import foreachConfig from './foreachConfig'
import decisionConfig from './decisionConfig'
import endConfig from './endConfig'
import endTerminalConfig from './endTerminalConfig'
import forkConfig from './forkConfig'
import joinConfig from './joinConfig'

export default {
	    components: {
	        properties,
	        startConfig,
	        actionConfig,
	        taskConfig,
	        countersignConfig,
	        subprocessConfig,
	        foreachConfig,
	        decisionConfig,
	        endConfig,
	        endTerminalConfig,
	        forkConfig,
	        joinConfig
	    },
	    data() {
	        return {
	            type: 'default'
	        }
	    },
	    mounted() {
	        this.init()
    },
	    methods: {
	        init() {
	            this._bindNodeEvent()// 点击操作区域内已添加的节点
	        },
	        _bindNodeEvent() {
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_FLOW_CONFIG, () => {
	                this.type = 'default'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_START_CONFIG, (data) => {
	                this.type = 'start'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_ACTION_CONFIG, (data) => {
	                this.type = 'action'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_TASK_CONFIG, (data) => {
	                this.type = 'task'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_COUNTERSIGN_CONFIG, (data) => {
	                this.type = 'countersignTask'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_FOREACH_CONFIG, (data) => {
	                this.type = 'foreach'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_SUBPROCESS_CONFIG, (data) => {
	                this.type = 'subprocess'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_DECISION_CONFIG, (data) => {
	                this.type = 'decision'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_END_CONFIG, (data) => {
	                this.type = 'end'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_END_TERMINAL_CONFIG, (data) => {
	                this.type = 'endTerminal'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_FORK_CONFIG, (data) => {
	                this.type = 'fork'
	            })
	            nodeEvent.eventEmitter.on(nodeEvent.BUILD_JOIN_CONFIG, (data) => {
	                this.type = 'join'
	            })
	        }
	    }
	}
</script>

<style>
</style>