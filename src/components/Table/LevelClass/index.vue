<template>
    <div>
        <el-row>
                <el-table
                        ref="multipleTable"
                        :data="classData"
                        style="width: 100%;cursor:pointer;"                   
                        border
                        highlight-current-row
                        @row-click="choseRow"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            :type="type"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="类别名称"
                            prop="name"
                            align="center"
                            width="400">
                        </el-table-column>
                        <el-table-column
                            label="类别编码"
                            prop="code"
                            align="center"                    
                        >
                        </el-table-column>
                </el-table>
        </el-row>
    </div>
</template>

<script>
import { fetchLevelInfo, searchLevelInfo, deleteLevelData } from '@/api/org'

export default {
    props: [
        'type' // 表格类型
    ],
    data() {
        return {
            classData: [], // 页面表格数据
            selectedData: '', // 多选选中数据
            editedData: '' // 单选修改数据
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 数据加载
        init() {
            fetchLevelInfo().then(res => {
                this.classData = res
            }).catch(err => {
                console.warn('级别类别获取数据错误', err)
            })
        },

        // 搜索
        search(key) {
            searchLevelInfo({
                filter: key
            }).then(res => {
                this.classData = res
            })
        },

        // 单击选中
        choseRow(row) {
            this.$emit('row-click', row)
        },

        // checkbox选中
        handleSelectionChange(selection) {
            this.$emit('selection-change', selection)
            this.selectedData = selection
        },

        // 新增数据
        insertData(ev) {
            this.classData.push(ev)
        },

        // 删除
        remove() {
            // 获取选中id
            const codes = []
            this.selectedData.forEach(value => {
                codes.push(value.code)
            })
            this.selectedData = ''
            this.$confirm('此操作将删除该级别类别, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('SHOW_WAITING')
                deleteLevelData(codes).then(res => {
                    this.$message({ type: 'success', message: '删除成功' })
                    this.init()
                    this.editedData = ''
                    this.$store.commit('CLOSE_WAITING')
                }).catch(err => {
                    console.warn('删除级别类别错误', err)
                    this.$store.commit('CLOSE_WAITING')
                    if (err.message) {
                        this.$message.error(err.message)
                    }
                })
            })
        }

    }
}
</script>

<style scoped>

</style>
