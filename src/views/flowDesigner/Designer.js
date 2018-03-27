
import UFLODesigner from './main/UFLODesigner.js'

import * as event from './main/Event.js'
import Node from './main/Node.js'
import StartTool from './node/StartTool.js' // 开始
import EndTool from './node/EndTool.js' // 结束分支
import TaskTool from './node/TaskTool.js' // 人工任务
import ActionTool from './node/ActionTool.js'// 动作
import CountersignTaskTool from './node/CountersignTaskTool.js'// 会签任务
import DecisionTool from './node/DecisionTool.js'// 路由决策
import EndTerminalTool from './node/EndTerminalTool.js'// 结束流程
import ForeachTool from './node/ForeachTool.js'// 动态分支
import ForkTool from './node/ForkTool.js'// 分支
import JoinTool from './node/JoinTool.js'// 聚合
import SubprocessTool from './node/SubprocessTool.js'// 子流程

const nodeTools = [
    { name: '开始', type: 'Start', className: 'StartTool' },
    { name: '结束分支', type: 'End', className: 'EndTool' },
    { name: '人工任务', type: 'Task', className: 'TaskTool' },
    { name: '动作', type: 'Action', className: 'ActionTool' },
    { name: '会签任务', type: 'CountersignTask', className: 'CountersignTaskTool' },
    { name: '路由决策', type: 'Decision', className: 'DecisionTool' },
    { name: '结束流程', type: 'EndTerminal', className: 'EndTerminalTool' },
    { name: '动态分支', type: 'Foreach', className: 'ForeachTool' },
    { name: '分支', type: 'Fork', className: 'ForkTool' },
    { name: '聚合', type: 'Join', className: 'JoinTool' },
    { name: '子流程', type: 'Subprocess', className: 'SubprocessTool' }
]
export default class Designer {
    constructor(container) {
        const designer = new UFLODesigner(container)
        designer.addTool(new StartTool())
        designer.addTool(new EndTool())
        designer.addTool(new TaskTool())
        designer.addTool(new ActionTool())
        designer.addTool(new CountersignTaskTool())
        designer.addTool(new DecisionTool())
        designer.addTool(new EndTerminalTool())
        designer.addTool(new ForeachTool())
        designer.addTool(new ForkTool())
        designer.addTool(new JoinTool())
        designer.addTool(new SubprocessTool())
        designer.nodeTools = nodeTools
        this.context = designer
    }
    /** 点击工具栏 */
    selectTools(type) {
        this.context.buildTools(type)
    }
    /** 点击侧边栏节点 */
    selectNodeTools(type) {
        nodeTools.forEach(element => {
            if (element.type === type) {
                event.eventEmitter.emit(event.TRIGGER_TOOL, element.name)
            }
        })
    }
    /** 更新节点名称   type节点类型  节点或连线 */
    updateNodeName(type, str) {
        this.context.updateNodeName(type, str)
    }

    getDesignerJson() {
        return this.context.toFigures()
    }

    fromJson(json) {
        this.context.fromJson(json)
    }

    getNodeList() {
    	return this.context.context.allFigures
    }
}
