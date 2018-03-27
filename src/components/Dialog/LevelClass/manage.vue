<template>
    <div>
        <el-dialog 
            :title="title" 
            :visible="visible" 
            @close="close">
            <!-- 按钮部分 -->
            <el-row style="text-align: center">
                <div class="allWrap">
                    <el-button-group>
                        <el-button @click="openInsert">
                            <svg-icon icon-class="insert" />新增
                        </el-button>
                        <el-button :disabled="editBtn" @click="openEdit">
                            <svg-icon icon-class="edit" />修改
                        </el-button>
                        <el-button :disabled="disabled" @click="delClass">
                            <svg-icon icon-class="delete" />删除
                        </el-button>
                    </el-button-group>
                    <!-- 搜索 -->
                    <el-form :model="searchData" @submit.native.prevent>
                        <el-form-item>
                            <el-input 
                            placeholder="请输入搜索内容" 
                            v-model.trim="searchData.value" 
                            @keyup.enter.native.prevent="search(searchData.value)">
                                <el-button 
                                    type="primary"
                                    slot="append" 
                                    icon="el-icon-search" 
                                    @click="search(searchData.value)">
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-row>

            <!-- 内容表格 -->
            <levelClassTable type="selection" @row-click="rowClick" @selection-change="handleSelectionChange" ref="contentTable" />

            <!-- 二级弹框 -->
            <diaLevelClass ref="createLevelClass" />
            <diaLevelClass ref="updateLevelClass" />
        </el-dialog>
    </div>
</template>

<script>
import diaLevelClass from '@/components/Dialog/LevelClass/base'
import levelClassTable from '@/components/Table/LevelClass'
import MdInput from '@/components/MDinput'
import dialogOptions from '../DialogOptions'

export default {
    components: {
        diaLevelClass,
        levelClassTable,
        MdInput
    },
    computed: {
        disabled() {
            return !(this.selectedData.length >= 1)
        },
        editBtn() {
            return !(this.editedData != '') // eslint-disable-line
        }
    },
    data() {
        return {
            title: '级别类别维护',
            visible: false,
            selectedData: '', // 多选选中数据
            editedData: '', // 单选修改数据
            searchData: { // 搜索内容
                value: ''
            }
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

        // 关闭
        close() {
            if (!this.visible) return
            this.visible = false
        },

        // 搜索
        search(key) {
            this.$refs.contentTable.search(key)
            this.editedData = ''
            this.selectedData = ''
        },

        // 打开新增页面
        openInsert() {
            this.$refs.createLevelClass.open()
            // 添加成功回调
            this.$refs.createLevelClass.onClosed = args => {
                if (args.option == dialogOptions.CONFIRM) { // eslint-disable-line
                    this.$refs.contentTable.insertData(args.data)
                    this.$store.dispatch('getMenuFromOpt')
                }
            }
        },

        // 单击选中
        rowClick(row) {
            this.editedData = row
        },

        // 打开修改页面
        openEdit() {
            this.$refs.updateLevelClass.open({
                title: '修改级别类别',
                data: this.editedData
            })
            this.$refs.updateLevelClass.onClosed = function(args) {
                this.$store.dispatch('getMenuFromOpt')
            }
        },

        // checkbox选中
        handleSelectionChange(selection) {
            this.selectedData = selection
        },

        // 删除
        delClass() {
            this.$refs.contentTable.remove()
        }
    }
}
</script>

<style scoped>
.allWrap {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}
</style>
