/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-23 14:21:14 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-26 15:44:44
 */

/**
|--------------------------------------------------
|
|  表单权限设置弹窗
|
|--------------------------------------------------
*/

/*
@method open 打开模态框
@param {*Object}
    (1) title  模态框标题
        *nodeData  node节点对象
        *formId  选中的表单id
 
@method onClosed 模态框关闭时回调方法
@param {*Object}
    (1) *option  模态框关闭状态
        *sender  组件this指向
        data     返回数据
 */

 
<template>
    <div class="permission-form-container">
        <el-dialog :title="title" :visible="visible" @close="close" append-to-body v-if="visible">
            <ul class="form-baseinfo">
                <li>
                    <span>当前节点：</span>
                    <p>{{ currentDom || '未填写' }}</p>
                </li>
                <li>
                    <span>表单编码：</span>
                    <p>{{ formData.formCode || '未填写' }}</p>
                </li>
                <li>
                    <span>表单名称：</span>
                    <p>{{ formData.formName || '未填写' }}</p>
                </li>
                <li>
                    <span>所属节点：</span>
                    <p>{{ formData.belongedToNodeDisplayName || '未填写' }}</p>
                </li>
                <li>
                    <span>设置全部权限：</span>
                    <el-radio-group v-model="submitData.radioType" @change="permissionChange">
                        <el-radio label="Operable">可操作</el-radio>
                        <el-radio label="Read">只读(显示)</el-radio>
                        <el-radio label="Hide">隐藏</el-radio>
                    </el-radio-group>
                </li>
            </ul>
            <!-- form-element-form -->
            <permission-table :data="formElementData" :permission="permissionType" @permission="onPermission" ref="permissionTable"></permission-table>
            <!-- 确认取消 -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DialogOptions from '../DialogOptions'
import permissionTable from '@/components/Table/FlowDesigner/formPermission'

export default {
    name: 'formPermission',
    components: {
        permissionTable
    },
    data() {
        return {
            visible: false,
            onClosed: function() {},
            title: '表单权限设置',
            submitData: {
                radioType: 'Operable' // 设置全部权限 默认值为自定义
            },
            formData: {}, // 表单数据
            formElementData: [], // 表单元素数据
            permissionType: '', // 权限类型
            currentDom: '' // 当前节点
        }
    },
    methods: {
        open({ title = '表单权限设置', nodeData, formId }) {
            if (this.visible) return
            if (!nodeData) return console.error(`该组件open方法必须传入nodeData`)
            if (!formId) return console.error(`该组件open方法必须传入formId`)
            this.title = title
            this.visible = true
            // 获取当前点击的表单数据
            nodeData.customerFormDefines.forEach(v => {
                if (v.formId === formId) {
                    this.formData = v
                }
            })
            this.currentDom = nodeData.label // 获取当前节点
            this.formElementData = this.formData.formElements // 获取表单元素数据
        },
        close(option = DialogOptions.CLOSE, data) {
            if (!this.visible) return
            this.visible = false
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    sender: this,
                    data: this.resData
                }
                this.onClosed.call(this, payload) // eslint-disable-line
            }
        },
        confirm() {
            this.close(DialogOptions.COMFIRM, this.formData)
        },
        cancel() {
            this.close(DialogOptions.CANCEL)
        },
        // 监听权限类型
        permissionChange(type) {
            this.permissionType = type
        },
        // 权限赋值
        onPermission(val) {
            this.formData.formElements.forEach((v, i) => {
                v.formElementAuthority = val[i]
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.form-baseinfo {
        list-style-type: none;
        display: flex;
        flex-flow: row wrap;

        li {
            width: 50%;
            margin-bottom: 8px;
            span {
                font-weight: bold;
                display: inline-block;
                text-align: right;
                color: #333333;
                font-size: 14px;
                margin-right: 15px;
            }
            p {
                display: inline;
                font-style: 12px;
            }
        }
}
</style>
