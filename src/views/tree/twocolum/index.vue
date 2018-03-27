<template>
  <div class="tree-main">
    <el-row>
      <el-col :span='10'>
        <div>菜单拖动</div><br/>
          <drag-tree :list="list" :isTreeEdit="true" :isTreeCheckBox="false"></drag-tree>
      </el-col>
      <el-col :span='14'>
        <pre>
          {{JSON.stringify(list)}}
        </pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DragTree from './drawTree/DragTree'
import componentsTest from './drawTree/componentsTest'
import './drawTree/dom-expand11.js'
const array = ['java', 'js', 'php', 'node']
export default {
    data() {
        return {
            list: array.map((name, index) => {
                return {
                    name,
                    children: name === 'js' ? [{ name: 'angular', children: [{ name: 'angular 1', children: [] }] }] : []
                }
            }),
            parentArray: 1,
            isTreeEdit: false,
            isTreeCheckBox: false,
            iconFile: ['el-icon-circle-plus1', 'el-icon-remove1']
        }
    },
    components: {
        DragTree,
        componentsTest
    },
    methods: {
        onClick(v) {
            // console.log(JSON.stringify(v))
            console.log(arguments)
        }
    },
    mounted() {
    // alert(JSON.stringify(this.list))
    }
}
</script>

<style>
.tree-main {
  position: relative;
  padding: 20px 15px;
  border-top: solid 1px #d1d2d4;
  border-bottom: solid 1px #d1d2d4;
  max-height: 900px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ddd;
  /* border-radius: 4px; */
}
pre {
  overflow: auto;
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
}
</style>
