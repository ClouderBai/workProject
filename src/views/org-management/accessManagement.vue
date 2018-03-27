/*
 * @Author: BAICHONG 
 * @Date: 2018-03-16 13:20:43 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-22 17:33:45
 */
 /**
|--------------------------------------------------
| 权限管理页面
| 
| 
|--------------------------------------------------
*/
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <Tree @changeTree='changeTree'  :filter='type' height='620'/>
                </el-card>
            </el-col>

            <el-col :span="16" class="">
                <el-row class="">
                    <el-col :span="24" class="">
                        <el-card style="height: 68px" class="content">
                            <el-button-group>
                                <el-button type="primary" size="mini">撤销</el-button>
                                <el-button type="primary" size="mini">保存</el-button>
                            </el-button-group>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top: 20px;">
                    <el-col :span="12">
                        <el-card>
                            <AccessMenu @treeChange="permissionChange" @accessDetailUpdate='accessDetailUpdate' height='520' ref="AccessMenu"/>
                        </el-card>
                    </el-col>

                    <el-col :span="12">
                        <el-card>
                            <AccessMenuDetail ref="AccessMenuDetail"/>




                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Tree from '../../components/Tree/orgTreeCustom'
import Options from '../../components/Tree/Options'
import AccessMenu from '../../components/Tree/AccessMenu'
import AccessMenuDetail from '../../components/Tree/AccessMenuDetail'

export default {
    components: {
        Tree,
        AccessMenu,
        AccessMenuDetail
    },
    data() {
        return {
            type: Options.USER_ROLE_ORG,
            d: 'api'
        }
    },
    methods: {
        changeTree(val) {
            console.log('%c%s', 'color:red', 'val  : ', JSON.stringify(val))
            this.$refs.AccessMenu.loadData(val.orgId, val.code)
        },
        permissionChange(val) {
            this.$refs.AccessMenuDetail.loadData(val)
            console.log('%c%s', 'color:red;font-size:20px', 'permissionChange  : ', JSON.stringify(val))
        },
        accessDetailUpdate(val) {
            this.$refs.AccessMenuDetail.loadData(val)
        },
        savePerission() {

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
