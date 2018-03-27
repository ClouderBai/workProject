<template>
  <div drag-tree class="drag-tree">
    <drag-tree-nodes :list="list"></drag-tree-nodes><br/><br/>
    <components-test ref="one"></components-test>
    <!-- <components-test :child-array.sync="parentArray" v-on:myClick='onClick'></components-test> -->
  </div>
</template>
<script>
  import DragTreeNodes from './DragTreeNodes'
  import componentsTest from './componentsTest'
  export default {
    name: 'DragTree',
    props: {
      list: Array,
      isTreeEdit: {
        type: Boolean,
        default: true
      },
      isTreeCheckBox: {
        type: Boolean,
        default: true
      },
      iconStyle: {
        type: Array,
        default: () => ['el-icon-circle-plus','el-icon-remove']
      }
    },
    data () {
      return {}
    },
    watch: {
      list (value) {
        this.storeRootData(value)
      }
    },
    components: {
      DragTreeNodes,
      componentsTest
    },
    methods: {
      // 增加节点事件
      insert (node, index) {
        this.list.splice(index, 0, node)
        alert('after insert ', this.list)
      },
      storeRootData (value) {
        this.$store.commit('setDragTreeData', value)
      },
      storeDragTreeOption () {
        let value = {}
        value.isTreeEdit = this.isTreeEdit
        value.isTreeCheckBox = this.isTreeCheckBox
        value.iconStyle = this.iconStyle
        this.$store.commit('setDragTreeOption', value)
      }
      
    },
    mounted () {
      // this.storeRootData(this.list)
      this.storeDragTreeOption()
      // alert(this.isTreeEdit + ' -- ' + this.isTreeCheckBox+ ' -- ' + this.iconStyle)
      // console.log(this.$store.getters.viewDTD + '--' + this.$store.state.iconStyle)
      // alert('refs: '+ this.$refs.one.counter)
    }
  }
</script>
<style>
.drag-tree{padding:20px;background:#fff;}
.drag-tree-empty, .drag-tree-dropzone {
    border: 1px dashed #bbb;
    min-height: 100px;
    background-color: #e5e5e5;
    background-image: -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
    background-image: -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
    background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
}

.drag-tree-empty {
    pointer-events: none;
}
</style>
