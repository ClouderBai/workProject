/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseNode from './BaseNode.js'
import decisionSVG from '../svg/decision.svg'

export default class DecisionNode extends BaseNode {
    getSvgIcon() {
        return decisionSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'DecisionNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},`
        if (this.handlerBean) {
            xml += ` handlerBean:"${this.handlerBean}",`
            xml += ` decision-type:"Handler",`
        } else {
            xml += ` decision-type="Expression",`
        }

        if (!this.handlerBean && this.expression) {
            xml += `expression:${this.expression},`
        }
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
