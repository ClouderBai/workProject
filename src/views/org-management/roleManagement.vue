/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-06 15:19:45 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-27 13:36:12
 */

 /**
|--------------------------------------------------
|
|  角色管理模块
|
|--------------------------------------------------
*/

<template>
    <div>
        <el-row>
            <el-col :span = "6">
                <el-card>
                    <el-form ref="form" :model="searchFormData" @submit.native.prevent class="mb20">
                        <el-input class="el-input-primary" placeholder="请输入搜索内容" v-model.trim="searchFormData.orgSearchValue" @keyup.enter.native.prevent="searchOrg">
                            <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchOrg"></el-button>
                        </el-input>
                    </el-form>
                    <tree height="750" @changeTree='treeHandle' ref="tree"></tree>
                </el-card>
            </el-col>
            <el-col :span = "18">
                <div class="padding-left-20">
                    <el-card>
                        <!-- 按钮组开始 -->
                        <el-row>
                            <el-col>
                                <el-form :model="searchFormData" @submit.native.prevent class="float-left">
                                    <el-form-item>
                                        <el-input placeholder="搜索角色" v-model.trim="searchFormData.roleSearchValue" @keyup.enter.native.prevent='searchRole' class="el-input-primary">
                                            <el-button class="choseBtn" slot="append" type="primary" icon="el-icon-search" @click="searchRole">
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <el-button-group class="float-right">
                                    <el-button size="medium" :disabled="orgNotSelect" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCreateRole">新建</el-button>
                                    <el-button size="medium" :disabled="tableNotSelect" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="update">修改</el-button>
                                    <el-button size="medium" :disabled="!roleSelected" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="remove">删除</el-button>
                                    <el-button size="medium" :disabled="orgNotSelect || listEmpty" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCopyModal">复制</el-button>
                                    <el-button size="medium" :disabled="orgNotSelect || listEmpty" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="importData">导入</el-button>
                                    <el-button size="medium" :disabled="orgNotSelect || listEmpty" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="exportData">导出</el-button>
                                </el-button-group>
                            </el-col>
                        </el-row>
                        <!-- 按钮组结束 -->

                        <!-- 表格模块开始 -->
                        <el-col :span="24" class="margin-bottom-20">
                            <role-table height="675" @get-list="listChange" @row-click="rowClick" type="selection" @selection-change="selectionChange" :draggable="true" ref="roleTable"></role-table>
                        </el-col>
                        <!-- 表格模块结束 -->
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <template>
            <!-- 模态框 -->
            <role-base ref="roleBase"></role-base>
            <copy-modal ref="copyDig"></copy-modal>
            <backup :backupData="roleList" @uploadFile="onImportData" ref="backup"></backup>
        </template>
    </div>
</template>

<script>
import tree from '@/components/Tree/OrgTreeCustom'
import backup from '@/components/Backup' // 导入导出
import roleTable from '@/components/Table/Role/index' // 角色表格
import roleBase from '@/components/Dialog/Role/base' // 角色弹窗  新建/修改
import copyModal from '@/components/Dialog/Org/chooseOrg' // 选择组织  复制弹窗
import DialogOptions from '@/components/Dialog/DialogOptions'
import { copyRoleFromOrg, fetchExportRoles, importRoles } from '@/api/userAccess' // 接口

