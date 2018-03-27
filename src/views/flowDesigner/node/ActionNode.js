/**
 * Created by Jacky.Gao on 2017-07-10.
 */
import BaseNode from './BaseNode.js'
import actionSVG from '../svg/action.svg'

export default class ActionNode extends BaseNode {
    getSvgIcon() {
        return actionSVG
    }
    toJson() {
        const json = this.toJSON()
        json.type = 'ActionNode'
        const nodeName = this.getNodeName(json.type)
        const nodeProps = this.getXMLNodeBaseProps(json)
        let xml = `nodeName:"${nodeName}" ,nodeProps:${nodeProps},`
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
        let info = super.validate()
        if (info) {
            return info
        }
        if (!this.handlerBean) {
            info = `${this.name}节点动作Bean不能为空!`
            return info
        }
        return info
    }
}
