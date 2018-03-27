/**
 * Created by Jacky.Gao on 2017-07-04.
 */
import BaseNode from './BaseNode.js'
import startSVG from '../svg/start.svg'

export default class StartNode extends BaseNode {
    getSvgIcon() {
        return startSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'StartNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},`
        if (this.taskName) {
            xml += ` taskName:"${this.taskName}",`
        }
        if (this.url) {
            xml += ` url:"${this.url}",`
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
