/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-21 10:28:50 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-23 13:59:14
 */

/**
|--------------------------------------------------
|
|  选择表单组件
|
|--------------------------------------------------
*/

@method open(Object) 打开模态框
@params (1) title 标题  默认为"选择表单"
 
@method close(String,Object) 关闭模态框
@params (1) option 模态框关闭状态
        (2) data 要载荷的自定义数据 

@method onClosed(*Object) 模态框点击确认按钮时关闭时回调方法
@params (1) *option  模态框关闭状态
            *sender  组件this指向
            data     返回数据
 */


<template>
    <div class="components-container">
        <el-dialog :title="title" :visible="visible" @close="close()" width="80%" append-to-body>
            <el-row>
                <!-- 按钮组开始 -->
                <el-row class="margin-bottom-20">
                    <el-col :span="24">
                        <el-form :model="searchFormData" @submit.native.prevent class="fl" style="width: 100%;">
                            <ul class="search-container">
                                <li>
                                    <span>名称：</span>
                                    <el-input 
                                        clearable 
                                        suffix-icon="el-icon-search" 
                                        class="el-input-primary search-input-width" 
                                        placeholder="请输入搜索内容" 
                                        v-model.trim="searchFormData.nameSearchValue" 
                                        @keyup.enter.native.prevent='getUserList'>
                                    </el-input>
                                </li>
                                <li>
                                    <span>编码：</span>
                                    <el-input 
                                        clearable 
                                        suffix-icon="el-icon-search" 
                                        class="el-input-primary search-input-width" 
                                        placeholder="请输入搜索内容" 
                                        v-model.trim="searchFormData.codeSearchValue" 
                                        @keyup.enter.native.prevent='getUserList'>
                                    </el-input>
                                </li>
                            </ul>
                        </el-form>
                    </el-col>
                </el-row>
                <!--按钮组结束 -->

                <!-- 表格模块开始 -->
                <el-col :span="24" class="margin-bottom-20">
                    <form-table height="440" ref="formTable" @row-click="onFormClick"></form-table>
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
import formTable from '@/components/Table/FlowDesigner/formToChoose' // 表
import DialogOptions from '../DialogOptions'

export default {
    name: 'chooseUser',
    components: {
        formTable
    },
    data() {
        return {
            visible: false,
            onClosed: function() {},
            title: '选择表单',
            searchFormData: {
                nameSearchValue: '', // 表单名称搜索条件
                codeSearchValue: '' // 表单编码搜索条件
            },
            targetData: {}
        }
    },
    watch: {
        'searchFormData': {
            handler(val) {
                this.$refs.formTable.search({ name: val.nameSearchValue, code: val.codeSearchValue })
            },
            deep: true
        }
    },
    methods: {
        open({ title } = { title: '选择表单' }) {
            this.title = title
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
            if (!this.targetData.id) {
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
        onFormClick(target) {
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

.search-container {
    list-style-type: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
}

.search-container>li {
    width: 25%;
}

.search-input-width {
    width: 70%;
}
</style>
