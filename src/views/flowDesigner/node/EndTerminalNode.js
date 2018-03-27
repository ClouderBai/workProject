/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseNode from './BaseNode.js'
import endSVG from '../svg/end-terminate.svg'

export default class EndTerminalNode extends BaseNode {
    getSvgIcon() {
        return endSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'EndNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},terminate:"true",`
        if (this.description) {
            xml += `description:${this.description},`
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