export default {
    components: {
        copyModal,
        roleTable,
        roleBase,
        tree,
        backup
    },
    computed: {
        tableNotSelect() {
            return !this.targetData.id
        },
        orgNotSelect() {
            return !this.targetTreeData.id
        },
        roleSelected() {
            return this.selectedData.length !== 0
        }
    },
    watch: {
        'searchFormData.orgSearchValue': {
            handler(val) {
                if (!val) {
                    this.searchOrg()
                }
            },
            deep: true
        },
        'searchFormData.roleSearchValue': {
            handler(val) {
                if (!val) {
                    this.searchRole()
                }
            },
            deep: true
        }
    },
    data() {
        return {
            searchFormData: {
                orgSearchValue: '',
                roleSearchValue: ''
            },
            selectedData: [],
            targetData: {},
            targetTreeData: {},
            roleList: [], // 角色列表
            listEmpty: true, // 通过角色表格是否为空 判断复制、导入、导出按钮是否可点
            exData: []
        }
    },
    methods: {
        // 表格多选改变时
        selectionChange(selection) {
            this.selectedData = selection
        },

        // 导入
        importData() {
            this.$refs['backup'].importData()
        },

        // 导出
        async exportData() {
            try {
                this.$store.commit('SHOW_WAITING')
                this.exData = await fetchExportRoles({ orgId: this.targetTreeData.id })
                this.$refs['backup'].exportData(this.exData, `角色备份`)
            } catch (error) {
                console.warn(
                    `获取导出数据异常${JSON.stringify(error)}`
                )
                this.$message.error(`获取导出数据失败`)
            } finally {
                this.$store.commit('CLOSE_WAITING')
            }
        },

        // 处理导入的文件
        async onImportData(file, dom) {
            try {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('orgId', this.targetTreeData.id)
                await importRoles(formData)
                this.$message.success('导入角色成功')
                this.$refs.roleTable.refreshList({ orgId: this.targetTreeData.id })
            } catch (error) {
                this.$message.error('导入角色失败')
                console.warn(
                    `导入角色数据异常${JSON.stringify(error)}`
                )
            } finally {
                dom.value = '' // 清除文件
            }
        },

        // 打开复制弹窗
        openCopyModal() {
            this.$refs.copyDig.open()
            this.$refs.copyDig.onClosed = async function(args) {
                if (args.option === DialogOptions.CONFIRM) {
                    if (this.targetTreeData.id === args.data.id) return this.$message.warning(`被复制组织和目标组织为同一组织`)
                    try {
                        const params = {
                            sourceOrgId: args.data.id,
                            targetOrgId: this.targetTreeData.id
                        }
                        this.$store.commit('SHOW_WAITING')
                        await copyRoleFromOrg(params)
                        this.$message.success('复制角色成功')
                        this.$refs.copyDig.close(DialogOptions.CALLBACK)
                    } catch (error) {
                        console.warn(
                            `复制角色用户异常${JSON.stringify(error)}`
                        )
                        this.$message.error('复制角色失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            }.bind(this)
        },

        // 角色表格数据改变时触发
        listChange(list) {
            this.roleList = list
            this.listEmpty = !(list.length > 0)
        },

        // 搜索树
        searchOrg() {
            // this.$refs.roleTable.clear()
            // this.targetTreeData = {}
            this.$refs.tree.search(this.searchFormData.orgSearchValue)
        },

        // 点击数节点事件
        treeHandle(val) {
            if (!val.id) {
                this.targetTreeData = {}
                this.$refs.roleTable.clear()
                return
            }
            this.targetTreeData = val
            this.$refs.roleTable.refreshList({ orgId: val.id })
        },

        // 搜索角色
        searchRole() {
            this.$refs.roleTable.refreshList({
                orgId: this.targetTreeData.id,
                filter: this.searchFormData.roleSearchValue
            })
        },

        // 新增角色
        openCreateRole() {
            this.$refs.roleBase.open({ orgId: this.targetTreeData.id })
            this.$refs.roleBase.onClosed = function(args) {
                if (args.option === DialogOptions.CONFIRM) {
                    this.$refs.roleTable.insert(args.data)
                }
            }.bind(this)
        },

        // 修改角色
        update() {
            this.$refs.roleBase.open({ orgId: this.targetTreeData.id, data: this.targetData })
        },

        // 获取单选行数据
        rowClick(target) {
            this.targetData = target
        },

        // 删除角色
        remove() {
            this.$refs.roleTable.remove()
        }
    }
}
</script>
