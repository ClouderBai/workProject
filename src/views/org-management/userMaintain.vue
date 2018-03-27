/*
 * @Author: LiuJunTing
 * @Date: 2018-01-19 13:27:39
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 13:37:19
 */

 /**
|--------------------------------------------------
|
|  用户维护模块
|
|--------------------------------------------------
*/

<template>
    <div class="components-container">
        <el-row>
            <el-col :span="6">
                <!-- 树模块开始 -->
                <div class="bim-card">
                    <el-card class="tree-card">
                        <div slot="header" class="plr20 leftTitle">
                            <h2>组织导航</h2>
                            <div>
                                <span class="swichBtn">显示子级&nbsp;&nbsp;</span>
                                <el-switch v-model="isExpand">
                                </el-switch>
                            </div>
                        </div>
                        <el-row class="leftToolWrap">
                            <el-form ref="form" :model="searchFormData" @submit.native.prevent class=" float-right ml10 mb20">
                                <el-input class="el-input-primary" placeholder="请输入搜索内容" v-model.trim="searchFormData.orgSearchValue" @keyup.enter.native.prevent="searchOrg">
                                    <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchOrg"></el-button>
                                </el-input>
                            </el-form>

                            <div class="rightBtn">
                                <!-- <el-checkbox v-model="isExpand" class="check-box">是否显示子级</el-checkbox> -->
                                <el-tooltip class="item resetBtn" effect="dark" content="重置密码" placement="top-start">
                                    <el-button size="mini" @click="reset()" :disabled="orgNotSelect">
                                        <svg-icon icon-class="resetPassword" />
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </el-row>
                        <el-row class="treeRow">
                            <org-tree height="420" @changeTree="handleNodeClick" ref="tree"></org-tree>
                        </el-row>
                    </el-card>
                </div>
                <!-- 树模块结束 -->
            </el-col>

            <el-col :span="18" class="padding-left-20">
                <div class="bim-card">
                    <el-card class="table-card">
                        <div slot="header" class="plr20">
                            <h2>用户列表
                                <el-form ref="form" :model="searchFormData" @submit.native.prevent class="fr ml10 mb20">
                                    <el-input class="el-input-primary" placeholder="请输入搜索内容" v-model.trim="searchFormData.userSearchValue" @keyup.enter.native.prevent="getUserList">
                                        <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="getUserList"></el-button>
                                    </el-input>
                                </el-form>
                                <el-dropdown size="small" @command="openDialog" trigger="click" class="fr">
                                    <el-button type="primary">设置
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="dutyMaintain">职业类别维护</el-dropdown-item>
                                        <el-dropdown-item command="userPropsExt">用户属性扩展</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-button-group class="fr" style="margin-top:5px;margin-right:10px;">
                                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCreateUser">新建</el-button>
                                    <el-button size="medium" :disabled="orgNotSelect" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="addUser">添加</el-button>
                                    <el-button size="medium" :disabled="tableNotSelect" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="openEditUser">修改</el-button>
                                    <el-button size="medium" :disabled="tableNotSelect" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="removeUser">删除</el-button>
                                </el-button-group>
                            </h2>
                        </div>
                        <!-- 表格模块开始 -->
                        <el-col :span="24" class="margin-bottom-20">
                            <user-table :height="userTableHeight" :draggable="true" type="index" ref="userTable" @row-click="rowClick"></user-table>
                        </el-col>
                        <!-- 表格模块结束 -->
                    </el-card>
                </div>
            </el-col>

            <!-- user-detail-start -->
            <el-col class="user-detail" v-detail-visible="detailVisible">
                <el-card class="box-card">
                    <div @click="toggleDetail" class="visibleBtn">用户信息
                        <i class="el-icon-arrow-up" v-if="detailVisible"></i>
                        <i class="el-icon-arrow-down" v-if="!detailVisible"></i>
                    </div>
                    <user-detail :user-id="targetTableData.id" @getUserInfo="onGetUserInfo" ref="userDetail"></user-detail>
                </el-card>
            </el-col>
            <!-- user-detail-end -->
        </el-row>

        <!-- create-user-start -->
        <create-user ref="createUser" :org-id="targetTreeData.id"></create-user>
        <user-duty-manage ref="dutyMaintain"></user-duty-manage>
        <user-ext-manage ref="userPropsExt"></user-ext-manage>
        <reset-dialog ref="resetDialog"></reset-dialog>
        <add-user ref="addUser"></add-user>
        <!-- create-user-end -->
    </div>
</template>

<script>
import orgTree from '@/components/Tree/orgTree' // 树
import userDetail from './user-maintain/userDetail' // 用户详情
import userTable from '@/components/Table/User/orgUser' // 用户列表
import { resetPassword } from '@/api/org' // 请求方法
import { addUserInOrg } from '@/api/user' // 请求方法
import DialogOptions from '@/components/Dialog/DialogOptions'

