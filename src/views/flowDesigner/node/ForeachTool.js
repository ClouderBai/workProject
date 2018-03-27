/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseTool from './BaseTool.js'
import ForeachNode from './ForeachNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class ForeachTool extends BaseTool {
    getType() {
        return '动态分支'
    }
    getIcon() {
        return `<i class="uflo uflo-foreach" style="color:#737383"></i>`
    }
    newNode() {
        return new ForeachNode()
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
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_FOREACH_CONFIG, target)
    }
}
