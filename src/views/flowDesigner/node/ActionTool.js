/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseTool from './BaseTool.js'
import ActionNode from './ActionNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class ActionTool extends BaseTool {
    getType() {
        return '动作'
    }
    getIcon() {
        return `<i class="uflo uflo-action" style="color:#737383"></i>`
    }
    newNode() {
        return new ActionNode()
    }
    getConfigs() {
        return {
            in: -1,
            out: -1,
            single: false
        }
    }
    buildActionBean(target) {

    }
    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_ACTION_CONFIG, target)
    }
}
