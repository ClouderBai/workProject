/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-30 16:04:46 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:39:03
 */
<template>
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
                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCreateRole">新建</el-button>
                    <el-button size="medium" :disabled="tableNotSelect" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="update">修改</el-button>
                    <el-button size="medium" :disabled="tableNotSelect" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="remove">删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <!--按钮组结束 -->

        <!-- 表格模块开始 -->
        <el-col :span="24" class="margin-bottom-20">
            <role-table @row-click="rowClick" :draggable="true" ref="roleTable"></role-table>
        </el-col>
        <!-- 表格模块结束 -->

        <template>
            <!-- 模态框 -->
            <role-base ref="roleBase"></role-base>
        </template>
    </el-card>
</template>

<script>
import roleTable from '@/components/Table/Role/index' // 角色表格
import roleBase from '@/components/Dialog/Role/base' // 角色弹窗  新建/修改
import DialogOptions from '@/components/Dialog/DialogOptions'

export default {
    components: {
        roleTable,
        roleBase
    },
    computed: {
        tableNotSelect() {
            return !this.targetData.id
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
        }
    },
    data() {
        return {
            searchFormData: {
                roleSearchValue: ''
            },
            targetData: {}
        }
    },
    methods: {
        searchRole() {
            this.$refs.roleTable.refreshList(
                this.searchFormData.roleSearchValue
            )
        },
        openCreateRole() {
            this.$refs.roleBase.open()
            this.$refs.roleBase.onClosed = function(args) {
                if (args.option === DialogOptions.CONFIRM) {
                    this.$refs.roleTable.insert(args.data)
                }
            }.bind(this)
        },
        update() {
            this.$refs.roleBase.open({ data: this.targetData })
        },
        // 获取单选行数据
        rowClick(target) {
            this.targetData = target
        },
        remove() {
            this.$refs.roleTable.remove()
        }
    }
}
</script>

<style>

</style>
