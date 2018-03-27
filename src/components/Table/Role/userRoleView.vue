/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 13:28:41 
 * @Last Modified by:   zhanglianhao 
 * @Last Modified time: 2018-03-20 13:28:41 
/**
|--------------------------------------------------
| 新建用户角色列表
|--------------------------------------------------
*/ */

<template>
    <div class="view-container">
        <el-table 
            ref="roleTable"
            :data="data" 
            style="width: 100%;cursor:pointer;" 
            stripe 
            border 
            highlight-current-row 
            @selection-change="handleSelectedChange" 
            v-loading="loading" 
            :height="height">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="组织" prop="orgFullName" align="center" v-if="showOrg"></el-table-column>
            <el-table-column label="编码" prop="code" align="center" v-if="showCode"></el-table-column>
            <el-table-column label="角色名" prop="name" align="center"></el-table-column>
            <el-table-column label="描述" prop="desc" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'roleView',
    props: {
        data: {
            type: Array,
            default: []
        },
        height: {
            type: Number,
            default: 400
        },
        showOrg: {
            type: Boolean,
            default: false
        },
        showCode: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        // 多选
        handleSelectedChange(selected) {
            this.$emit('selectedChange', selected)
        },
        // 多选默认选中
        toggleSelect(rows) {
            rows.forEach(row => void this.$refs['roleTable'].toggleRowSelection(row, true))
        },
        // 清除选中角色
        clearSelect() {
            this.$refs['roleTable'].clearSelection()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
