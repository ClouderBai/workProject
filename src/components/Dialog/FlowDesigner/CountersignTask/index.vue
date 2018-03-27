/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-16 11:12:15 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-16 11:36:40
 */
 
/**
|--------------------------------------------------
|
|  会签任务弹窗
|
|--------------------------------------------------
*/

<template>
    <div>
        <el-dialog :title="title" :visible="visible" @close="close">
            <!-- form-start -->
            <el-form :model="humanTaskForm" :rules="rules" ref="humanTaskForm" label-width="130px">
                <el-tabs v-model="activeName" type="card">
                    <!-- 基本设置-start -->
                    <el-tab-pane label="基本设置" name="first" class="paneStyle">
                        <el-form-item label="节点名称：" prop="name">
                            <el-input v-model="humanTaskForm.baseInfo.name"></el-input>
                        </el-form-item>
                        <el-form-item label="显示名称：" prop="code">
                            <el-input v-model="humanTaskForm.baseInfo.code"></el-input>
                        </el-form-item>
                        <el-form-item label="节点描述：" prop="desc">
                            <el-input v-model="humanTaskForm.baseInfo.desc"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 基本设置-end -->

                    <!-- 表单设置-start -->
                    <el-tab-pane label="表单设置" name="second" class="paneStyle">
                        <!-- 按钮部分 -->
                        <el-row>
                            <div>
                                <el-button-group>
                                    <el-button type="primary" size="mini">新表单</el-button>
                                    <el-button type="primary" size="mini">关联表单</el-button>
                                    <el-button type="danger" size="mini">删除</el-button>
                                </el-button-group>
                                <el-button-group class="fr">
                                    <el-button type="primary" @click="permissionOption" size="mini">权限</el-button>
                                </el-button-group>
                            </div>
                        </el-row>
                        <!-- 内容表格 -->
                        <human-task-table ref="table" draggable="true" class="margin-top-20"></human-task-table>
                    </el-tab-pane>
                    <!-- 表单设置-end -->

                    <!-- 处理设置-start -->
                    <el-tab-pane label="处理设置" name="third" class="paneStyle">
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
                    <el-tab-pane label="高级设置" name="fourth" class="paneStyle">
                        <el-form-item label="是否跳过:">
                            <el-radio-group v-model="humanTaskForm.expertOption.skip">
                                <el-radio :label="false">不跳过</el-radio>
                                <el-radio :label="true">跳它丫的</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="超时设置:" prop="timeout">
                            <el-input v-model="humanTaskForm.expertOption.timeout"></el-input>
                        </el-form-item>
                        <el-form-item label="自定义数据:" prop="custom">
                            <el-input v-model="humanTaskForm.expertOption.custom"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 高级设置-end -->
                </el-tabs>
            </el-form>
            <!-- form-end -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <template>
            <!-- 模态框 -->
            <form-permission ref="permissionDig"></form-permission>
        </template>
    </div>
</template>

<script>
import formPermission from '@/components/Dialog/FlowDesigner/formPermission'

import humanTaskTable from '@/components/Table/FlowDesigner/form'
import handleTable from '@/components/Table/FlowDesigner/handleOption'
import handlePersonTable from '@/components/Table/FlowDesigner/handlePerson'

export default {
    name: 'humanTask',
    components: {
        humanTaskTable,
        handleTable,
        handlePersonTable,
        formPermission
    },
    props: {
    },
    data() {
        return {
            visible: false,
            title: '会签任务',
            onClosed() {},
            activeName: 'first', // 默认显示tab第一项
            rules: {},
            humanTaskForm: {
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
    mounted() {

    },
    methods: {
        permissionOption() {
            this.$refs.permissionDig.open()
        },

        // dialog事件
        open({ title = `会签任务`, data } = { title: `会签任务` }) {
            if (this.visible) { return this }
            this.visible = true
            this.title = title
            // data.target.text.attrs.text = `皮卡丘`
        },
        async confirm() {
            try {
                const valid = await this.$refs['userForm'].validate()
                if (valid) {
                    this.comfirmOption()
                }
            } catch (e) {
                return false
            }
        },
        cancel() {
            this.visible = false
        },
        close() {
            this.visible = false
        }
    }
}
</script>
<style scoped>
    /* .paneStyle {
        height: 500px;
        overflow-y: auto
    } */
</style>
