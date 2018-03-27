<template>
  <li class="drag-tree-node">
    <div class="drag-tree-handle" @mousedown.self="dragStart">
      <i v-if="hasChildren" @click="toggle" :class="['clickable',collapsed ? iconArrowStyle[0] : iconArrowStyle[1]]"></i>
      <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"></el-checkbox> -->
      <el-checkbox v-model="checked">{{ nodeData.name }}</el-checkbox>
        <el-button type="primary" size="mini" v-if="isTreeEdit" class="right-button" icon="plus" @click="insert()">新建</el-button>
        <el-button type="primary" size="mini" v-if="isTreeEdit" class="right-button" icon="plus" @click="modify()">修改</el-button>
        <el-button type="danger" size="mini" v-if="isTreeEdit" class="right-button" icon="close" @click="remove">删除</el-button>
    </div>
    <drag-tree-nodes :list="nodeData.children" :collapsed="collapsed" ref="childNodes"></drag-tree-nodes>
  </li>
</template>
<script>
  import DragTreeNodes from './DragTreeNodes'
  import DomHelper from './dom-helper'
  export default {
    name: 'DragTreeNode',
    props: {
      nodeData: Object,
      isTreeEdit: Boolean,
      isTreeCheckBox: Boolean,
      iconStyle: Array
    },

    data () {
      return {
        checkAll: false,
        collapsed: false, //是否展开
        isDragging: false, //是否拖动
        checked: false, //checkbox选中状态
        lastX: null,
        lastY: null,
        dragElm: null,
        placeElm: null,
        hiddenPlaceElm: null,
        // 移动坐标对象
        pos: null,
        firstMoving: true,
        dragInfo: null
      }
    },
    computed: {
      hasChildren () { //children节点是否有数据
        return this.nodeData.children && this.nodeData.children.length > 0
      },
      parentNodeData () { //返回父节点数据
        if (!this.$parent || !this.$parent.$parent) {
          return null
        }
        if (this.$parent.$parent.$options.name === 'DragTree') {
          return {name: '', children: this.$parent.$parent.list}
        } else {
          return this.$parent.$parent.nodeData
        }
      },
      isPlaceholder () {
        return this.nodeData.placeholder
      },
      rootTreeData () {
        return {
          name: '',
          root: true,
          children: this.$store.state.dragTreeData || []
        }
      },
      iconArrowStyle () {
        return this.$store.state.iconStyle
      },
      isTreeEdit () {
        return this.$store.state.isTreeEdit
      },
      isTreeCheckBox () {
        return this.$store.state.isTreeCheckBox
      }
    },
    methods: {
      // 切换节点展开收缩状态
      toggle () {
        this.collapsed = !this.collapsed
        console.log('hello: '+this.isTreeEdit+ ' -- ' +this.isTreeCheckBox+ ' -- ' +this.iconStyle)
      },
      // store node height
      setPlaceHolderHeight () { //拖动设置元素高度
        this.$store.commit('setDragTreeNodeHeight', this.$el.offsetHeight)
      },
      // get node's parent by store
      getNodeParent (node, rootNode, curArgs = {notRoot: false, match: null, isMatch: false}) {
        // debugger
        if (node.root) {
          return curArgs
        }
        let list = rootNode.children
        for (let i = 0; i < list.length; i++) {
          if (curArgs.isMatch) {
            break
          }
          let item = list[i]
          if (item === node) {
            curArgs.match = item
            break
          } else if (item.children && item.children.length > 0) {
            let isRootBefore = !curArgs.notRoot
            if (isRootBefore) {
              curArgs.notRoot = true
            }
            let matchAfter = this.getNodeParent(node, item, curArgs)
            if (!curArgs.isMatch && matchAfter.match) {
              curArgs.match = item
              curArgs.isMatch = true
            }
            if (isRootBefore) {
              curArgs.notRoot = !isRootBefore
            }
          }
        }
        if (!curArgs.notRoot && node === curArgs.match) {
          curArgs.match = rootNode
          curArgs.isMatch = true
        }
        return curArgs
      },
      // 增加节点事件 insert (node, index) {
      insert (node) {
        console.log('this.nodeData.children', JSON.stringify(this.nodeData.children))

        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
        alert(JSON.stringify(this.nodeData.children))
        !this.nodeData.children && (this.nodeData.children = []);
        let index = -1
        if (!node) {
          node = {
            name: '节点',
            children: []
          }
        }
        if (index < 0) {
          index = this.nodeData.children.length
        }
        this.nodeData.children.splice(index, 0, node)
      },
      // 删除节点操作，需要从父节点操作
      remove (evt) {
        //alert('删除'+JSON.stringify(this))
        //return
        this.$emit('removeNode', this)
      },
      modify (event) {
        this.nodeData.name += 'change'
        alert(this.nodeName+ ' -- ' +  event + ' -- ' +this.nodeData.name)
      },
      bindDragMoveEvent () {
        document.bind('mouseup', this.dragEnd)
        document.bind('mousemove', this.dragMove)
      },
      unbindDragMoveEvent () {
        document.unbind('mouseup', this.dragEnd)
        document.unbind('mousemove', this.dragMove)
      },
      dragStart (evt) {
        // console.log(this)
        this.isDragging = true //开始拖动
        // console.log(JSON.stringify(this.nodeData)+ ' ---- ' +JSON.stringify(this.parentNodeData.children))
        this.dragInfo = DomHelper.dragInfo(this.nodeData, this.parentNodeData)
        // console.log('dragInfo', this.dragInfo)
        let index = DomHelper.jsonIndex(this.nodeData, this.parentNodeData.children)
        // 隐藏当前节点
        // this.nodeData.hidden = true
        // 加入替换节点 index + 1 => index, 1
        this.parentNodeData.children.splice(index, 1, {name: 'placeholder', placeholder: true})
        // 创建拖动节点
        //alert(this.$el.parentNode.innerHTML);
        let el = this.$el
        let cloneEl = el.cloneNode(true)
        let parentEl = el.parentNode
        //alert("ooo"+el.parentNode.innerHTML);
        this.dragElm = document.createElement(parentEl.tagName).addClass(parentEl.className).addClass('drag-tree-node-drag')
        this.dragElm.css('width', `${el.offsetWidth}px`)
        this.dragElm.css('z-index', 9999)
        this.setPlaceHolderHeight()
        this.pos = DomHelper.positionStarted(evt, el)
        this.dragElm.css({
          left: `${evt.pageX - this.pos.offsetX}px`,
          top: `${evt.pageY - this.pos.offsetY}px`
        })
        this.dragElm.append(cloneEl)
        document.querySelector('body').append(this.dragElm)
        // 绑定dragMove事件
        this.bindDragMoveEvent()
      },
      dragMove (evt) {
        if (!this.isDragging) return true
        // console.log('move')
        let leftElmPos = evt.pageX - this.pos.offsetX
        let topElmPos = evt.pageY - this.pos.offsetY
        this.dragElm.css({
          left: `${leftElmPos}px`,
          top: `${topElmPos}px`
        })
        // 判断移动方向
        DomHelper.positionMoved(evt, this.pos, this.firstMoving)
        if (this.firstMoving) {
          this.firstMoving = false
          return
        }
        if (this.pos.dirAx) { // 水平移动
          if (this.pos.distX > 0) { // 向右移动
            let prev = this.dragInfo.prev()
            if (prev) {
              let children = prev.children
              if (children) {
                this.dragInfo.moveTo(prev, prev.children, prev.children.length)
              }
            }
          }
          if (this.pos.distX < 0) { // 向左移动
            let next = this.dragInfo.next()
            if (!next) {
              let target = this.dragInfo.parent
              if (target) {
                let parent = this.getNodeParent(target, this.rootTreeData).match
                if (parent) {
                  this.dragInfo.moveTo(parent, parent.children, DomHelper.jsonIndex(target, parent.children) + 1)
                }
              }
            }
          }
        } else { // 垂直移动
          if (this.pos.distY > 0) {
            let next = this.dragInfo.next()
            if (next) {
              this.dragInfo.moveTo(next, next.children, 0)
            } else { // 寻找父节点的同级节点
              let target = this.dragInfo.parent
              if (target) {
                let parent = this.getNodeParent(target, this.rootTreeData).match
                if (parent) {
                  this.dragInfo.moveTo(parent, parent.children, DomHelper.jsonIndex(target, parent.children) + 1)
                }
              }
            }
          }
          if (this.pos.distY < 0) {
            let prev = this.dragInfo.prev()
            if (prev) {
              this.dragInfo.moveTo(prev, prev.children, prev.children.length)
            } else {
              let target = this.dragInfo.parent
              if (target) {
                let parent = this.getNodeParent(target, this.rootTreeData).match
                if (parent) {
                  this.dragInfo.moveTo(parent, parent.children, DomHelper.jsonIndex(target, parent.children))
                }
              }
            }
          }
        }
      },
      dragEnd (evt) {
        this.unbindDragMoveEvent()
        this.isDragging = false
        if (this.dragElm) {
          console.log('end')
          this.dragInfo.apply()
          this.$nextTick(() => {
            this.dragElm.remove()
            this.dragElm = null
            this.dragInfo = null
          })
        }
      }
    },
    beforeCreate () {
      this.$options.components.DragTreeNodes = DragTreeNodes
    }
  }
</script>
<style>
.drag-tree-node .clickable {
  cursor: pointer;
}
.drag-tree-node, .drag-tree-placeholder {
  position: relative;
  margin: 0;
  padding: 0;
  min-height: 20px;
  line-height: 20px;
}
.drag-tree-placeholder {
  background: #f0f9ff;
  border: dashed 2px #bed2db;
  box-sizing: border-box;
}
.drag-tree-node .drag-tree-handle {
  overflow: hidden;
  user-select: none;
  display: block;
  padding: 10px 15px;
  line-height: 28px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: move;
}
.drag-tree-node .drag-tree-handle:hover {
  background: #727272;
  color: #fff;
}
.drag-tree-node .right-button {
  float: right;
  margin-right: 10px;
}
.drag-tree-node-drag {
  position: absolute;
  pointer-events: none;
  z-index: 999;
  opacity: .8;
}
.drag-tree-node-hidden {
  display: none;
}
</style>
