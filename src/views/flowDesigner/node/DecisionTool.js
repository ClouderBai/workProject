/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseTool from './BaseTool.js'
import DecisionNode from './DecisionNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class DecisionTool extends BaseTool {
    getType() {
        return '路由决策'
    }
    getIcon() {
        return `<i class="uflo uflo-decision" style="color:#737383"></i>`
    }
    newNode() {
        return new DecisionNode()
    }
    getConfigs() {
        return {
            in: -1,
            out: -1,
            single: false
        }
    }
    buildConfig(target) {

    }
    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_DECISION_CONFIG, target)
    }
}
