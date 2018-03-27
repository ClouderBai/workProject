/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-09 09:27:25 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-13 16:19:12
 */

 /**
|--------------------------------------------------
|
|  角色人员管理模块
|
|--------------------------------------------------
*/

<template> 
    <div>
        <el-row>
            <el-col :span="6">
                <!-- 角色表模块开始 -->
                <el-card class="box-card ">
                    <el-form :model="searchFormData" @submit.native.prevent class="mb20">                        
                        <el-input icon="search" class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.roleSearchValue" @keyup.enter.native.prevent='searchRole'>
                            <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchRole"></el-button>
                        </el-input>     
                    </el-form>
                    <tree height="750" @changeTree='treeHandle' :filter='treeType' ref="tree"></tree>
                </el-card>
                <!-- 角色表树模块结束 -->
            </el-col>
            <el-col :span="18" class="pl20">
                <!-- 用户角色列表开始 -->
                <el-card class="box-card">
                    <el-form :model="searchFormData" @submit.native.prevent class="fl">
                            <el-input class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.roleUserSearchValue" @keyup.enter.native.prevent='searchRoleUser'>
                                <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchRoleUser"></el-button>
                            </el-input>
                    </el-form>
                    <el-button-group class="fr">
                        <el-button size="medium" icon="bimicon-add" class="custom-medium-btn primary-btn" :disabled="!roleIsSelected" @click="addUser">新增</el-button>
                        <el-button size="medium" icon="bimicon-delete" class="custom-medium-btn red-btn" :disabled="!roleUserSelected" @click="remove">删除</el-button>
                    </el-button-group>
                    <el-col class="margin-top-20">
                        <role-user-table height="695" type="selection" ref="roleUserTable" @selection-change="selectionChange"></role-user-table>
                    </el-col>
                </el-card>
                <!-- 用户角色列表结束 -->
            </el-col>
        </el-row>
        <template>
            <!-- 模态框 -->
            <add-user ref="addUser"></add-user>
        </template>
    </div>
</template>

<script>
import tree from '@/components/Tree/orgTreeCustom'
import Options from '@/components/Tree/Options'

import roleUserTable from '@/components/Table/User/roleUser' // 角色用户表格
import DialogOptions from '@/components/Dialog/DialogOptions'
import { addRoleUser } from '@/api/userAccess' // 请求方法

// 模态框
import addUser from '@/components/Dialog/User/chooseUserWithOrg' // 添加用户

export default {
    components: {
        roleUserTable,
        addUser,
        tree
    },
    data() {
        return {
            treeType: Options.USER_ROLE_ORG,
            searchFormData: {
                roleSearchValue: '',
                roleUserSearchValue: ''
            },
            selectedData: [],
            targetTreeData: {} // 树节点点击数据
        }
    },
    computed: {
        roleIsSelected() {
            return this.targetTreeData.id
        },
        roleUserSelected() {
            return this.selectedData.length !== 0
        }
    },
    watch: {
        'searchFormData.roleSearchValue': {
            handler(val) {
                if (!val) {
                    this.searchRole()
                }
            },
            deep: true
        },
        'searchFormData.roleUserSearchValue': {
            handler(val) {
                if (!val) {
                    this.searchRoleUser()
                }
            },
            deep: true
        }
    },
    methods: {
        treeHandle(val) {
            this.targetTreeData = val
            this.$refs.roleUserTable.refreshList(this.targetTreeData.code)
        },

        selectionChange(selection) {
            this.selectedData = selection
        },

        addUser() {
            this.$refs.addUser.open()
            this.$refs.addUser.onClosed = async function(args) {
                if (args.option === DialogOptions.CONFIRM) {
                    try {
                        const userIds = args.data.selectedData
                            .map(v => {
                                return v.id
                            })
                            .join()
                        const params = {
                            roleCode: this.targetTreeData.code,
                            userIds
                        }
                        this.$store.commit('SHOW_WAITING')
                        await addRoleUser(params)
                        this.$message.success('添加用户成功')
                        this.$refs.addUser.close(DialogOptions.CALLBACK)
                        this.$refs.roleUserTable.refreshList(this.targetTreeData.code)
                    } catch (error) {
                        console.warn(
                            `添加角色下用户异常${JSON.stringify(error)}`
                        )
                        this.$message.error('添加用户失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            }.bind(this)
        },
        remove() {
            this.$refs.roleUserTable.remove()
        },

        // 搜索角色
        searchRole() {
            this.$refs.tree.search(this.searchFormData.roleSearchValue)
        },

        // 搜索角色用户
        searchRoleUser() {
            this.$refs.roleUserTable.refreshList(
                this.targetTreeData.code,
                this.searchFormData.roleUserSearchValue
            )
        }
    }
}
</script>
