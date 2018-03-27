/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-31 13:30:09 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:39:10
 */
<template>
    <div>
        <el-row>
            <el-col :span="6">
                <!-- 角色表模块开始 -->
                <el-card class="box-card ">
                    <el-form :model="searchFormData" @submit.native.prevent class="fl">                        
                        <el-input icon="search" class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.roleSearchValue" @keyup.enter.native.prevent='searchRole'>
                            <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchRole"></el-button>
                        </el-input>     
                    </el-form>
                    <el-col class="mt20">
                        <role-table @row-click="rowClick" :mini="true" ref="roleTable"></role-table>
                    </el-col>
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
                        <role-user-table type="selection" ref="roleUserTable" @selection-change="selectionChange"></role-user-table>
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
import roleTable from '@/components/Table/Role/index' // 角色表格
import roleUserTable from '@/components/Table/User/roleUser' // 角色用户表格
import DialogOptions from '@/components/Dialog/DialogOptions'
import { createRoleUser } from '@/api/roleAccess' // 请求方法

// 模态框
import addUser from '@/components/Dialog/User/addUser' // 添加用户

export default {
    components: {
        roleTable,
        roleUserTable,
        addUser
    },
    data() {
        return {
            searchFormData: {
                roleSearchValue: '',
                roleUserSearchValue: ''
            },
            targetData: {}, // 角色表点击数据
            selectedData: []
        }
    },
    computed: {
        roleIsSelected() {
            return this.targetData.id
        },
        roleUserSelected() {
            return this.selectedData.length !== 0
        }
    },
    methods: {
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
                            roleCode: this.targetData.code,
                            userIds
                        }
                        this.$store.commit('SHOW_WAITING')
                        await createRoleUser(params)
                        this.$message.success('添加用户成功')
                        this.$refs.addUser.close(DialogOptions.CALLBACK)
                        this.$refs.roleUserTable.refreshList(
                            this.targetData.code
                        )
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
        rowClick(target) {
            // 重复点击同一个item不触发刷新列表
            if (this.targetData.code === target.code) {
                return
            }
            this.targetData = target
            if (target.code) {
                this.$refs.roleUserTable.refreshList(target.code)
            }
        },

        // 搜索角色
        searchRole() {
            this.$refs.roleTable.refreshList(
                this.searchFormData.roleSearchValue
            )
            this.$refs.roleUserTable.clear()
        },

        // 搜索角色用户
        searchRoleUser() {
            this.$refs.roleUserTable.refreshList(
                this.targetData.code,
                this.searchFormData.roleUserSearchValue
            )
        }
    }
}
</script>
