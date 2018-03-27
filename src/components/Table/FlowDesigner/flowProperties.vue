/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-26 13:41:23 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 11:59:03
 */
/**
|--------------------------------------------------
| 展示当前任务流表单信息
|--------------------------------------------------
*/

/* 
    属性
    @prop type
    @type String
    @default ''
        selection  多选框
        index      序号
        expand     展开

    @prop height
    @type Number
    @default 300
        表格高度 

    @prop data
    @type Array
    @default []
        form表单元素

    @prop permission
    @type String
    @default 'Operable'
        设置全部权限的 radio 值
*/
<template>
    <div class="container">
        <el-table 
            v-loading="loading" 
            :data="data" 
            :type="type"
            :height="height" 
            style="cursor:pointer;" 
            highlight-current-row 
            border 
            stripe>
            <el-table-column :type="type" v-if="type" width="55" align="center"></el-table-column>
            <el-table-column prop="formCode" label="表单编码" align="center"></el-table-column>
            <el-table-column prop="formName" label="表单名称" align="center"></el-table-column>
            <el-table-column prop="domeName" label="任务节点" align="center"></el-table-column>
        </el-table>
    </div>
</template>
 
 <script>
export default {
    name: 'flowProperties',
    props: {
        type: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default: () => []
        },
        height: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            loading: false
        }
    }
}
</script>
 
<style lang="scss" scoped>
 
</style>
 