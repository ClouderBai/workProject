/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:16:24 
 * @Last Modified by:   zhanglianhao 
 * @Last Modified time: 2018-03-20 17:16:24 
 */
/**
|--------------------------------------------------
| 编码服务
|--------------------------------------------------
*/
<template>
    <div class="code-container">
        <el-row>
            <el-col :span="24">
                <el-button-group class="margin-bottom-20">
                    <el-button size="medium" icon="bimicon-roundaddlight" @click="addCode" class="custom-medium-btn primary-btn">
                        新建
                    </el-button>
                    <el-button size="medium" :disabled="isEditable" icon="bimicon-edit" @click="editCode" class="custom-medium-btn primary-btn">
                        修改
                    </el-button>
                    <el-button size="medium" :disabled="isDeletable" icon="bimicon-delete" @click="removeCode" class="custom-medium-btn red-btn">
                        删除
                    </el-button>
                </el-button-group>
                <el-button-group class="margin-bottom-20 float-right">
                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="backup">备份</el-button>
                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="recovery">恢复</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="24">
                <codeTable @rowChange="onRowChange" @selectChange="onSelectChange" ref="codeTable"></codeTable>
                <codeDialog ref ="codeDialog"></codeDialog>
                <backup @uploadFile="onImportData" ref="backup"></backup>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import codeTable from '@/components/Table/CodeManager'
import codeDialog from '@/components/Dialog/Code'
import DialogOptions from '@/components/Dialog/DialogOptions'
import backup from '@/components/Backup'
import { exportCode, importCode } from '@/api/code'
export default {
    name: 'codeManager',
    components: {
        codeTable,
        codeDialog,
        backup
    },
    data() {
        return {
            tableRowData: {},
            isEditable: true,
            isDeletable: true,
            addData: ''
        }
    },
    methods: {
        onRowChange(row) {
            this.tableRowData = row
            this.isEditable = false
        },
        onSelectChange(val) {
            this.isDeletable = false
        },
        // 新增编码
        addCode() {
            this.$refs['codeDialog'].open()
            const self = this
            this.$refs['codeDialog'].onClosed = function(payload) {
                if (payload.option === DialogOptions.CONFIRM) {
                    self.$refs['codeTable'].addCode(payload.data) // 接收dialog的新增code数据
                }
            }
        },
        // 修改编码
        editCode() {
            this.$refs['codeDialog'].open({ data: this.tableRowData })
        },
        // 删除编码
        removeCode() {
            this.$refs['codeTable'].remove()
        },
        // 恢复
        recovery() {
            this.$refs['backup'].importData()
        },
        // 备份(导出)
        async backup() {
            try {
                const data = await exportCode()
                this.$refs['backup'].exportData(data)
            } catch (e) {
                console.warn(`备份: ${e}`)
            }
        },
        // 恢复(导入)
        async onImportData(file, dom) {
            try {
                const formData = new FormData()
                formData.append('file', file)
                await importCode(formData)
                this.$message.success('恢复成功! ')
            } catch (e) {
                this.$message.error('恢复失败! ')
                console.warn(`恢复数据: ${e}`)
            } finally {
                dom.value = '' // 清除文件
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>