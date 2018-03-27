/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseNode from './BaseNode.js'
import joinSVG from '../svg/join.svg'

export default class JoinNode extends BaseNode {
    getSvgIcon() {
        return joinSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'JoinNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},`
        if (this.multiplicity) {
            xml += ` multiplicity:"${this.multiplicity}",`
        }
        if (this.percentMultiplicity) {
            xml += ` percentMultiplicity:"${this.percentMultiplicity}",`
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
