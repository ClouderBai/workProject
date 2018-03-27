/**
 * Created by jacky on 2016/7/18.
 */
import BaseTool from './BaseTool.js'
import StartNode from './StartNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class StartTool extends BaseTool {
    getType() {
        return '开始'
    }
    getIcon() {
        return `<i class="uflo uflo-start" style="color:#737383"></i>`
    }
    newNode() {
        return new StartNode()
    }
    getConfigs() {
        return {
            in: 0,
            out: 1,
            single: true
        }
    }
    buildTaskConfig(target) {

    }

    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_START_CONFIG, target)
    }
}