// 模态框
import createUser from '@/components/Dialog/User/create' // 新建用户
import addUser from '@/components/Dialog/User/chooseUser'
import userDutyManage from '@/components/Dialog/UserDuty/manage' // 用户职位类别
import userExtManage from '@/components/Dialog/UserExt/manage' // 用户扩展属性
import resetDialog from '@/components/Dialog/Other/safeguard'

export default {
    name: 'UserMaintain',
    components: {
        createUser,
        userDutyManage,
        userExtManage,
        orgTree,
        userDetail,
        userTable,
        resetDialog,
        addUser
    },
    data() {
        return {
            isExpand: false, // 是否显示子级
            searchFormData: {
                orgSearchValue: '', // 组织树搜索条件
                userSearchValue: '' // 用户列表搜索条件
            },
            targetTreeData: {}, // 树选中数据
            targetTableData: {}, // 表格选中数据
            activeName: 'first', // tab初始当前页
            detailVisible: true,
            userTableHeight: 600,
            userInfo: {} // 用户详情
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
    computed: {
        orgNotSelect() {
            return !this.targetTreeData.id
        },
        tableNotSelect() {
            return !this.targetTableData.id
        }
    },
    directives: {
        detailVisible(el, visible) {
            if (visible.value) {
                el.style.bottom = '-236px'
            } else {
                el.style.bottom = '0px'
            }
        }
    },
    methods: {
        // 添加用户到组织
        addUser() {
            this.$refs.addUser.open({ orgId: this.targetTreeData.id })
            this.$refs.addUser.onClosed = async function(args) {
                if (args.option === DialogOptions.CONFIRM) {
                    try {
                        const params = args.data.selectedData
                            .map(v => {
                                return {
                                    userId: v.id,
                                    mainJob: false,
                                    orgId: this.targetTreeData.id
                                }
                            })
                        this.$store.commit('SHOW_WAITING')
                        await addUserInOrg(params)
                        this.$message.success('添加用户成功')
                        this.$refs.addUser.close(DialogOptions.CALLBACK)
                        this.getUserList()
                    } catch (error) {
                        console.warn(
                            `添加组织下用户异常${JSON.stringify(error)}`
                        )
                        this.$message.error('添加用户失败')
                    } finally {
                        this.$store.commit('CLOSE_WAITING')
                    }
                }
            }.bind(this)
        },

        toggleDetail() {
            this.detailVisible = !this.detailVisible
            if (this.detailVisible) {
                this.userTableHeight = 600
            } else {
                this.userTableHeight = 294
            }
        },
        reset() {
            this.$refs.resetDialog.open(
                '请输入以下值确认重置该组织下所有人员密码',
                'RESET'
            )
            this.$refs.resetDialog.onClosed = async args => {
                if (args.option === DialogOptions.CONFIRM) {
                    try {
                        await resetPassword(this.targetTreeData.id)
                        this.$message.success('重置密码成功')
                        this.$refs.resetDialog.close(DialogOptions.CALLBACK)
                    } catch (error) {
                        console.warn(
                            `重置组织下用户密码异常${JSON.stringify(error)}`
                        )
                        this.$message.error('重置密码失败')
                    }
                }
            }
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
            this.targetTreeData = {}
            this.$refs.userTable.clear()
            this.$refs.userDetail.clear()
        },

        // 获取单选行数据
        rowClick(target) {
            this.targetTableData = target
        },

        // 打开模态框
        openDialog(val) {
            this.$refs[val].open()
        },

        // 打开新建用户模态框
        openCreateUser() {
            const self = this
            this.$refs['createUser'].open()
            this.$refs['createUser'].onClosed = function(payload) {
                if (payload.option === DialogOptions.CONFIRM) {
                    // 刷新表格
                    self.$refs['userTable'].refreshList({ orgId: self.targetTreeData.id, expand: false })
                }
            }
        },

        // 打开修改用户模态框
        openEditUser() {
            // 判断是否选中用户
            if (this.userInfo.baseInfo.id === -1) {
                this.$message.warn('请选择要修改的用户!')
                return
            }
            const self = this
            this.$refs['createUser'].open({ data: this.userInfo })
            this.$refs['createUser'].onClosed = function(payload) {
                if (payload.option === DialogOptions.CONFIRM) {
                    // 刷新表格
                    self.$refs['userTable'].refreshList({ orgId: self.targetTreeData.id, expand: false })
                }
            }
        },
        // 删除用户
        removeUser() {
            this.$refs.userTable.remove()
        },
        // 用户详情
        onGetUserInfo(data) {
            this.userInfo = data
        }
    }
}
</script>

<style  scoped lang="scss">
.tree-card,
.table-card {
    height: 745px;
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

.check-box {
    margin-top: 20px;
    margin-right: 10px;
}

.leftTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.swichBtn {
    font-size: 11px;
}

.leftToolWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -25px;
}

.rightBtn {
    width: 55%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: -40px;
}

.resetBtn {
    margin-top: 18px;
}

.user-detail {
    position: fixed;
    bottom: 10px;
    // transform: translate(20%, 80%);
    transition: all .5s;
    z-index: 1;
}

.visibleBtn {
    text-align: center;
    height: 36px;
}
</style>
