/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 10:21:56 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 15:09:59
 */

/*
    事件
    @event row-click 点击行时触发
    @return 选中数据对象

    @event selection-change 多选改变时触发
    @return 选中数据集合
*/

/*
    方法
    @method refreshList(String) 刷新列表数据
        (1) 搜索值
    
    @method insert(*Object) 在列表最后插入元素
        (1) 要插入的元素  可以是普通对象  也可以Duty对象
    
    @method remove() 删除check-box选中的元素
 */


<template>
  <!-- 列表 -->
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
            label="类别姓名">
        </el-table-column>
        <el-table-column
            prop="code"
            label="类别编码"
            width="240"
            show-overflow-tooltip>
        </el-table-column>
    </el-table>
</template>
<script>
import {
    fetchTableData,
    deleteBizType,
    searchBizTypeByCondition
} from '@/api/org'
import OrgBusType from '@/model/OrgBusType'
export default {
    data() {
        return {
            multipleSelection: [], // 多选值
            tableData: [], // b表格数据
            tableDataCopy: [], // b表格数据拷贝
            loading: true // table
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 初始化
        init() {
            this.getBussinessList()
        },
        async getBussinessList() {
            this.loading = true
            this.tableData = await fetchTableData()
            this.loading = false
        },

        // 搜索
        async searchByVal(v) {
            this.loading = true
            var data = {
                filter: v
            }
            this.tableData = await searchBizTypeByCondition(data)
            this.loading = false
        },

        // 多选列表
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.$emit('tableSelection', val)
        },

        // 选择table表格
        handleCurrentChange(val) {
            this.currentRow = val
            this.$emit('tableCurrentRow', val)
        },
        getCurrentRow() {
            return this.currentRow
        },
        // 删除表格
        deleteTableCell() {
            var arr = []
            for (var i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].code)
            }
            deleteBizType(arr)
                .then(res => {
                    this.$store.commit('CLOSE_WAITING')
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.currentRow = ''
                    this.getBussinessList()
                })
                .catch(err => {
                    this.$store.commit('CLOSE_WAITING')
                    this.$message.error(`删除失败: ${err.message}`)
                })
        },
        insert(item) {
            console.log(item)
            if (!(item instanceof OrgBusType)) {
                item = new OrgBusType().init(item)
            }
            this.tableData.push(item)
        }
    }

}
</script>
<style>

</style>
