/**
 * Created by Jacky.Gao on 2017-07-07.
 */
import TaskNode from './TaskNode.js'
import countersignTaskSVG from '../svg/task-countersign.svg'

export default class CountersignTaskNode extends TaskNode {
    getSvgIcon() {
        return countersignTaskSVG
    }
    toJson() {
        let nodeInfo = `taskType:"Countersign",`
        if (this.countersignMultiplicity) {
            nodeInfo += `countersignMultiplicity:"${this.countersignMultiplicity}",`
        }
        if (this.countersignPercentMultiplicity) {
            nodeInfo += `countersign-percent-multiplicity:"${this.countersignPercentMultiplicity}",`
        }
        if (this.countersignExpression) {
            nodeInfo += `countersign-expression:"${this.countersignExpression}",`
        }
        if (this.countersignHandler) {
            nodeInfo += `countersign-handler:"${this.countersignHandler}"`
        }
        return this.buildTaskXml(nodeInfo)
    }
    initFromJson(json) {
        super.initFromJson(json)
    }
    validate() {
        const errorInfo = super.validate()
        return errorInfo
    }
}
