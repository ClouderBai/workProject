<template>
      <div>
        <el-row :gutter="20">
            <!-- 左侧内容 -->
            <el-col :span="4">
                <el-card class="box-card" style="height: 800px; overflow-y: auto;">
                    <div slot="header" class="plr20 clearfix">
                        <h2>角色组</h2>
                    </div>
                    <!-- 按钮 -->
                    <div class="btnWrap">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="新增" placement="top-start">
                                <el-button size="mini" icon="bimicon-add" class="custom-medium-btn primary-btn" @click="openDialog('create')">
                                    <!-- <svg-icon icon-class="insert" /> -->
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                                <el-button :disabled="disabled" size="mini" icon="bimicon-write" class="custom-medium-btn primary-btn" @click="openDialog('edit')">
                                    <!-- <svg-icon icon-class="edit" /> -->
                                </el-button>
                            </el-tooltip>                      
                            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                                <el-button  :disabled="disabled" size="mini" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="removeData">
                                    <!-- <svg-icon icon-class="delete" /> -->
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="复制" placement="top-start">
                                <el-button :disabled="disabled" size="mini" icon="bimicon-copy" class="custom-medium-btn primary-btn" @click="openCopyDialog">
                                    <!-- <svg-icon icon-class="copy" /> -->
                                </el-button>
                            </el-tooltip>
                        </el-button-group>
                    </div>           
                    <!-- 内容表格 -->
                    <roleGroupTable ref="roleGroupTable" @row-click="rowClick"/> 
                </el-card>  
            </el-col>

            <!-- 中间内容 -->
            <el-col :span="12">
                <el-card class="box-card" style="height: 800px; overflow-y: auto;">
                    <!-- 标题 -->
                    <div slot="header" class="plr20 clearfix">
                        <h2>角色列表</h2>
                    </div>
                    <!-- 按钮 -->
                    <div class="btnWrap">
                        <el-button class="custom-medium-btn primary-btn" size="medium" @click="clearTable">一键清空</el-button>                        
                    </div>
                    <!-- 表格 -->
                    <roleListTable ref="roleListTable" @refresh="middleRefresh"/> 
                </el-card>
            </el-col>
            <!-- 右侧内容 -->
            <el-col :span="8">
                <el-card class="box-card" style="height: 800px; overflow-y: auto;">
                    <div slot="header" class="plr20 clearfix">
                        <h2>可添加角色列表</h2>
                    </div>
                    <el-form 
                        class="toolWrap"
                        :model="searchData" 
                        @submit.native.prevent>
                        <el-form-item>
                            <el-input 
                                class="el-input-primary"
                                placeholder="搜索权限" 
                                v-model.trim="searchData.value" 
                                @keyup.enter.native.prevent="search(searchData.value)">
                                <el-button 
                                    class="choseBtn"
                                    slot="append" 
                                    type="primary" 
                                    icon="el-icon-search" 
                                    @click="search(searchData.value)">
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <el-button class="custom-medium-btn primary-btn mb20" size="medium" @click="addRoleToGroup">添加选中</el-button>
                    </el-form>
                    <additoryRoleTable ref="additoryRoleTable" @refresh="refresh"/>   
                </el-card>        
            </el-col>
        </el-row>
        <!-- 弹窗  -->
        <roleGroupDialog ref="insertRoleGroup"/>
        <roleCopyDialog ref="roleCopyDialog" @refresh="refreshTable"/>
    </div>
</template>

<script>
import dialogOptions from '@/components/Dialog/DialogOptions.js'
import MdInput from "@/components/MDinput"
// 表格
import roleGroupTable from '@/components/Table/RoleGroup/index.vue'
import roleListTable from '@/components/Table/RoleGroup/role.vue'
import additoryRoleTable from '@/components/Table/RoleGroup/additoryRole.vue'

// 弹窗
import roleGroupDialog from '@/components/Dialog/RoleGroup/base.vue'
import roleCopyDialog from '@/components/Dialog/RoleGroup/copy.vue'

export default {
    components: {
        MdInput,
        roleGroupTable,
        roleListTable,
        additoryRoleTable,
        roleGroupDialog,
        roleCopyDialog
    },
    computed: {
        disabled() {
            return !(this.selectedData != '')
        }
    },

    data() {
        return {
            selectedData: '', // 选中的行数据
            leftLoaded: true,
            searchData: {
                value: ''
            }
        }
    },

    methods: {
        // 表格点击
        rowClick(ev) {
            this.selectedData = ev
            this.$refs.roleListTable.init(ev)
            this.$refs.additoryRoleTable.init(ev, 1)
        },

        // 打开弹窗
        openDialog(ev) {
            switch(ev) {
                case 'create':
                    this.$refs.insertRoleGroup.open() 
                    this.$refs.insertRoleGroup.onClosed = (args => {
                        if(args.option == dialogOptions.CONFIRM) {
                            this.$refs.roleGroupTable.insertData(args.data )                 
                        }
                    }) 
                break;
                case 'edit':
                    this.$refs.insertRoleGroup.open({
                        title: '修改角色组',
                        data: this.selectedData
                    }) 
                break;
                case 'edit':
                    this.$refs.insertRoleGroup.open({
                        title: '复制角色组',
                        code: this.selectedData.code
                    })
                break;
            }
        },

        // 打开复制弹窗
        openCopyDialog() {
            this.$refs.roleCopyDialog.open(this.selectedData)
        },

        // 删除角色组
        removeData() {
            this.$refs.roleGroupTable.remove(this.selectedData)
        },

        // 清空角色列表
        clearTable() {
            this.$refs.roleListTable.clear(this.selectedData)
        },

        // 搜索可添加角色列表
        search(ev) {
            this.$refs.additoryRoleTable.search(ev, 1)
        },

        // 添加可添加角色
        addRoleToGroup() {
            this.$refs.additoryRoleTable.addChosen()
        },

        // 刷新角色列表
        refresh() {
            this.$refs.roleListTable.init(this.selectedData)
        },

        // 刷新可添加角色列表
        middleRefresh() {
            this.$refs.additoryRoleTable.init(this.selectedData)
        },

        // 刷新两个列表
        refreshTable() {
            this.refresh()
            this.middleRefresh()
        }
    }
}
</script>

<style scoped>
    .roleInfo {
        width: 60%;
        min-height: 300px;
        margin: 50px auto;
    }
    .roleName {
        width: 100%;
    }
    .choseWrap {
        display: flex;
        width: 100%;
    }
    .btnWrap {
        text-align: right;
        margin-bottom: 20px;
    }
    .toolWrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
</style>
