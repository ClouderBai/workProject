<template>
  <ol drag-tree-nodes class="drag-tree-nodes" :class="{hidden: collapsed}">
    <drag-tree-node :list="list" v-for="li in list" :key="li.name" :nodeData="li" @removeNode="removeNode" v-if="!li.placeholder && !li.hidden"></drag-tree-node>
    <li class="drag-tree-node drag-tree-placeholder" title="oooo1" v-else-if="li.placeholder" :style="{height: `${nodeHeight}px`}"></li>
  </ol>
</template>
<script>
  import DragTreeNode from './DragTreeNode'
  export default {
    name: 'DragTreeNodes',
    props: {
      list: Array, //数据
      collapsed: Boolean, //是否展开
    },
    computed: {
      nodeHeight () {
        return this.$store.state.dragTreeNodeHeight > 0 ? this.$store.state.dragTreeNodeHeight : 48
      }
    },
    methods: {
      // 树的层级
      depth () {
        let dragTreeVm = ['DragTreeNode', 'DragTreeNodes']
        let parent = this.$parent
        // console.log("$parent "+JSON.stringify($parent))
        alert("name "+parent.$options.name)
        if (parent && dragTreeVm.includes(parent.$options.name)) {
          return parent.depth()
        }
        return 0
      },
      outOfDepth () { //none
        return this.depth() < 0
      },
      // consoleNode () {
        // console.log(this.$children, this.list)
      // },
      // insertNode (nodeData, index) {
      //   this.list.splice(index, 0, nodeData)
      //   for (let i = 0; i < this.list.length; i++) {
      //     this.$set(this.list, i, this.list[i])
      //   }
      //   console.log('list', this.list)
      //   this.$nextTick(() => {
      //     console.log('actual children', this.$children)
      //   })
      // },
      // ondragstart事件 当拖拽元素开始被拖拽的时候触发的事件，此事件作用被拖拽元素
      // ondragsenter事件，当拖拽元素进入目标元素的时候触发的事件，此事件作用在目标元素上
      // ondragover事件，拖拽元素在目标元素上移动的时候触发事件，此事件作用在目标元素上
      // ondrop事件，被拖拽元素在目标元素上同时鼠标放开触发事件，此事件作用在目标元素上
      // ondragend事件，当拖拽完后触发的事件，此事件作用在被拖拽元素上
      removeNode (node) {
        let nodes = this.$children.filter(child => child.$options.name === 'DragTreeNode')
        let index = -1
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i] === node) {
            index = i
            break
          }
        }
        if (index > -1) {
          this.list.splice(index, 1)
        } else {
          this.$parent.$emit('removeNode', this)
        }
      },
      // childrenCount () {
      //   return this.$children ? this.$children.length : 0
      // }
    },
    beforeCreate () {
      // 解决互相递归调用组件时的template unregister错误
      this.$options.components.DragTreeNode = DragTreeNode
    }
  }
</script>
<style>
.drag-tree-nodes {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
}
body li {
  list-style-type: none;
}
.drag-tree-nodes.hidden {
    display: none;
    visibility: hidden;
}
.drag-tree-nodes .drag-tree-nodes {
    padding-left: 25px;
}
.drag-tree-placeholder div{
  user-select: none;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color : transparent;
}
</style>
