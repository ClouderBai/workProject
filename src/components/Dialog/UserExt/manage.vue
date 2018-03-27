/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-29 15:54:13 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:34:54
 */

/*
    @method open 打开模态框
*/
<template>
    <div>
        <el-dialog title="用户属性扩展" :visible="visible" @close="close">
            <!-- 按钮部分 -->
            <el-row class="margin-bottom-20">
                <div>
                    <el-button-group>
                        <el-button size="medium" icon="bimicon-playfill" @click="updateStatus(true)" :disabled="openBtn">启用</el-button>
                        <el-button size="medium" icon="bimicon-stop" @click="updateStatus(false)" :disabled="stopBtn">停用</el-button>
                        <el-button size="medium" icon="bimicon-add" @click="create">新增 </el-button>
                        <el-button size="medium" icon="bimicon-delete" @click="remove" :disabled="disabled">删除</el-button>
                    </el-button-group>
                </div>
            </el-row>

            <!-- 内容表格 -->
            <user-ext-table ref="table" type="selection" @selection-change="checkedChange"></user-ext-table>
        </el-dialog>
        <template>
            <!-- 模态框 -->
            <user-ext-base ref="base"></user-ext-base>
        </template>
    </div>
</template>

<script>
import DialogOptions from '../DialogOptions'
import userExtTable from '@/components/Table/UserExt/index'
import userExtBase from '@/components/Dialog/UserExt/base'

export default {
    name: 'userDutyManage',
    components: {
        userExtBase,
        userExtTable
    },
    computed: {
        disabled() {
            return this.selectedData.length === 0
        },
        openBtn() {
            return (
                this.selectedData.filter(v => {
                    return v.valid === false
                }).length === 0
            )
        },
        stopBtn() {
            return (
                this.selectedData.filter(v => {
                    return v.valid === true
                }).length === 0
            )
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
        // 更新状态 启用/停用
        updateStatus(status) {
            this.$refs.table.update(status)
        },
        // 删除职位类别
        remove() {
            this.$refs.table.remove()
        },
        // 表格checked事件
        checkedChange(selected) {
            this.selectedData = selected
        }
    }
}
</script>