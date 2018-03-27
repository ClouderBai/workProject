/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-14 15:13:58 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-26 18:07:23
 */

<template>
    <el-table 
        :data="data" 
        style="width: 100%" 
        :height="height"
        stripe
        border
        @row-click="handleCurrentChange"
        tooltip-effect="dark"
        highlight-current-row
        v-loading="loading"
        :row-style="showTr">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
                <el-button type="text" size="medium" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-arrow-right"></i>
                    <i v-if="scope.row._expanded" class="el-icon-arrow-down"></i>
                </el-button>
                <span v-else-if="index===0" class="ms-tree-space"></span>
                {{scope.row[column.dataIndex]}}
            </template>
        </el-table-column>
    </el-table>
</template>


<script>
import dataTransfer from './dataTranslate'
export default {
    name: 'treeGrid',
    props: {
        // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        treeStructure: {
            type: Boolean,
            default: true
        },
        // 是否默认展开所有
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        // 相应的字段展示
        columns: {
            type: Array,
            default: () => ([
                {
                    text: '全码',
                    dataIndex: 'fullCode'
                },
                {
                    text: '短码',
                    dataIndex: 'code'
                },
                {
                    text: '名称',
                    dataIndex: 'name'
                },
                {
                    text: '默认值',
                    dataIndex: 'defaultDictKey'
                }
            ])
        },
        // 原始表格数据
        dataSource: {
            type: Array,
            default: []
        },
        // loading
        loading: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 700
        }
    },
    computed: {
        data() {
            if (this.treeStructure) {
                const data = dataTransfer.treeToArray(this.dataSource, null, null, this.defaultExpandAll)
                return data
            }
            return this.dataSource
        }
    },
    data() {
        return {}
    },
    methods: {
        // 显示层级关系的空格和图标
        spaceIconShow(index) {
            if (this.treeStructure && index === 0) {
                return true
            }
            return false
        },
        // 点击展开和关闭的时候，图标的切换
        toggleIconShow(index, record) {
            if (this.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
            }
            return false
        },
        // 展开下级
        toggle(trIndex) {
            const record = this.data[trIndex]
            record._expanded = !record._expanded
        },
        // 显示行
        showTr(row, index) {
            const rowData = row.row
            const show = (rowData._parent ? (rowData._parent._expanded && rowData._parent._show) : true)
            rowData._show = show
            return show ? '' : 'display:none;'
        },
        // 监听行当前行改变事件
        handleCurrentChange(row) {
            this.$emit('rowChange', row)
        }
    }
}
</script>

<style lang="scss" scoped>
.ms-tree-space{
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
}
.ms-tree-space::before{
    content: "";
}
table td{
    line-height: 26px;
}
</style>

