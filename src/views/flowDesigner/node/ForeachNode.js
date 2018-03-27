/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseNode from './BaseNode.js'
import foreachSVG from '../svg/foreach.svg'

export default class ForeachNode extends BaseNode {
    getSvgIcon() {
        return foreachSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'ForeachNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},`
        xml += ` var:"${this.variable ? this.variable : ''}",`
        if (!this.foreachType) {
            this.foreachType = 'In'
        }
        xml += ` foreach-type:"${this.foreachType}",`
        if (this.foreachType === 'In') {
            xml += ` in:"${this.processVariable}",`
        } else {
            xml += ` handlerBean="${this.handlerBean}",`
        }
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
