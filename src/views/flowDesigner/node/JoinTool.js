/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseTool from './BaseTool.js'
import JoinNode from './JoinNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class JoinTool extends BaseTool {
    getType() {
        return '聚合'
    }
    getIcon() {
        return `<i class="uflo uflo-join" style="color:#737383"></i>`
    }
    newNode() {
        return new JoinNode()
    }
    getConfigs() {
        return {
            in: -1,
            out: -1,
            single: false
        }
    }
    buildProperties(target) {

    }
    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_JOIN_CONFIG, target)
    }
}
