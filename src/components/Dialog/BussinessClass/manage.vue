/*
 * @Author: ShaXin 
 * @Date: 2018-01-22 12:00:51 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 17:46:02
 */
<template>
    <div>
        <el-dialog title="业务类别维护" :visible="visible" @close="close" v-if="visible">
            <!-- 类别按钮 -->
            <el-row style="text-align: left">
                <div class="allWrap">
                    <el-button-group>
                        <el-button @click="openAdd">
                            <svg-icon icon-class="insert" />新增
                        </el-button>
                        <el-button @click="openEdit" :disabled="canModify">
                            <svg-icon icon-class="edit" />修改
                        </el-button>
                        <el-button @click="del" :disabled="canDel">
                            <svg-icon icon-class="delete" />删除
                        </el-button>
                    </el-button-group>
                    <!--  查询 输入框和按钮 -->
                    <div class="searchWrap" style="float:right">
                        <el-input v-model="searchVal" placeholder="搜索" style="width: 200px" @keyup.enter.native='searchByVal'>
                            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchByVal"></i>
                        </el-input>
                    </div>
                </div>
            </el-row>
            <dia-bussiness-table ref="table" @tableCurrentRow="getCurrentRow" @tableSelection="getSelection"></dia-bussiness-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancel()">关 闭</el-button>
            </div>
        </el-dialog>

        <template>
            <dia-bussiness-dia ref="busDia"></dia-bussiness-dia>
        </template>
    </div>
</template>

<script>
import DialogOptions from '../DialogOptions'
import diaBussinessDia from './base'
import diaBussinessTable from '@/components/Table/BussinessClass/index'
export default {
    components: {
        diaBussinessDia,
        diaBussinessTable
    },
    computed: {
        canModify() {
            return !(Object.keys(this.currentRow).length > 0)
        },
        canDel() {
            return this.multipleSelection.length < 1
        }
    },
    data() {
        return {
            typeForm: {},
            rules: {},
            visible: false,
            bussinessDia: false, // 弹窗值
            formLabelWidth: '120px',
            searchVal: '', // 查询的值
            currentRow: {}, // 被选中的table行
            multipleSelection: []
        }
    },
    methods: {
        openAdd() {
            this.$refs['busDia'].open()
            this.$refs['busDia'].onClosed = args => {
                if (args.option === DialogOptions.CONFIRM) {
                    if (args.data) {
                        this.$refs.table.insert(args.data)
                    }
                    // this.$store.dispatch('getMenuFromOpt')
                }
            }
        },
        // 打开弹窗
        openEdit() {
            this.$refs['busDia'].open({ data: this.currentRow })
        },
        open() {
            this.visible = true
        },
        close() {
            this.searchVal = ''
            this.visible = false
        },
        cancel() {
            this.close()
        },
        getCurrentRow(v) {
            this.currentRow = v
        },
        getSelection(v) {
            this.multipleSelection = v
        },
        // 搜索
        searchByVal() {
            this.$refs.table.searchByVal(this.searchVal)
        },
        // 删除
        del() {
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$store.commit('SHOW_WAITING')
                    this.$refs.table.deleteTableCell()
                })
                .catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' })
                })
        }
    }
}
</script>

<style scoped>
.mabot30 {
    margin-bottom: 20px;
}
</style>
