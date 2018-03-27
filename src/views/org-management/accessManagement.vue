/*
 * @Author: BAICHONG 
 * @Date: 2018-03-16 13:20:43 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-27 13:38:03
 */
 /**
|--------------------------------------------------
| 权限维护页面
| 
| 
|--------------------------------------------------
*/
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <!-- 角色树 -->
                    <Tree @changeTree='changeTree'  :filter='type' height='620'/>
                </el-card>
            </el-col>

            <el-col :span="16" class="">
                <el-row class="">
                    <el-col :span="24" class="">
                        <el-card style="height: 68px" class="content">
                            <el-button-group>
                                <el-button type="primary" size="mini">撤销</el-button>
                                <el-button @click="savePerission" type="primary" size="mini">保存</el-button>
                            </el-button-group>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top: 20px;">
                    <el-col :span="12">
                        <el-card>
                            <!--权限树 -->
                            <AccessMenu @treeChange="permissionChange" @accessDetailUpdate='accessDetailUpdate' @clearDetailData='clearDetailData' height='520' ref="AccessMenu"/>
                        </el-card>
                    </el-col>

                    <el-col :span="12">
                        <el-card>
                            <!-- 权限详情页 -->
                            <AccessMenuDetail @treeCheckedChange='treeCheckedChange' ref="AccessMenuDetail"/>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Tree from '../../components/Tree/OrgTreeCustom'
import Options from '../../components/Tree/Options'
import AccessMenu from '../../components/Tree/AccessMenu'
import AccessMenuDetail from '../../components/Tree/AccessMenuDetail'
// import Permission from '@/views/org-management/Permission'

export default {
    components: {
        Tree,
        AccessMenu,
        AccessMenuDetail
    },
    data() {
        return {
            type: Options.ACTION_ORG,
            userRoleTreeSelect: {},
            permissionTreeSelect: {},
            permissionDetailSelect: {}
        }
    },
    methods: {
        // 组织树点击事件
        changeTree(val) {
            this.userRoleTreeSelect = val
            // console.log('%c%s', 'color:red', 'val  : ', JSON.stringify(val))
            this.$refs.AccessMenu.loadData(val.orgId, val.code, val)
        },
        // 权限树点击事件
        permissionChange(val) {
            this.permissionTreeSelect = val
            this.$refs.AccessMenuDetail.loadData(val)
            // console.log('%c%s', 'color:red;font-size:20px', '权限树点击事件  : ', JSON.stringify(val))
        },
        // 权限树点击CheckBox事件
        accessDetailUpdate(val) {
            this.$refs.AccessMenuDetail.loadData(val)
        },
        // 权限详情页点击CheckBox事件,返回点选详细权限数组[]
        treeCheckedChange(permission) {
            // console.log('%c%s', 'color:red;font-size:20px', 'val  : ', permission)
            this.$refs.AccessMenu.permissionDetailChange(permission)
        },
        // 清楚详情页数据
        clearDetailData() {
            this.$refs.AccessMenuDetail.clearDetailData()
        },
        // 保存权限
        savePerission() {
            // const defaultPermission = Permission[this.permissionTreeSelect.code].default
            // const data = this.$refs.AccessMenuDetail.getTreeData().reduce((total, next) => ([...total, ...next.action]), [])
            // console.log('%c%s', 'color:red;font-size:20px', 'data  : ', data)
            this.$refs.AccessMenu.savePermission()
        }

    }
}
</script>

<style scoped>
.content{
    display: flex;
    justify-content:flex-end;
}
.text {
    /* font-size: 14px; */
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 32.5%;
    height: 660px;
}
</style>
