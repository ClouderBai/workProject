/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:14:54 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:15:24
 */

/**
|--------------------------------------------------
| 显示所有编码 table
|--------------------------------------------------
*/
<template>
    <div class="code-container">
        <el-row>
            <el-col :span="24">
                <!-- table-start -->
                <el-table
                    ref="multipleTable"
                    :data="data"
                    stripe
                    tooltip-effect="dark"
                    style="width: 100%"
                    highlight-current-row
                    @row-click="handleRowClick"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange($event)">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="code" label="编码"></el-table-column>
                    <el-table-column prop="format" label="格式"></el-table-column>
                    <el-table-column prop="desc" label="备注"></el-table-column>
                </el-table>
                <!-- table-end -->
            </el-col>
            <el-col :span="24">
                <!-- pagination-start -->
                <el-pagination
                    class="margin-top-20"
                    background
                    :total="total"
                    :current-page="pageNo"
                    :page-size="pageSize"
                    :page-sizes="pageSizes"
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
                <!-- pagination-end -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { fetchAllCode, deleteCodes } from '@/api/code'
export default {
    name: 'codeTable',
    props: {},
    data() {
        return {
            data: [],
            pageNo: 1,
            pageSize: 10,
            total: 0,
            pageSizes: [10, 20, 50, 100],
            selectedIds: [], // 选中的id
            selected: [], // 选中的row
            entityCount: 0 // 编码总条数
        }
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex // 把每一行的索引放进row
        },
        // 监听页码
        currentChange(no) {
            this.pageNo = no
            this.getTableData()
        },
        // 监听每页显示条数
        sizeChange(size) {
            this.pageSize = size
            this.getTableData()
        },
        // 获取编码
        async getTableData() {
            try {
                const params = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }
                const data = await fetchAllCode(params)
                this.total = data.entityCount
                this.data = data.entities
                this.entityCount = data.entityCount
            } catch (e) {
                console.warn(`获取编码: ${e}`)
            }
        },
        // 行点击事件
        handleRowClick(row) {
            this.$emit('rowChange', row)
        },
        // 多选
        handleSelectionChange(val) {
            this.selectedIds = val.map(v => v.id)
            this.selected = val
            this.$emit('selectChange', val)
        },
        // 删除编码
        async remove(ids = this.selectedIds) {
            if (ids.length === 0) {
                this.$message.warning('请选择要删除的编码!')
                return
            }
            try {
                await this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })

                try {
                    await deleteCodes(ids)
                    /* this.selected.forEach(v => {
                        this.data.splice(v.index, 1)
                        this.total -= 1
                    }) */
                    this.getTableData()
                    this.$message.success('删除成功！')
                } catch (e) {
                    this.$message.error('删除失败!')
                    console.warn(`删除编码：${e}`)
                }
            } catch (e) {
                console.log(e)
            }
        },
        // 新增成功后不刷新列表，直接push到data中
        addCode(data) {
            // 判断是否超过分页每页显示条数
            this.total += 1
            if (this.data.length >= this.pageSize) return
            this.data.push(data)
        }
    }
}
</script>

<style lang="scss" scoped></style>