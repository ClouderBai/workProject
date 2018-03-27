/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 10:21:51 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 17:37:45
 */
<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;cursor:pointer;"
        height="400"
        v-loading="loading"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="类别姓名"
            sortable>
        </el-table-column>
        <el-table-column
            prop="code"
            label="类别编码"
            sortable
            width="240"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="category"
            label="分类"
            sortable
            show-overflow-tooltip>
        </el-table-column>
    </el-table>
</template>
<script>
import {
    deletePosition, // 删除
    fetchAllPositionType,
    searchPositionByCondition
} from '@/api/org'
import OrgJobType from '@/model/OrgJobType'
export default {
    data() {
        return {
            tableData: [],
            loading: true,
            isSearched: false, // 是否搜索过
            currentRow: '', // 当前被选中的 table列
            multipleSelection: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getCategoryList()
        },
        // 初始化
        async getCategoryList() {
            this.loading = true
            this.isSearched = false
            this.tableData = await fetchAllPositionType()
            this.tableDataCopy = await fetchAllPositionType()
            this.loading = false
        },
        // 按照输入搜索
        searchByVal(data) {
            var _this = this
            searchPositionByCondition(data)
                .then(res => {
                    _this.tableData = res
                    _this.tableDataSearched = res
                    _this.isSearched = true // 判断是否 搜索过 用于table过滤
                    this.loading = false
                    _this.$message({
                        message: '查询成功',
                        type: 'success'
                    })
                })
                .catch(res => {
                    this.loading = false
                    _this.$message({
                        message: '查询失败',
                        type: 'error'
                    })
                })
        },
        refresh() {
            this.getCategoryList()
        },
        // 按照选择搜索
        searchBySelect(v) {
            let currentTable
            if (this.isSearched) {
                currentTable = this.tableDataSearched
            } else {
                currentTable = this.tableDataCopy
            }
            this.tableData = currentTable.filter(function(item) {
                return item.category === v
            })
        },
        handleCurrentChange(val) {
            this.currentRow = val
            this.$emit('tableCurrentRow', val)
        },
        remove() {
            var arr = []
            for (var i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].code)
            }
            deletePosition(arr)
                .then(res => {
                    this.$store.commit('CLOSE_WAITING')
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })

                    this.currentRow = ''
                    this.getCategoryList()
                })
                .catch(err => {
                    this.$store.commit('CLOSE_WAITING')
                    this.$message.error(`删除失败: ${err.message}`)
                })
        },
        // table多选个数
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.$emit('tableSelection', val)
        },
        insert(item) {
            console.log(item)
            if (!(item instanceof OrgJobType)) {
                item = new OrgJobType().init(item)
            }
            this.tableData.push(item)
        }
    }
}
</script>
<style>

</style>
