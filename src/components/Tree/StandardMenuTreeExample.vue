/*
 * @Author: BAICHONG 
 * @Date: 2018-03-26 14:28:12 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-26 17:52:00
 */
 /**
|--------------------------------------------------
| 标准菜单管理,菜单树
|       1. 可拖拽
|       2. 不支持checkBox
| 
| 
|--------------------------------------------------
*/
<template>
    <div style="width: 200px">
        <VueDraggableTree
            draggable
            v-model="data"
            :afterInsert="afterInsert"
            :template="template"
            :onDrop="handleDrop"
        />
        <el-button type="primary" size="mini" @click="getData">
            获取data
        </el-button>
    </div>
</template>

<script>
import Vue from 'vue'
import VueDraggableTree from 'vue-draggable-tree'
import { fetchAllStandardMenuList, updateStandardMenuTreeDrag } from '@/api/standardMenu'
const sourceLoop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
        if (item.key === key) {
            return callback(item, index, arr)
        }
        if (item.children) {
            return sourceLoop(item.children, key, callback)
        }
        return false
    })
}

export default {
    components: {
        VueDraggableTree
    },
    created() {
        this.loadData()
    },
    data() {
        // const rootThis = this
        this.template = Vue.component('custom-tree-node', {
            props: ['title', 'node'],
            render() {
                // 这个组件接收 title 和 node，node 就是真实渲染节点的那个 obj
                // const btnStyle = 'margin-left: 10px; cursor: pointer;'
                // const addBtn = <span
                //     style={btnStyle}
                //     onClick={rootThis.addNode.bind(rootThis, this.node)}>+</span>
                // const editBtn = <span
                //     style={btnStyle}
                //     onClick={rootThis.editNode.bind(rootThis, this.node)}>#</span>
                // const deleteBtn = <span
                //     style={btnStyle}
                //     onClick={rootThis.deleteNode.bind(rootThis, this.node)}>-</span>
                const titleStyle = this.node.highlight ? 'color: red;' : ''
                return (
                    <div on-click={() => { console.log(JSON.stringify(this.node)) }}>
                        <i class={this.node.icon} style={ { color: this.node.iconColor } }/>
                        <span style={titleStyle}>{this.node.name}</span>
                        {/* addBtn */}
                        {/* editBtn */}
                        {/* deleteBtn */}
                    </div>
                )
            }
        })
        return {
            data: []
        }
    },

    methods: {
        getData() {
            console.log('%c%s', 'color:red', 'this.data  : ', JSON.stringify(this.data))
        },
        loadData() {
            fetchAllStandardMenuList()
                .then(res => {
                    this.handleData(res)
                    this.data = res
                    console.log('%c%s', 'color:red', 'res  : ', JSON.stringify(this.data))
                })
        },

        handleData(data, key) {
            data.forEach((item, index) => {
                item.key = `${key ? `${key}-` : ``}${index}`
                // item.key = item.id
                if (item.hasChild) {
                    // this.handleData(item.children, item.key)
                    this.handleData(item.children, item.key)
                }
            })
        },

        afterInsert() {
            console.log(this.data)
        },
        /**
         * 增加节点
         */
        addNode(node) {
            if (!node.children) {
                // 由于开始并没有 children 属性，所以直接添加并不会触发重新渲染，必须使用 Vue.set
                this.$set(node, 'children', [])
            }
            node.children.push({
                key: Math.random(),
                title: 'new node',
                children: []
            })
        },
        /**
         * 编辑节点
         */
        editNode(node) {
            const newValue = window.prompt('请输入新标题')
            if (newValue) {
                /* eslint-disable */
                node.title = newValue;
                /* eslint-enable */
            }
        },
        /**
         * 删除节点
         */
        deleteNode(node) {
            // 要找到父节点
            sourceLoop(this.data, node.key, (item, index, arr) => {
                arr.splice(index, 1)
            })
        },
        handleDrop(res) {
            console.log('%c%s', 'color:red', 'handleDrop--res  : ', res)
            const {
                node,
                dragNode
            } = res
            // drop target 找到拖拽目标
            const dropKey = node.eventKey
            // drag node
            const dragKey = dragNode.eventKey
            const dropPos = node.pos.split('-')
            const dropPosition = res.dropPosition - Number(dropPos[dropPos.length - 1])
            /**
             * We may have some situations to deal with.
             * For example,
             * I will use the book as a child node of clothing.
             * At this time, I should organize the completion of the drag.
             */
            // if (node.source.type !== dragNode.source.type) {
            if (!node.source.parentCode || !dragNode.source.parentCode) {
                alert(`${dragNode.source.name} can't put in ${node.source.name}`)
                // alert(`${dragNode.source.title} can't put in ${node.source.type}`)
                return
            }
            // 浅拷贝
            const data = [...this.data]
            let dragObj
            let hasDragObjArr
            let deleteIndex
            sourceLoop(data, dragKey, (item, index, arr) => {
                // 保存正在拖拽的节点所在 children
                hasDragObjArr = arr
                deleteIndex = index
                // hasDragObjArr.splice(index, 1);
                dragObj = item
            })
            // 然后处理应该放到哪里
            if (res.dropToGap) {
                // 如果是在两个节点之间
                let ar
                let i
                // 寻找放置的那个节点对应的数组，保存为 ar
                sourceLoop(data, dropKey, (item, index, arr) => {
                    ar = arr
                    i = index
                })
                if (this.beforeInsert) {
                    console.log('%c%s', 'color:red;font-size:20px', 'this.beforeInsert  : ', this)
                    this.beforeInsert('insert', ar, i, dragObj)
                    return
                }
                if (ar.indexOf(dragObj) > -1) {
                    console.log('%c%s', 'color:red;font-size:20px', 'ar  : ', ar)
                    console.log('%c%s', 'color:red;font-size:20px', 'ar.indexOf(dragObj) > -1  : ', dragObj)
                    deleteIndex += 1
                }
                // 如果是放到下边缘
                if (dropPosition === 1) {
                    ar.splice(i + 1, 0, dragObj)
                } else {
                    ar.splice(i, 0, dragObj)
                }
                hasDragObjArr.splice(deleteIndex, 1)
                console.log('%c%s', 'color:red;font-size:20px', 'hasDragObjArr  : ', JSON.stringify(hasDragObjArr))
                updateStandardMenuTreeDrag(hasDragObjArr)
                    .then(res => {
                        console.log('%c%s', 'color:red;font-size:20px', 'res  : ', res)
                    })
            } else {
                // 成为子节点
                sourceLoop(data, dropKey, (item) => {
                    /* eslint-disable */
                    item.children = item.children || [];
                    if (this.beforeInsert) {
                        this.beforeInner('inner', item.children, dragObj);
                        return;
                    }
                    // where to insert 示例添加到尾部，可以是随意位置
                    item.children.push(dragObj);
                    hasDragObjArr.splice(deleteIndex, 1);
                });
            }
        },
    }

}
</script>

<style>

</style>
