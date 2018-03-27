/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseTool from './BaseTool.js'
import SubprocessNode from './SubprocessNode.js'
import * as nodeEvent from './NodeProducerEvent.js'

export default class SubprocessTool extends BaseTool {
    getType() {
        return '子流程'
    }
    getIcon() {
        return `<i class="uflo uflo-subprocess" style="color:#737383"></i>`
    }
    newNode() {
        return new SubprocessNode()
    }
    getConfigs() {
        return {
            in: -1,
            out: -1,
            single: false
        }
    }
    buildSubprocessConfig(target) {

    }

    buildInVariableConfig(target) {

    }
    buildOutVariableConfig(target) {

    }

    buildTableBody(body, variable, variables, dialog) {

    }

    getPropertiesProducer(target) {
        nodeEvent.eventEmitter.emit(nodeEvent.BUILD_SUBPROCESS_CONFIG, target)
    }
}
