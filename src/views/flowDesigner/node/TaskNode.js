/**
 * Created by Jacky.Gao on 2017-07-06.
 */
import BaseNode from './BaseNode.js'
import taskSVG from '../svg/task.svg'

export default class TaskNode extends BaseNode {
    constructor() {
        super()
        this.assignmentType = 'ProcessPromoter'
    }
    getSvgIcon() {
        return taskSVG
    }
    toJson() {
        const nodeInfo = `"Normal"`
        return this.buildTaskXml(nodeInfo)
    }

    buildTaskXml(nodeInfo) {
        const json = this.toJSON()
        json.type = 'TaskNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps}, nodeInfo:${nodeInfo},`
        if (this.taskName) {
            xml += ` taskName:"${this.taskName}",`
        }
        xml += `assignee:[`
        for (const assign of this.assignees || []) {
            xml += `{provider-id:"${assign.providerId}", name:"${assign.name}", id:"${assign.id}"},`
        }
        xml += `],`
        xml += `componentAuthorities:[`
        for (const data of this.componentAuthorities || []) {
            xml += `{component:"${data.component}", authority:"${data.authority}"},`
        }
        xml += `],`
        xml += `userData:[`
        for (const data of this.userData || []) {
            xml += `{value:"${data.value}", key:"${data.key}"},`
        }
        xml += `],`
        if (this.description) {
            xml += ` description:${this.description},`
        }
        xml += this.getFromConnectionsXML()
        return xml
    }

    initFromJson(json) {
        super.initFromJson(json)
    }
    validate() {
        const errorInfo = super.validate()
        return errorInfo
    }
}
