/*
 * @Author: BaiChong 
 * @Date: 2018-01-21 15:41:37 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-27 16:35:01
 */
<template>
    <div>
        <el-row>
            <el-col :span="6">
                <div>

                    <!-- 树开始 -->
                    <el-card class="leftTop treeContainer">
                        <el-row>
                            <el-col :span="24">
                                <el-button-group>
                                    <!-- 删除 -->
                                    <el-button 
                                        icon="bimicon-delete"
                                        class="custom-medium-btn red-btn"
                                        @click="removeTreeNode" 
                                        :disabled="!treeData"
                                        size="medium">
                                        删除
                                    </el-button>
                                    <!-- 修改 -->
                                    <el-button
                                        icon="bimicon-edit"
                                        class="custom-medium-btn primary-btn margin-right-10"   
                                        @click="openUpdate" 
                                        :disabled="!updateBtn" 
                                        size="medium"
                                        style="border-">
                                        修改
                                    </el-button>
                                    <!-- 岗位 -->
                                    <el-dropdown @command="openDiaCreateJob">
                                        <el-button size="medium" type="primary" style="margin-left:6px;line-height:17px;border-radius:4px;">
                                            岗位
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="createJob" :disabled="!treeData">新建
                                            </el-dropdown-item>
                                            <el-dropdown-item command="createBatchJob" :disabled="!treeData">批量
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <!-- 部门-->
                                    <el-dropdown @command="openDiaCreateDep">
                                        <el-button size="medium" type="primary" style="line-height: 17px;border-radius:4px;">
                                            部门
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="diaCreateRootDep">根部门
                                            </el-dropdown-item>
                                            <el-dropdown-item command="diaCreateChildDep" :disabled="!treeData">子部门
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-button-group>
                                <!-- 搜索功能 -->
                                <!-- <el-form ref="form" :model="searchFormData" @submit.native.prevent class=" float-left  mb20" style="margin-top:20px;">
                                    <el-input class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.orgSearchValue" @keyup.enter.native.prevent="seachTree">
                                        <el-button clearable slot="append" icon="el-icon-search" class="searchbtn" @click="seachTree">
                                        </el-button>
                                    </el-input>
                                </el-form> -->
                            </el-col>
                        </el-row>
                        <!-- 树 -->
                        <OrgTree @changeTree="changeTree" filter='' ref="tree" height="800" />
                    </el-card>
                    <!-- 树结束 -->

                    <!-- 基本信息开始:extData="extData" -->
                    <el-card class="leftBot">
                        <companyDetail :orgInfo="orgInfo"/>
                    </el-card>
                    <!-- 基本信息结束 -->
                </div>
            </el-col>

            <el-col :span="18">
                <div class="leftBor">
                    <el-card class="right">
                        <el-row>
                            <el-col :span="24" class="margin-bottom-20">
                                <!-- 设置开始 -->
                                <el-dropdown @command="openSetting" style="float:right;margin-left:10px;">
                                    <el-button size="medium" type="primary">
                                        设置
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="typeofBusiness">业务类别维护</el-dropdown-item>
                                        <el-dropdown-item command="jobCategory">岗位类别维护 </el-dropdown-item>
                                        <el-dropdown-item command="classMainten">级别类别维护</el-dropdown-item>
                                        <el-dropdown-item command="orgPropsExt">组织属性扩展</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <!-- 设置结束 -->

                                <!-- <el-button-group style="float:right;">
                                    <el-button type="primary" size="small">调整</el-button>
                                    <el-button type="primary" size="small">添加</el-button>
                                    <el-button type="danger" size="small" @click="userDelete">删除</el-button>
                                </el-button-group> -->
                            </el-col>

                            <el-col :span="24" class="margin-bottom-20">
                                <user-table height="680" :draggable="true" type="index" ref="userTable" @row-click="rowClick"></user-table>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <template>
            <!-- 创建根子部门 -->
            <dia-create-dep ref="createDep"></dia-create-dep>
            <!-- 业务类别维护 -->
            <typeof-business ref='typeofBusiness'></typeof-business>
            <!-- 岗位类别维护 -->
            <job-category ref='jobCategory'></job-category>
            <!-- 级别类别管理 -->
            <level-class-manage ref="classMainten"></level-class-manage>
            <!-- 组织扩展属性 -->
            <org-prop-manage ref="orgPropsExt"></org-prop-manage>
            <!-- 创建岗位 -->
            <create-job ref="createJob"></create-job>
            <!-- 创建岗位批量 -->
            <create-batch-job ref="createBatchJob"></create-batch-job>
            <!-- 更新部门 -->
            <dep-update ref="depUpdate"></dep-update>
            <!-- 更新岗位 -->
            <create-job ref="jobUpdate"></create-job>
        </template>
    </div>
</template>

<script>
// 接口
import { deleteOrgNode, fetchAllOrgInfo } from '../../api/org'
// 组件
import userTable from '@/components/Table/User/orgUser' // 用户列表
import companyDetail from './org-maintain/companyDetail'
import OrgTree from '@/components/Tree/OrgTreeCustom'
// 弹窗
import diaCreateDep from '@/components/Dialog/Department/diaCreateDep'
import createBatchJob from '@/components/Dialog/OrgJob/batch'
import createJob from '@/components/Dialog/OrgJob/create'
import jobCategory from '@/components/Dialog/JobCategoryClass/manage'
import typeofBusiness from '@/components/Dialog/BussinessClass/manage'
import levelClassManage from '@/components/Dialog/LevelClass/manage'
import orgPropManage from '@/components/Dialog/DepExtAddCol/manage'
import depUpdate from '../../components/Dialog/DepUpdate'

