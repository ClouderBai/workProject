/*
 * @Author: LiuJunTing 
 * @Date: 2018-02-01 14:34:59 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-12 16:43:03
 */

/**
|--------------------------------------------------
|
|  选择组织下的人员组件
|
|--------------------------------------------------
*/

 /* 这个组件写到一半发现  这特么不就是传说中的艾特人组件么  所以这个跟其他模态框组件不同  confirm后的逻辑不在该组件内处理  请使用该组件的人在
    onclosed回调中判断参数的option为CONFIRM(这里请引用DialogOptions.js)后自行处理业务独有的逻辑(如走什么接口把选中的人添加到哪里),处理成功后
    调用该组件的close方法  关闭模态框  如需判断模态框是回调关闭的  可传DialogOptions.js中的CALLBACK参数  */

 /*
@method open(Object) 打开模态框
@params (1) title 标题  默认为"选择人员"
 
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
                <el-col :span="6">
                    <!-- 树模块开始 -->
                    <el-card class="tree-card">
                        <el-row>
                            <el-col :span="14">
                                <el-form :model="searchFormData" @submit.native.prevent>
                                    <el-input clearable icon="search" class="el-input-primary" placeholder="请输入搜索内容" v-model.trim="searchFormData.orgSearchValue" @keyup.enter.native='searchOrg'>
                                        <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchOrg"></el-button>
                                    </el-input>
                                </el-form>
                            </el-col>
                            <el-col :span="10">
                                <div class="margin-top-8 margin-left-8">
                                    <span class="swichBtn">显示子级&nbsp;&nbsp;</span>
                                    <el-switch v-model="isExpand">
                                    </el-switch>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="treeRow">
                            <orgTree height="460" @changeTree="handleNodeClick" ref="tree"></orgTree>
                        </el-row>
                    </el-card>
                    <!-- 树模块结束 -->
                </el-col>

                <el-col :span="18" class="padding-left-20">
                    <el-card class="table-card mb20">
                        <!-- 按钮组开始 -->
                        <el-row class="margin-bottom-20">
                            <el-col :span="24">
                                <el-form :model="searchFormData" @submit.native.prevent class="fl">
                                    <el-input clearable icon="search" class="el-input-primary" placeholder="请输入搜索内容" v-model.trim="searchFormData.userSearchValue" @keyup.enter.native.prevent='getUserList'>
                                        <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="getUserList"></el-button>
                                    </el-input>
                                </el-form>
                            </el-col>
                        </el-row>
                        <!--按钮组结束 -->

                        <!-- 表格模块开始 -->
                        <el-col :span="24" class="margin-bottom-20">
                            <user-table height="440" type="selection" mini="true" ref="userTable" @selection-change="selectionChange"></user-table>
                        </el-col>
                        <!-- 表格模块结束 -->
                    </el-card>
                </el-col>
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
import orgTree from '@/components/Tree/orgTree' // 树
import userTable from '@/components/Table/User/orgUserToChoose' // 表
import DialogOptions from '../DialogOptions'

export default {
    name: 'chooseUserWithOrg',
    components: {
        orgTree,
        userTable
    },
    data() {
        return {
            onClosed: function() {},
            title: '',
            visible: false,
            isExpand: false, // 是否显示子级
            searchFormData: {
                orgSearchValue: '', // 组织树搜索条件
                userSearchValue: '' // 用户列表搜索条件
            },
            targetTreeData: {}, // 树选中数据
            selectedData: [] // 表格多选数据
        }
    },
    watch: {
        isExpand() {
            if (this.targetTreeData.id) {
                this.getUserList()
            }
        },
        'searchFormData.orgSearchValue': {
            handler(val) {
                if (!val) {
                    this.searchOrg()
                }
            },
            deep: true
        },
        'searchFormData.userSearchValue': {
            handler(val) {
                if (!val) {
                    this.getUserList()
                }
            },
            deep: true
        }
    },
    methods: {
        open({ title = '选择人员' } = { title: '选择人员' }) {
            this.title = title
            this.visible = true
        },

        close(option = DialogOptions.CLOSE, data, hold) {
            if (!this.visible) return
            if (!hold) {
                this.visible = false
            }
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    sender: this,
                    data
                }
                this.onClosed(payload)
            }
        },

        confirm() {
            if (this.selectedData.length === 0) {
                this.$message.warning('请选择要添加的人员')
                return
            }
            this.close(
                DialogOptions.CONFIRM,
                { selectedData: this.selectedData },
                true
            )
        },

        cancel() {
            this.close(DialogOptions.CANCEL)
        },

        // 树节点点击事件
        handleNodeClick(data) {
            this.targetTreeData = data
            this.getUserList()
        },

        // 获取用户列表
        async getUserList() {
            const params = {
                orgId: this.targetTreeData.id,
                expand: this.isExpand,
                filter: this.searchFormData.userSearchValue
            }
            this.$refs.userTable.refreshList(params)
        },

        // 搜索组织
        async searchOrg() {
            this.$refs.tree.search(this.searchFormData.orgSearchValue)

            // 清空一切与org相关的数据
            this.$refs.userTable.clear()
        },

        // 表格多选change事件
        selectionChange(selected) {
            this.selectedData = selected
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
