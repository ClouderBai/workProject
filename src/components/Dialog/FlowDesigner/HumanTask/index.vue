/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-14 13:41:38 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-26 18:18:27
 */

/**
|--------------------------------------------------
|
|  人工任务弹窗
|
|--------------------------------------------------
*/

@method open(*Object) 打开模态框
@params (1) title 标题  默认为"人工任务"
            *uuid node节点唯一标识

<template>
    <div>
        <el-dialog :title="title" :visible="visible" @close="close" v-if="visible">
            <!-- form-start -->
            <el-form :model="humanTaskForm" :rules="rules" ref="humanTaskForm" label-width="130px" :validate-on-rule-change="false">
                <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
                    <!-- 基本设置-start -->
                    <el-tab-pane label="基本设置" name="first">
                        <el-form-item label="节点名称：" prop="name">
                            <el-input v-model="humanTaskForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="显示名称：" prop="label">
                            <el-input v-model="humanTaskForm.label"></el-input>
                        </el-form-item>
                        <el-form-item label="节点描述：" prop="description">
                            <el-input v-model="humanTaskForm.description"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 基本设置-end -->

                    <!-- 表单设置-start -->
                    <el-tab-pane label="表单设置" name="second">
                        <!-- 按钮部分 -->
                        <el-row>
                            <div>
                                <el-button-group>
                                    <el-button type="primary" @click="newForm" size="mini">新表单</el-button>
                                    <el-button type="primary" @click="correlationForm" size="mini">关联表单</el-button>
                                    <el-button type="danger" :disabled="formTableNotSelect" size="mini" @click="removeFormTable">删除</el-button>
                                </el-button-group>
                                <el-button-group class="fr">
                                    <el-button type="primary" :disabled="formTableNotSelect" @click="permissionOption" size="mini">权限</el-button>
                                </el-button-group>
                            </div>
                        </el-row>
                        <!-- 内容表格 -->
                        <human-task-table ref="formTable" @row-click="formTableClick" draggable="true" class="margin-top-20"></human-task-table>
                    </el-tab-pane>
                    <!-- 表单设置-end -->

                    <!-- 处理设置-start -->
                    <el-tab-pane label="处理设置" name="third">
                        <el-card>
                            <!-- 按钮部分 -->
                            <el-row>
                                <div>
                                    <el-button-group>
                                        <el-button type="primary" size="mini">添加</el-button>
                                        <el-button type="primary" size="mini">修改</el-button>
                                        <el-button type="danger" size="mini">删除</el-button>
                                    </el-button-group>
                                </div>
                            </el-row>
                            <!-- 内容表格 -->
                            <handle-table ref="table" draggable="true" class="margin-top-20"></handle-table>
                        </el-card>
                        <el-card class="margin-top-10">
                            <el-row>
                                <div class="margin-top-20">
                                    <el-button-group>
                                        <el-button type="primary" size="mini">添加</el-button>
                                        <el-button type="primary" size="mini">修改</el-button>
                                        <el-button type="danger" size="mini">删除</el-button>
                                    </el-button-group>
                                </div>
                            </el-row>
                            <!-- 内容表格 -->
                            <handle-person-table ref="table" draggable="true" class="margin-top-20"></handle-person-table>
                    </el-card>
                    </el-tab-pane>
                    <!-- 处理设置-end -->

                    <!-- 高级设置-start -->
                    <el-tab-pane label="高级设置" name="fourth">
                        <el-form-item label="是否跳过:">
                            <el-radio-group v-model="humanTaskForm1.expertOption.skip">
                                <el-radio :label="false">不跳过</el-radio>
                                <el-radio :label="true">跳它丫的</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="超时设置:" prop="timeout">
                            <el-input v-model="humanTaskForm1.expertOption.timeout"></el-input>
                        </el-form-item>
                        <el-form-item label="自定义数据:" prop="custom">
                            <el-input v-model="humanTaskForm1.expertOption.custom"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 高级设置-end -->
                </el-tabs>
            </el-form>
            <!-- form-end -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="close">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <template>
            <!-- 模态框 -->
            <form-permission ref="permissionDig"></form-permission>
            <choose-form ref="chooseFormDig"></choose-form>
            <choose-correlation-form ref="chooseCorrelationFormDig"></choose-correlation-form>
        </template>
    </div>
</template>

<script>
import formPermission from '@/components/Dialog/FlowDesigner/formPermission' // 权限弹窗
import chooseForm from '@/components/Dialog/FlowDesigner/chooseForm' // 选择表单弹窗
import chooseCorrelationForm from '@/components/Dialog/FlowDesigner/chooseCorrelationForm' // 选择表单弹窗

import humanTaskTable from '@/components/Table/FlowDesigner/form' // 表单列表
import handleTable from '@/components/Table/FlowDesigner/handleOption' // 处理设置列表
import handlePersonTable from '@/components/Table/FlowDesigner/handlePerson' // 处理人列表

import DialogOptions from '@/components/Dialog/DialogOptions' // 弹窗配置

