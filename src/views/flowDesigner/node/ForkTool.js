/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseTool from './BaseTool.js'
import ForkNode from './ForkNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class ForkTool extends BaseTool {
    getType() {
        return '分支'
    }
    getIcon() {
        return `<i class="uflo uflo-fork" style="color:#737383"></i>`
    }
    newNode() {
        return new ForkNode()
    }
    getConfigs() {
        return {
            in: -1,
            out: -1,
            single: false
        }
    }
    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_FORK_CONFIG, { target, main: this })
    }

    buildConnectionCondition(target) {

    }

    getConnectionPropertiesProducer() {

    }
}
