<template>
  <div>
    <el-tree :data="tags" :props="defaultProps" @node-click="handleNodeClick"></el-tree>


   
    <!-- <draggable element="el-tree" v-model="tags" :move="getdata" @update="datadragEnd"> -->
      <draggable element="elTree" v-model="tags" :list="tags" :component-data="getComponentData()">
        <!-- <el-tree data="tags" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->

        <!-- <transition-group>
            <div v-for="element in tags" :key="element.id">
                {{element.label}}
            </div>
        </transition-group> -->
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    data() {
        return {
            tags: [{
                label: '一级 1',
                id: 1,
                children: [{
                    label: '二级 1-1',
                    id: 11,
                    children: [{
                        label: '三级 1-1-1',
                        id: 111
                    }]
                }]
            }, {
                label: '一级 2',
                id: 2,
                children: [{
                    label: '二级 2-1',
                    id: 21,
                    children: [{
                        label: '三级 2-1-1',
                        id: 211
                    }]
                }, {
                    label: '二级 2-2',
                    id: 22,
                    children: [{
                        label: '三级 2-2-1',
                        id: 221
                    }]
                }]
            }, {
                label: '一级 3',
                id: 3,
                children: [{
                    label: '二级 3-1',
                    id: 31,
                    children: [{
                        label: '三级 3-1-1',
                        id: 311
                    }]
                }, {
                    label: '二级 3-2',
                    id: 32,
                    children: [{
                        label: '三级 3-2-1',
                        id: 321
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        handleNodeClick(tags) {
            console.log(tags)
        },
        inputChanged(value) {
            this.activeNames = value
        },
        getComponentData() {
            return {
                props: {
                    defaultProps: this.defaultProps
                }
            }
            // alert(this.defaultProps)
        },
        getdata(evt) {
            // return false
            console.log(evt.draggedContext.element.id)
        },
        datadragEnd(evt) {
            console.log('拖动前的索引 :' + evt.oldIndex)
            console.log('拖动后的索引 :' + evt.newIndex)
            console.log(this.tags)
        }
    }
}

</script>

<style>

</style>