import HumanTask from '@/model/flow/HumanTask' // 人工任务类
import CustomerForm from '@/model/flow/CustomerForm' // 自定义表单类

import { fetchFormInfo } from '@/api/form' // 接口方法

export default {
    name: 'humanTask',
    components: {
        humanTaskTable,
        handleTable,
        handlePersonTable,
        formPermission,
        chooseForm,
        chooseCorrelationForm
    },
    data() {
        return {
            visible: false,
            uuid: '', // node节点唯一标识
            title: '人工任务',
            onClosed() {},
            activeName: 'first', // 默认显示tab第一项
            rules: {},
            humanTaskForm: {},
            formTargetData: {}, // 表单选中数据
            humanTaskForm1: {
                baseInfo: {
                    name: '',
                    code: '',
                    desc: ''
                },
                expertOption: {
                    skip: false,
                    timeout: '',
                    custom: ''
                }
            }
        }
    },
    computed: {
        formTableNotSelect() {
            return !this.formTargetData.formId
        }
    },
    methods: {
        // tab切换点击事件  如果基本信息校验不通过  不允许切换到别的页面
        async tabClick() {
            try {
                await this.$refs['humanTaskForm'].validate()
            } catch (e) {
                this.$nextTick(() => {
                    this.activeName = 'first'
                })
            }
        },

        // 新表单  打开选择表填单弹窗
        newForm() {
            this.$refs.chooseFormDig.open()
            this.$refs.chooseFormDig.onClosed = async args => {
                if (args.option === DialogOptions.CONFIRM) {
                    try {
                        const data = args.data
                        let res = await fetchFormInfo({ id: data.id })
                        if (!res.element) return this.$message.warning(`请选择一个有元素的表单`)
                        if (this.humanTaskForm.customerFormDefines.some(v => res.id === v.formId && v.formType === 'New')) return this.$message.warning(`该表单已在表单列表中`)
                        // 此处拿到的res.element数据结构是这个鸟样子的  "[{/xxx/:xxx},{/xxx/:xxx}]"
                        res = `{"foo":${res.element}}`
                        const formElements = JSON.parse(res).foo.map(v =>
                            ({
                                elementId: v.id,
                                elementName: v.attributes.propName.value,
                                elementType: v.name,
                                formElementAuthority: 'Operable'
                            }))
                        const customData = {
                            formId: data.id,
                            formCode: data.code,
                            formName: data.name,
                            formType: 'New',
                            formElements,
                            belongedToNodeDisplayName: '本节点', // 用于表单列表显示
                            order: this.humanTaskForm.customerFormDefines.length + 1
                        }
                        // 更新数据集
                        this.humanTaskForm.customerFormDefines.push(new CustomerForm().init(customData))
                        this.$refs.chooseFormDig.close(DialogOptions.CALLBACK)
                    } catch (error) {
                        console.warn(`获取表单信息失败${JSON.stringify(error)}`)
                        this.$message.error('获取表单信息失败')
                    }
                }
            }
        },

        // 关联表单  打开选择关联表单弹窗
        correlationForm() {
            this.$refs.chooseCorrelationFormDig.open({ uuid: this.uuid })
            this.$refs.chooseCorrelationFormDig.onClosed = async args => {
                if (args.option === DialogOptions.CONFIRM) {
                    const data = args.data
                    // 判断表单是否在表单列表已存在  条件 id存在、所属节点存在、表单类型为关联
                    if (this.humanTaskForm.customerFormDefines.some(v => data.formId === v.formId && data.belongedToNodeDisplayName === v.belongedToNodeDisplayName && v.formType === 'Associated')) return this.$message.warning(`该表单已在表单列表中`)
                    this.humanTaskForm.customerFormDefines.push(new CustomerForm().init(data))
                    this.$refs.chooseCorrelationFormDig.close(DialogOptions.CALLBACK)
                }
            }
        },

        // 删除表单设置的表单
        removeFormTable() {
            this.$refs.formTable.remove()
        },

        formTableClick(target) {
            this.formTargetData = target
        },

        permissionOption() {
            this.$refs.permissionDig.open({ nodeData: this.humanTaskForm, formId: this.formTargetData.formId })
        },

        open({ title = `人工任务`, uuid }) {
            if (this.visible) { return this }
            if (!uuid) return console.warn(`该组件open方法必须传入uuid`)
            this.uuid = uuid
            this.humanTaskForm = new HumanTask().init(this.$store.getters.getNodeInfo(uuid))
            this.title = title
            this.rules = {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: this.humanTaskForm.validatorOf('name')
                    }
                ],
                label: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: this.humanTaskForm.validatorOf('label')
                    }
                ]
            }
            this.visible = true
            this.$nextTick(() => {
                this.$refs.formTable.refreshList(this.humanTaskForm.customerFormDefines)
            })
        },

        async confirm() {
            try {
                await this.$refs['humanTaskForm'].validate()
                this.$store.commit('setNodeInfo', this.humanTaskForm)
                this.close()
            } catch (e) {} // eslint-disable-line
        },

        close() {
            this.visible = false
        }
    }
}
</script>
