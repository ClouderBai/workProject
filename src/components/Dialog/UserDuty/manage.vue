/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-27 11:13:43 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:33:32
 */

/*
    @method open 打开模态框
*/
<template>
    <div>
        <el-dialog title="职位类别维护" :visible="visible" @close="close">
            <!-- 按钮部分 -->
            <el-row>
                <div>
                    <el-button-group>
                        <!-- <el-button size="medium" icon="bimicon-roundaddlight" @click="openDetail"> 新建</el-button> -->
                        <el-button size="medium" icon="bimicon-add" @click="create">新增</el-button>
                        <el-button size="medium" icon="bimicon-write" @click="update" :disabled="editBtnDisabled">修改
                            <!-- <svg-icon icon-class="edit" />修改 -->
                        </el-button>
                        <el-button size="medium" icon="bimicon-delete" @click="remove" :disabled="removeBtnDisabled">删除</el-button>
                    </el-button-group>
                    <!-- 搜索 -->
                    <el-form :model="searchFormData" @submit.native.prevent class="float-right">
                        <el-form-item>
                            <el-input placeholder="请输入搜索内容" v-model.trim="searchFormData.value" @keyup.enter.native.prevent='search'>
                                <el-button type="primary" slot="append" icon="el-icon-search" @click="search()">
                                </el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-row>

            <!-- 内容表格 -->
            <user-duty-table ref="table" type="selection" @selection-change="checkedChange" @row-click="rowClick"></user-duty-table>
        </el-dialog>
        <template>
            <!-- 模态框 -->
            <user-duty-base ref="base"></user-duty-base>
        </template>
    </div>
</template>

<script>
import DialogOptions from '../DialogOptions'
import userDutyTable from '@/components/Table/UserDuty/index'
import userDutyBase from '@/components/Dialog/UserDuty/base'

export default {
    name: 'userDutyManage',
    components: {
        userDutyTable,
        userDutyBase
    },
    computed: {
        removeBtnDisabled() {
            return this.selectedData.length === 0
        },
        editBtnDisabled() {
            return !this.targetData.id
        }
    },
    watch: {
        'searchFormData.value': {
            handler(val) {
                if (!val) {
                    this.search()
                }
            },
            deep: true
        }
    },
    data() {
        return {
            visible: false,
            searchFormData: {
                value: ''
            },
            selectedData: [],
            targetData: {}
        }
    },

    methods: {
        open() {
            this.visible = true
        },

        close() {
            this.visible = false
        },

        create() {
            this.$refs.base.open()
            this.$refs.base.onClosed = function(args) {
                if (args.option === DialogOptions.CONFIRM) {
                    this.$refs.table.insert(args.data)
                }
            }.bind(this)
        },

        update() {
            this.$refs.base.open({ data: this.targetData })
        },

        // 删除职位类别
        remove() {
            this.$refs.table.remove()
        },

        search() {
            this.$refs.table.refreshList(this.searchFormData.value)
        },

        // 表格checked事件
        checkedChange(selected) {
            this.selectedData = selected
        },

        // 表格选中行事件
        rowClick(target) {
            this.targetData = target
        }
    }
}
</script>