// 配置
import DialogOptions from '@/components/Dialog/DialogOptions'
// vuex
import { mapMutations } from 'vuex'
export default {
    components: {
        userTable,
        companyDetail,
        OrgTree,
        jobCategory,
        typeofBusiness,
        diaCreateDep,
        levelClassManage,
        orgPropManage,
        createBatchJob,
        createJob,
        depUpdate
    },
    data() {
        return {
            treeData: null, // 树当前节点数据
            searchText: '',
            searchFormData: {
                orgSearchValue: ''
            },
            orgInfo: {} // 公司基本信息  公司扩展信息
        }
    },
    mounted() {
        // console.log('%c%s', 'color:red', 'this.$refs.tree  : ', this.$refs.tree.getNode(1))
        // this.$nextTick(function() {
        //     const firstNode = document.querySelector('.el-tree-node')
        //     firstNode.click()
        // })
    },
    computed: {
        updateBtn() {
            // 判断修改按钮点击状态
            return Boolean(this.orgInfo && this.orgInfo.departInfoDmnObj)
        },
        isPosition() {
            console.log('%c%s', 'color:red', 'this.$data  : ', JSON.stringify(this))
            // 判断是不是岗位
            return Boolean(
                this.orgInfo &&
                    this.orgInfo.departInfoDmnObj &&
                    this.orgInfo.departInfoDmnObj.positionId
            )
        }
    },
    methods: {
        ...mapMutations(['SHOW_WAITING', 'CLOSE_WAITING']),

        // 点击树返回的数据
        changeTree(val) {
            this.treeData = val
            this.getTableData(val.id) // table数据
            this.getOrgInfo(val.id) // 组织基本信息
        },

        // // 搜索树
        // seachTree() {
        //     this.$refs.tree.search(this.searchFormData.orgSearchValue)
        //     this.$refs.userTable.clear()
        //     this.orgInfo = {}
        //     this.treeData = null
        // },

        // 创建部门
        openDiaCreateDep(val) {
            let currentId, flagType
            if (val === 'diaCreateRootDep') {
                currentId = -1 // 树无数据默认传 -1
                flagType = 1 // flag 1 根部门
            }
            if (val === 'diaCreateChildDep') {
                currentId = this.treeData && this.treeData.id
                flagType = 0 // flag 0 子部门
            }
            this.$refs.createDep.open({ flagType, currentId })
            this.$refs.createDep.onClosed = args => {
                if (
                    args.option === DialogOptions.CONFIRM &&
                    val === 'diaCreateRootDep'
                ) {
                    this.$refs.tree.updateRoot()
                }
                if (
                    args.option === DialogOptions.CONFIRM &&
                    val === 'diaCreateChildDep'
                ) {
                    this.$refs.tree.updateParent()
                }
                this.treeData = null
            }
        },

        // 创建岗位
        openDiaCreateJob(val) {
            this.$refs[val].open({ currentId: this.treeData.id })
            this.$refs[val].onClosed = args => {
                if (args.option === DialogOptions.CONFIRM) {
                    this.$refs.tree.updateParent()
                }
            }
        },

        // 删除部门或者岗位
        removeTreeNode() {
            this.$confirm(`将永久删除 ${this.treeData.title}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.SHOW_WAITING()
                    deleteOrgNode(this.treeData.id)
                        .then(res => {
                            this.$refs.tree.updateParent()
                            this.$message.success('删除成功!')
                        })
                        .catch(err => {
                            // this.$message.error("删除失败");
                            this.$message.error(
                                `${this.treeData.title} 无法删除`
                            )
                            console.warn(err)
                        })
                        .finally(() => {
                            this.CLOSE_WAITING()
                        })
                })
                .catch(err => {
                    console.warn('删除部门或岗位失败' + err)
                })
        },

        // 打开修改dialog
        openUpdate() {
            if (this.isPosition) {
                this.$refs.jobUpdate.open({
                    data: this.orgInfo.departInfoDmnObj,
                    currentId: this.currentId,
                    isPositionEdit: this.isPosition
                })
            } else {
                this.$refs.depUpdate.open({
                    orgInfo: this.orgInfo,
                    currentId: this.currentId,
                    isPositionEdit: this.isPosition
                })
            }
            this.$refs.depUpdate.onClosed = args => {
                if (DialogOptions.CONFIRM === args.option) {
                    this.getOrgInfo(this.treeData.id)
                    // .then(res => this.orgInfo = res)
                    this.$refs.tree.updateParent()
                }
            }
            this.$refs.jobUpdate.onClosed = args => {
                if (DialogOptions.CONFIRM === args.option) {
                    this.$refs.tree.updateParent()
                }
            }
        },

        // 设置按钮显示
        openSetting(val) {
            this.$refs[val].open()
        },

        // 组织面板基本信息
        async getOrgInfo(id) {
            try {
                const data = await fetchAllOrgInfo(id)
                this.orgInfo = data
            } catch (error) {
                console.warn(`组织面板信息：${error}`)
            }
        },

        // 获取人员table数据
        async getTableData(id) {
            const params = {
                orgId: id,
                expand: true
            }
            this.$refs.userTable.refreshList(params)
        },

        // 获取单选行数据
        rowClick(row) {
            this.selectedRow = row
        }
    }
}
</script>

<style scoped lang="scss">
.leftTop {
    height: 810px;
}
.leftBot {
    height: 400px;
    margin-top: 20px;
}
.right {
    height: 830px;
}
.leftBor {
    padding-left: 20px;
}
.seachTreeUl {
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 15px;
    .seachTreeLi {
        font-size: 15px;
        padding: 3px;
        color: #606266;
    }
}
</style>
