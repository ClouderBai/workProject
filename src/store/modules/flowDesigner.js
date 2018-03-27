/*
 * @Author: LiuJunTing
 * @Date: 2018-03-14 14:03:09
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-26 10:30:15
 */

/**
|--------------------------------------------------
|
|  任务流设计器相关
|
|--------------------------------------------------
*/

import flowDesignerData from '../data/flowDesignerData'

const flowDesigner = {
    state: {
        flowDesignerData // 工作流设计器数据
    },

    mutations: {
        initData: (state, status) => {
            state.flowDesignerData = status
        },

        // 在nodes数组中添加node节点基本对象  该对象必须有uuid
        appendNode: (state, status) => {
            const nodes = state.flowDesignerData.data.nodes
            if (!(nodes.some(v => v.uuid === status.uuid))) { state.flowDesignerData.data.nodes = [...nodes, status] }
        },

        // 通过uuid设置nodes数组中对应的node对象
        setNodeInfo: (state, status) => { // content:{state,commit,dispath}
            const foo = state.flowDesignerData.data.nodes
            const index = foo.findIndex(v => v.uuid === status.uuid)
            foo[index] = status
        }
    },

    actions: {},

    getters: {
        // 通过uuid获取nodes数组中对应的node对象
        getNodeInfo: (state) => uuid => state.flowDesignerData.data.nodes.find(v => v.uuid === uuid),

        // 获取nodes集合
        getAllNodes: (state) => {
            return JSON.parse(JSON.stringify(state.flowDesignerData.data.nodes))
        }
    }
}

export default flowDesigner
