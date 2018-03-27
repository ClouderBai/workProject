/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseNode from './BaseNode.js'
import subprocessSVG from '../svg/subprocess.svg'

export default class SubprocessNode extends BaseNode {
    getSvgIcon() {
        return subprocessSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'SubprocessNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},`
        if (this.subprocessKey) {
            xml += `subprocessKey:"${this.subprocessKey}",`
        }
        if (this.subprocessId) {
            xml += ` subprocess-type="Id", subprocess-id="${this.subprocessId}"`
        }
        if (this.subprocessName) {
            xml += ` subprocess-type="Name", subprocess-name="${this.subprocessName}"`
        }
        if (this.completeStartTask) {
            xml += ` complete-start-task:"${this.completeStartTask}",`
        } else {
            xml += ` complete-start-task:"false",`
        }
        if (this.description) {
            xml += ` description:${this.description},`
        }
        xml += 'outVariables:['
        for (const variable of this.outVariables || []) {
            xml += `{in-parameter-key:"${variable.inParameterKey}", out-parameter-key:"${variable.outParameterKey}"},`
        }
        xml += '],inVariables:['
        for (const variable of this.inVariables || []) {
            xml += `{in-parameter-key:"${variable.inParameterKey}", out-parameter-key:"${variable.outParameterKey}"},/>`
        }
        xml += '],'
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
