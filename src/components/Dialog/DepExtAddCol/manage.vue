<template>
    <div>
        <el-dialog 
            :title="title" 
            :visible="visible" 
            @close="close">
            <!-- 按钮部分 -->
            <el-row style="text-align: left; margin-bottom: 20px">
                <el-button-group>
                    <el-button :disabled="disabled" @click="updateOrgState(true)">
                        <svg-icon icon-class="start" />启用
                    </el-button>
                    <el-button :disabled="disabled" @click="updateOrgState(false)">
                        <svg-icon icon-class="stop" />停用
                    </el-button>
                    <el-button @click="openInsert">
                        <svg-icon icon-class="insert" />新增  
                    </el-button>
                    <el-button :disabled="disabled" @click="delOrgProps">
                        <svg-icon icon-class="delete" />删除
                    </el-button>
                </el-button-group>
            </el-row>
            <!-- 内容表格 -->
            <orgPropsTable type="selection" ref="contentTable" @selection-change="handleSelectionChange"/>
            <!-- 新增 -->
            <insertOrgProp ref='createOrgProp'/>
        </el-dialog>
    </div>
</template>

<script>
import orgPropsTable from '@/components/Table/DepExtAddCol'
import insertOrgProp from '@/components/Dialog/DepExtAddCol/base'
import dialogOptions from '../DialogOptions'

export default {
    components: {
        orgPropsTable,
        insertOrgProp
    },
    computed: {
        disabled() {
            return !(this.selectedData != '') // eslint-disable-line
        }
    },
    data() {
        return {
            visible: false,
            title: '组织扩展属性维护',
            selectedData: ''
        }
    },
    methods: {
        // 打开
        open(option) {
            if (this.visible) return this
            this.visible = true
            if (option) {
                this.title = option.title || '级别类别维护'
            }
        },

        // 打开新增
        openInsert() {
            this.$refs.createOrgProp.open()
            this.$refs.createOrgProp.onClosed = args => {
                if (args.option == dialogOptions.CONFIRM) {    // eslint-disable-line
                    this.$refs.contentTable.insertData(args.data)
                }
            }
        },

        // 关闭
        close() {
            if (!this.visible) return
            this.visible = false
        },

        // 多选选中
        handleSelectionChange(selection) {
            this.selectedData = selection
        },

        // 启用 停用
        updateOrgState(ev) {
            this.$refs.contentTable.updateOrgState(ev)
        },

        // 删除
        delOrgProps() {
            this.$refs.contentTable.remove()
        }
    }
}
</script>

<style scoped>

</style>
