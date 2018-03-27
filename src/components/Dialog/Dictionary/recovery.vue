/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 14:14:22 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 13:38:15
 */

/**
|--------------------------------------------------
| 数据字典恢复
|--------------------------------------------------
*/
<template>
    <el-dialog :visible="visible" @close="close" width="50%">
        <span slot="title">数据字典恢复</span>
        <el-table 
            :data="tableData" 
            border
            style="width: 100%;height:400px;overflow-y:auto;" 
            highlight-current-row
            @row-click="handleRowClick">
            <el-table-column type="index" width="55" align="center"></el-table-column>
            <el-table-column prop="fileName" label="文件名" align="center"></el-table-column>
            <el-table-column prop="createDate" label="日期" align="center"></el-table-column>
            <el-table-column prop="id" label="备注" align="center"></el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getBackupList, reductionDictionary } from '@/api/dictionary'
import DialogOptions from '@/components/Dialog/DialogOptions'
export default {
    name: 'dictionary-recovery',
    data() {
        return {
            onClosed() {},
            visible: false,
            tableData: [],
            rowData: {}
        }
    },
    methods: {
        open() {
            if (this.visible) return
            this.visible = true
            this.getDictionaryList()
        },
        close() {
            if (!this.visible) return
            this.visible = false
        },
        cancel() {
            this.close(DialogOptions.CANCEL)
        },
        confirm() {
            this.recoverData()
        },
        // 获取数据字典备份列表
        async getDictionaryList() {
            try {
                this.tableData = await getBackupList()
            } catch (e) {
                console.warn(`获取数据字典备份列表: ${JSON.stringigy(e)}`)
            }
        },
        handleRowClick(row) {
            this.rowData = row
        },
        // 恢复数据
        async recoverData() {
            try {
                await reductionDictionary(this.rowData.id)
                this.$message.success('恢复成功')
                this.close(DialogOptions.CONFIRM)
            } catch (e) {
                this.$message.error(`恢复失败: ${e.message}`)
                console.warn(`恢复数据: ${JSON.stringigy(e)}`)
            }
        }
    }
}
</script>

<style>

</style>
