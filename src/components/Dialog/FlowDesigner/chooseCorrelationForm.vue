/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-23 09:49:18 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-26 11:50:30
 */

/**
|--------------------------------------------------
|
|  选择关联表单组件
|
|--------------------------------------------------
*/

@method open(*Object) 打开模态框
@params (1) title 标题  默认为"添加关联表单"
            *uuid node节点唯一标识
 
@method close(String,Object) 关闭模态框
@params (1) option 模态框关闭状态
        (2) hold 是否保持模态框显示状态 

@method onClosed(*Object) 模态框点击确认按钮时关闭时回调方法
@params (1) *option  模态框关闭状态
            *sender  组件this指向
            data     返回数据
 */


<template>
    <div class="components-container">
        <el-dialog :title="title" :visible="visible" @close="close()" width="80%" append-to-body>
            <el-row>
                <!-- 表格模块开始 -->
                <el-col :span="24" class="margin-bottom-20">
                    <correlationFormToChoose v-if="visible" :uuid="uuid" ref="formTable" @row-click="formTableClick"></correlationFormToChoose>
                </el-col>
                <!-- 表格模块结束 -->
            </el-row>
            <!-- 确认取消 -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel()">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import correlationFormToChoose from '@/components/Table/FlowDesigner/correlationFormToChoose' // 表单列表
import DialogOptions from '../DialogOptions'

export default {
    name: 'chooseCorrelationForm',
    components: {
        correlationFormToChoose
    },
    data() {
        return {
            visible: false,
            onClosed: function() {},
            uuid: '', // node节点唯一标识
            title: '添加关联表单',
            targetData: {}
        }
    },
    methods: {
        open({ title = '添加关联表单', uuid }) {
            if (!uuid) return console.warn(`该组件open方法必须传入uuid`)
            this.title = title
            this.uuid = uuid
            this.visible = true
        },

        close(option = DialogOptions.CLOSE, hold) {
            if (!this.visible) return
            if (!hold) {
                this.visible = false
            }
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    sender: this,
                    data: this.targetData
                }
                this.onClosed(payload)
            }
        },

        confirm() {
            if (!this.targetData.formId) {
                this.$message.warning('请选择表单')
                return
            }
            this.close(
                DialogOptions.CONFIRM,
                true
            )
        },

        cancel() {
            this.close(DialogOptions.CANCEL)
        },

        // 表单点击事件触发
        formTableClick(target) {
            this.targetData = target
        }
    }
}
</script>

<style  scoped lang="scss">
.tree-card,
.table-card {
    height: 600px;
}

.orgSearchInput,
.userSearchInput {
    margin-top: 10px !important;
}

.userSearchInput {
    width: 200px;
}

.treeRow {
    margin-top: 20px;
}

.user-table-btn {
    margin-top: 10px;
}

.swichBtn {
    font-size: 11px;
}
</style>
