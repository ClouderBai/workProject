<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <Tree @changeTree='orgTreeChange' :filter='type' height='620'/>
                </el-card>
            </el-col>

            <el-col :span="16">
                <el-row class="">
                    <el-col :span="24">
                        <el-card style="height: 68px" class="content">
                            <el-button-group>
                                <el-button @click="cancel" type="primary" size="mini">撤销</el-button>
                                <el-button @click="saveTreeStatus" type="primary" size="mini">保存</el-button>
                            </el-button-group>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top: 20px;">
                    <el-col :span="24">
                        <el-card>
                            <MenuTree ref="menuTree" @treeChange='menuChange' height='520'/>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 组件
import Tree from '../../components/Tree/OrgTreeCustom'
import MenuTree from '../../components/Tree/MenuMenageerTree'
// 配置
import Options from '../../components/Tree/Options'
// 接口
// import { fetchOrgMenuListTreeByOrgId } from '../../api/standardMenu'

export default {
    components: {
        Tree,
        MenuTree
    },
    data() {
        return {
            type: Options.MENU_ORG
        }
    },
    methods: {
        // 组织树点击事件
        orgTreeChange(val) {
            console.log('%c%s', 'color:red', '左侧  : ', JSON.stringify(val.id))
            this.$refs.menuTree.loadData(val.id)
        },

        // 菜单树点击事件
        menuChange(val) {
            // console.log('%c%s', 'color:red', '右侧  : ', JSON.stringify(val))
        },

        // 保存菜单树checked状态
        saveTreeStatus() {
            this.$refs.menuTree.saveTreeStatus()
        },

        // 撤销
        cancel() {
            this.$refs.menuTree.loadData()
        }
    }

}
</script>

<style scoped>
.content{
    display: flex;
    justify-content:flex-end;
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
