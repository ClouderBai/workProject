
import Canvas from './Canvas.js'
import Context from './Context.js'
import * as event from './Event.js'
import * as nodeEvent from '../node/NodeProducerEvent.js'
import Node from './Node.js'
import Connection from './Connection.js'
import BaseNode from '../node/BaseNode.js' //

export default class UFLODesigner {
    constructor(container) {
        this.canvasContainer = container
        this.context = new Context(this.canvasContainer)
        this.canvas = new Canvas(this.context)
        this.context.flowDesigner = this
        this.nodeTools = []
        this._bindSnapToEvent()
        this._bindSelectionEvent()
        this._bindShortcutKey()
    }
    /** 添加节点 */
    addNode(json) {
        if (!json.type) {
            event.eventEmitter.emit(event.OPERATION_ERROR, { mesg: '添加节点没有type属性，无法添加.' })
            return
        }
        if (!json.x || !json.y || !json.name) {
            event.eventEmitter.emit(event.OPERATION_ERROR, { mesg: '添加节点需要有x、y及name属性，否则无法添加' })
            return
        }
        if (this.context.toolsMap.has(json.type)) {
            const tool = this.context.toolsMap.get(json.type)
            /* eslint-disable */
            let { x, y, width, height, name } = json
            x = parseInt(x), y = parseInt(y), width = parseInt(width), height = parseInt(height)
            const maxWidth = x + width + 10, maxHeight = y + height + 10
             /* eslint-enable */
            this.context.resizePaper(maxWidth + 50, maxHeight + 50)
            const newNode = tool._newNodeInstance(x, y, name)
            newNode.initFromJson(json)
        } else {
            event.eventEmitter.emit(event.OPERATION_ERROR, { mesg: `添加的节点类型${json.type}不存在.` })
            return
        }
    }
    /* 监听点击选择对象 */
    _bindSelectionEvent() {
        event.eventEmitter.on(event.OBJECT_SELECTED, target => {
            if (target instanceof Node) {
                target._tool.getPropertiesProducer(target)
            } else if (target instanceof Connection) {
                event.eventEmitter.emit(event.CONNECTIONS_SELECTED, target)
            }
        })
        event.eventEmitter.on(event.CANVAS_SELECTED, () => {
            nodeEvent.eventEmitter.emit(nodeEvent.BUILD_FLOW_CONFIG)
            this.context.cancelConnection()
            this.context.currentTool = this.context.selectTool
        })
        event.eventEmitter.emit(event.CANVAS_SELECTED)
    }
    /** 网格监听 */
    _bindSnapToEvent() {
        event.eventEmitter.on(event.SNAPTO_SELECTED, () => {
            if (this.canvasContainer.className.includes('hassnaptogrid')) {
                this.canvasContainer.className = 'fd-canvas-container nosnaptogrid'
                this.context.snapto = false
            } else {
                this.canvasContainer.className = 'fd-canvas-container hassnaptogrid'
                this.context.snapto = true
            }
        })
    }
    _bindShortcutKey() {
    	const _this = this
        document.onkeydown = function(e) {
        	var keyNum = window.event ? e.keyCode : e.which
            if (keyNum === 46) {
                _this.buildTools('remove')
            }
        }
    }
    buildTools(type) {
        const context = this.context
        context.cancelConnection()
        switch (type) {
            case 'select': // 选择
                this.context.currentTool = this.context.selectTool
                break
            case 'connection': // 在两节点间创建连接线
                this.context.currentTool = this.context.connectionTool
                break
            case 'redo': // 重做
                this.context.undoManager.redo()
                this.context.currentTool = this.context.selectTool
                break
            case 'undo': // 撤消
                this.context.undoManager.undo()
                this.context.currentTool = this.context.selectTool
                break
            case 'snap': // 网格吸附
                event.eventEmitter.emit(event.SNAPTO_SELECTED)
                this.context.currentTool = this.context.selectTool
                break
            case 'remove': // 删除选择对象
                event.eventEmitter.emit(event.REMOVE_CLICKED)
                this.context.currentTool = this.context.selectTool
                break
            default:
                this.$message.error(`不支持的节点类型[${type}]`)
                break
        }
    }
    /** 添加节点到工具栏*/
    addTool(tool) {
        tool.context = this.context
        this.context.registerTool(tool)
        return this
    }
    updateNodeName(type, name) {
        if (type === 'node') {
            this.context.firstSelectFigure.text.attr('text', name)
        } else if (type === 'connection') {
            this.context.firstSelectFigure.name = name
            this.context.firstSelectFigure._buildText()
        }
    }
    /** */
    toJSON() {
        return this.elementsToJSON()
    }
    validate() {
        const errors = []
        for (const figure of this.context.allFigures) {
            if (figure instanceof Node) {
                const errorInfo = figure.validate()
                if (errorInfo) {
                    errors.push(errorInfo)
                }
            }
        }
        if (errors.length > 0) {
            let info = ''
            errors.forEach((error, index) => {
                info += (index + 1) + '.' + error + '<br>'
            })
            info = '错误：<br>' + info + ''
            event.eventEmitter.emit(event.OPERATION_ERROR, { mesg: `${info}`, dangerouslyUseHTMLString: true })
            return false
        }
        return true
    }
    elementsToJSON() {
        const jsonData = []
        this.context.allFigures.forEach((figure, index) => {
            if (figure instanceof Node) {
                jsonData.push(figure.toJSON())
            }
        })
        return jsonData
    }
    toFigures() {
        if (!this.validate()) {
            return
        }
        if (this.toJSON().length < 2) {
            // MsgBox.alert('流程至少要包含一个开始节点和一个结束节点!')
            return
        }
        let xml = '{'
        if (this.key) {
            xml += ` key:"${this.key}",`
        }
        if (this.categoryId) {
            xml += ` category-id:"${this.categoryId}",`
        }
        if (this.url) {
            xml += ` start-process-url:"${this.url}",`
        }
        if (this.effectDate) {
            xml += ` effect-date:"${this.effectDate}",`
        }
        xml += ` allFigures:[`
        for (const figure of this.context.allFigures) {
            if (!(figure instanceof BaseNode)) {
                continue
            }
            xml += `{${figure.toJson()}},`
        }
        xml += ']}'
        return xml
    }
    fromJson(json) {
        this.name = json.name
        this.key = json.key
        this.url = json.startProcessUrl
        this.eventHandlerBean = json.eventHandlerBean
        this.categoryId = json.categoryId
        this.effectDate = json.effectDate
        this.description = json.description
        this.formData = json.processFormDefinition
        this.fileId = json.id
        for (const nodeJson of json.nodes) {
            nodeJson.w = nodeJson.width
            nodeJson.h = nodeJson.height
            nodeJson.type = this.getNodeJsonType(nodeJson.type)
            nodeJson.connections = nodeJson.sequenceFlows || []
            for (const conn of nodeJson.connections) {
                conn.to = conn.toNode
            }
            this.addNode(nodeJson)
        }
        for (const figure of this.context.allFigures) {
            if (!(figure instanceof Node)) {
                continue
            }
            figure._buildConnections()
        }
    }
    /** */
    getNodeJsonType(type) {
        for (let i = 0; i < this.nodeTools.length; i++) {
            if (this.nodeTools[i].type === type) {
                type = this.nodeTools[i].name
                break
            }
        }
        return type
    }
}
