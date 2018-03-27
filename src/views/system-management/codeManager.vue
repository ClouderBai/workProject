/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:16:24 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 18:05:13
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
                    <export-data 
                        fileName="编码备份.json" 
                        :propMethod="exportMethod" 
                        type="" 
                        btnName="备份"
                        size="medium" 
                        iconType="bimicon-down"
                        btnClass="custom-medium-btn primary-btn">
                    </export-data>
                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="importData">恢复</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="24">
                <!-- 编码 table -->
                <code-table @rowChange="onRowChange" @selectChange="onSelectChange" ref="codeTable"></code-table>
                <!-- 编码 dialog -->
                <code-dialog ref ="codeDialog"></code-dialog>
                <!-- 恢复（导入） -->
                <import-data  :uploadApi="uploadMehtod" ref="importData" @refresh="onRefresh"></import-data>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import codeTable from '@/components/Table/CodeManager'
import codeDialog from '@/components/Dialog/Code'
import DialogOptions from '@/components/Dialog/DialogOptions'
import exportData from '@/components/DownLoad'
import importData from '@/components/ImportData'
import { exportCode, importCode } from '@/api/code'
export default {
    name: 'codeManager',
    components: {
        codeTable,
        codeDialog,
        exportData,
        importData
    },
    computed: {
        // 控制删除按钮
        isDeletable() {
            return !(this.selectedData.length > 0)
        },
        // 控制修改按钮
        isEditable() {
            return !(Object.keys(this.tableRowData).length > 0)
        }
    },
    data() {
        return {
            tableRowData: {},
            selectedData: {},
            addData: '',
            exportMethod: exportCode, // 导出接口
            uploadMehtod: importCode // 导入接口
        }
    },
    methods: {
        onRowChange(row) {
            this.tableRowData = row
        },
        onSelectChange(val) {
            // 判断是否显示删除按钮
            this.selectedData = val
        },
        // 新增编码
        addCode() {
            this.$refs['codeDialog'].open()
            const self = this
            this.$refs['codeDialog'].onClosed = function(payload) {
                if (payload.option === DialogOptions.CONFIRM) {
                    if (payload.data) {
                        self.$refs['codeTable'].addCode(payload.data) // 接收dialog的新增code数据
                    }
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
        // 导入数据(按钮)
        importData() {
            this.$refs['importData'].importData()
        },
        // 刷新表格数据
        onRefresh(data) {
            this.$refs['codeTable'].refresh(data)
        }
    }
}
</script>

<style lang="scss" scoped></style>