
import Node from '../main/Node'
import * as event from '../main/Event.js'
export default class BaseNode extends Node {
    getNodeName(type) {
        switch (type) {
            case 'ActionNode':
                return 'action'
            case 'DecisionNode':
                return 'decision'
            case 'ForkNode':
                return 'fork'
            case 'JoinNode':
                return 'join'
            case 'TaskNode':
                return 'task'
            case 'ForeachNode':
                return 'foreach'
            case 'SubprocessNode':
                return 'subprocess'
            case 'EndNode':
                return 'end'
            case 'StartNode':
                return 'start'
            default:
                event.eventEmitter.emit(event.OPERATION_ERROR, { mesg: `不支持的节点类型[${type}]` })
        }
    }

    initFromJson(json) {
        for (const name in json) {
            this[name] = json[name]
        }
        const { width, height } = json
        if (parseInt(width) < 30) {
            json.width = 30
        }
        if (parseInt(height) < 65) {
            json.height = 65
        }
        super.initFromJson(json)
        this.eventBean = json.eventBean
    }

    validate() {
        let errorInfo = null
        if (!this.name || this.name.length < 1) {
            errorInfo = `节点名不能为空!`
            return errorInfo
        }
        if (this.in === -1 || this.in > 0) {
            if (this.out === -1 || this.out > 0) {
                if (this.fromConnections.length === 0 && this.toConnections.length === 0) {
                    errorInfo = `${this.name}节点未和其它节点连接!`
                }
            } else {
                if (this.toConnections.length === 0) {
                    errorInfo = `${this.name}节点未和其它节点连接!`
                }
            }
        } else {
            if (this.out === -1 || this.out > 0) {
                if (this.fromConnections.length === 0) {
                    errorInfo = `${this.name}节点未和其它节点连接!`
                }
            }
        }
        return errorInfo
    }

    getFromConnectionsXML() {
        let xml = ''
        for (const conn of this.fromConnections) {
            xml += this.buildConnectionXML(conn)
        }
        return xml
    }

    buildConnectionXML(connection) {
        const json = connection.toJSON()
        const path = json.path
        let pathInfo = '', i = 0//eslint-disable-line
        for (const p of path) {
            if (i > 0 && i !== path.length - 1) {
                if (pathInfo !== '') {
                    pathInfo += ','
                }
                pathInfo += parseInt(p[1]) + ',' + parseInt(p[2])
            }
            i++
        }
        if (pathInfo !== '') pathInfo += ':'
        let xml = `sequence-flow:{g:"${pathInfo}", type:"${json.type}", to:"${json.to}",`
        if (json.name) {
            xml += ` name:"${json.name}",`
        }
        if (json.conditionType) {
            xml += ` conditionType:"${json.conditionType}",`
        }
        if (json.expression) {
            xml += ` expression:"${json.expression}",`
        }
        if (json.handlerBean) {
            xml += ` handlerBean:"${json.handlerBean}",`
        }
        xml += '}'
        return xml
    }

    getXMLNodeBaseProps(json) {
        let xml = `{name:"${json.name}", `
        xml += `x:"${json.x}",`
        xml += `y:"${json.y}", `
        xml += `width:"${json.w}", `
        xml += `height:"${json.h}", `
        if (this.eventHandlerBean) {
            xml += `eventHandlerBean:"${this.eventHandlerBean}",`
        }
        if (this.label) {
            xml += `label:"${this.label}",`
        }
        xml += `}`
        return xml
    }
}
