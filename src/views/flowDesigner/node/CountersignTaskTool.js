/**
 * Created by Jacky.Gao on 2017-07-07.
 */
import TaskTool from './TaskTool.js'
import CountersignTaskNode from './CountersignTaskNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class CountersignTaskTool extends TaskTool {
    getType() {
        return '会签任务'
    }
    getIcon() {
        return `<i class="uflo uflo-task-countersign" style="color:#737383"></i>`
    }
    newNode() {
        return new CountersignTaskNode()
    }
    buildTaskBasicConfig(target) {

    }
    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_COUNTERSIGN_CONFIG, target)
    }
}
