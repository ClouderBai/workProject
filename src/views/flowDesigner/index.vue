<template>
	<el-row>
		<el-col :span="1">
			<div id="nodeTool" style="padding-top:50px ;">
				<!--初始化根据设置显示可拖拽节点-->
				<div><el-button size="mini" @click="buildNodeTools('Start')">开</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Task')">人</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Action')">动</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('CountersignTask')">会</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Decision')">路</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('EndTerminal')">结</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('End')">结</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Foreach')">动</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Fork')">分</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Join')">聚</el-button></div>
				<div><el-button size="mini" @click="buildNodeTools('Subprocess')">子</el-button></div>
			</div>
		</el-col>
		<el-col :span="16">
			<div id="toolbar">
				<el-button-group>
                    <el-button size="mini" icon="" @click="create()">新建</el-button>
                    <el-button size="mini" icon="" @click="open()">打开</el-button>
					<el-button size="mini" icon="" @click="save()">保存</el-button>
					<el-button size="mini" icon="" @click="selectTool('select')">选择</el-button>
					<el-button size="mini" icon="" @click="selectTool('connection')">连线</el-button>
					<el-button size="mini" icon="" @click="selectTool('undo')">重做</el-button>
					<el-button size="mini" icon="" @click="selectTool('redo')">撤消</el-button>
					<el-button size="mini" icon="" @click="selectTool('snap')">网格</el-button>
					<el-button size="mini" icon="" @click="selectTool('remove')">删除</el-button>
				</el-button-group>
			</div>
			<div id="container" style='height: 750p'>
				<div id="snapContainer" class="fd-canvas-container" style='height: 750px;'></div>
			</div>
		</el-col>
		<el-col :span="7">
			<div>
				<flow-property></flow-property>
			</div>
		</el-col>
        <template>
            <!-- 模态框↓  -->
            <human-task-dialog ref="humanTaskDig"></human-task-dialog>
            <countersign-task-dialog ref="countersignTaskDig"></countersign-task-dialog>
        </template>
	</el-row>
</template>

<script>
import flowProperty from './config/flowProperty'

import * as event from './main/Event.js'
import Designer from './Designer.js'
import TempData from './process.js'

import * as nodeEvent from './node/NodeProducerEvent.js'
import humanTaskDialog from '@/components/Dialog/FlowDesigner/HumanTask/index' // 人工任务弹窗
import countersignTaskDialog from '@/components/Dialog/FlowDesigner/CountersignTask/index' // 会签任务弹窗

import HumanTask from '@/model/flow/HumanTask' // 人工任务类

export default {
    components: {
        humanTaskDialog,
        countersignTaskDialog,
        flowProperty
    },
    data() {
        return {
            designer: {}
        }
    },
    computed: {

    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const container = document.getElementById('snapContainer')
            // canvasContainer = document.getElementById('snapContainer')
            this.designer = new Designer(container)
            /** 添加监听*/
            this._bindErrorEvent() // 错误提示
        },
        create() {
            this.init()
        },
        open() {
            console.log(this.designer.getNodeList().length)//
            this.init()
            this.designer.fromJson(TempData.data)
        },
        save() {
            console.log(this.designer.getDesignerJson())
        },
        buildNodeTools(type) {
            this.designer.selectNodeTools(type)
        },
        selectTool(type) {
            this.designer.selectTools(type)
        },
        _bindErrorEvent() { // 监听错误信息
            event.eventEmitter.on(event.OPERATION_ERROR, target => {
                console.log(target)
                this.$message.error(target.mesg)
            })
        }
    },
    created() {
        nodeEvent.eventEmitter.on(nodeEvent.BUILD_TASK_CONFIG, target => {
            const flowData = new HumanTask()
            flowData.uuid = target.uuid
            this.$nextTick(() => {
                this.$store.commit('appendNode', flowData)
                this.$refs.humanTaskDig.open({ uuid: target.uuid })
            })
        })
        // nodeEvent.eventEmitter.on(nodeEvent.BUILD_COUNTERSIGN_CONFIG, target => {
        //     this.$nextTick(() => {
        //     flowData.countersignTask.uuid = target.uuid
        //         this.$store.commit('appendNode', flowData.countersignTask)
        //         this.$refs.countersignTaskDig.open()
        //     })
        // })
    }
}
</script>

<style>
	.fd-canvas-container{
        border: solid 1px #eee;
        background-color: #ffffff;
	}
	.hassnaptogrid{
        background-image: url("./svg/grid-bg.png");
    }
	.nosnaptogrid{
	    background-image: none;
	}
</style>