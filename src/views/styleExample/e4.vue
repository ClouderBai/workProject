/*
 * @Author: ZHAOSIYU 
 * @Date: 2018-03-20 15:17:47 
 * @Last Modified by: ZHAOSIYU
 * @Last Modified time: 2018-03-20 15:19:09
 */

<template>
    <el-card>
        <!-- 按钮组开始 -->
        <el-row>
            <el-col>
                <el-form :model="searchFormData" class="fl">
                    <el-form-item>
                        <el-input placeholder="搜索角色" v-model.trim="searchFormData.roleSearchValue" @keyup.enter.native.prevent='searchRole' class="el-input-primary">
                            <el-button class="choseBtn" slot="append" type="primary" icon="el-icon-search" @click="searchRole">
                            </el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button-group class="fr">
                    <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCreateRole">新建</el-button>
                    <el-button size="medium" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="update">修改</el-button>
                    <el-button size="medium" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="remove">删除</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <!--按钮组结束 -->
        <!-- 表格模块开始 -->
        <el-col :span="24">
            <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="number" label="id" align="center"></el-table-column>
                    <el-table-column prop="code" label="编码" align="center"></el-table-column>
                    <el-table-column prop="roleName" label="角色名" align="center"></el-table-column>
                    <el-table-column prop="describe" label="描述" align="center"></el-table-column>
                    <el-table-column prop="sortNumber" label="排序号" align="center"></el-table-column>
                    <el-table-column prop="available" label="是否可用" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="tableData.available" active-text="是" inactive-text="否"></el-switch>
                    </template>
                    </el-table-column>
                    <el-table-column prop="drag" label="拖拽" align="center">
                        <template slot-scope="scope">
                        <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- 分页开始 -->
            <el-col :span="24" class="mt20 mb20">
                <el-pagination 
                background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="pageNo" 
                :page-size="pageSize" 
                :page-sizes="pageSizes" 
                :layout="layoutOption" 
                :total="total">
                </el-pagination>
            </el-col>
            <!-- 分页结束 -->
        </el-col>
        <!-- 表格模块结束 -->
        <!-- mini小图标 （图标+文字）-->
        <el-button-group class="fl mb20">
            <el-button size="mini" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCreateRole">新建</el-button>
            <el-button size="mini" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="update">修改</el-button>
            <el-button size="mini" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="remove">删除</el-button>
        </el-button-group>

        <el-button-group class="fr mb20">
            <el-button size="mini" icon="bimicon-roundaddlight" @click="openDetail"> 新建</el-button>
            <el-button size="mini" icon="bimicon-edit" @click="adjustment"> 修改</el-button>
            <el-button size="mini" icon="bimicon-delete" type="danger" plain> 删除</el-button>
            <el-button size="mini" icon="bimicon-settings"> 调整</el-button>
        </el-button-group>
        <!-- mini小图标 （图标）-->
            <el-button-group class="fl  mb20" style="margin-top: 50px; margin-left: -220px;">
                <el-tooltip class="item" effect="dark" content="新建" placement="top-start">
                <el-button size="mini" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openCreateRole"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                <el-button size="mini" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="update"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button size="mini" icon="bimicon-delete" class="custom-medium-btn red-btn" @click="remove"></el-button>
                </el-tooltip>
            </el-button-group>            
            <el-button-group class="fr mb20" style="margin-top: 50px;margin-right: -200px;">
                <el-tooltip class="item" effect="light" content="新建" placement="top-start">
                <el-button size="mini" icon="bimicon-roundaddlight" @click="openDetail"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="修改" placement="top-start">
                <el-button size="mini" icon="bimicon-edit" @click="adjustment"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="删除" placement="top-start">
                <el-button size="mini" icon="bimicon-delete" type="danger" plain></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="调整" placement="top-start">
                <el-button size="mini" icon="bimicon-settings"> </el-button>
                </el-tooltip>
            </el-button-group>      
            <!-- mini小图标 （文字）-->
            <el-button-group class="fl  mb20" style="margin-top: 100px; margin-left: -220px;">
                <el-button size="mini" class="custom-medium-btn primary-btn" @click="openCreateRole">新建</el-button>
                <el-button size="mini" class="custom-medium-btn primary-btn" @click="update">修改</el-button>
                <el-button size="mini" class="custom-medium-btn red-btn" @click="remove">删除</el-button>
            </el-button-group>            
            <el-button-group class="fr mb20" style="margin-top: 100px;margin-right: -226px;">
                <el-button size="mini" @click="openDetail">新建</el-button>
                <el-button size="mini" @click="adjustment">修改</el-button>
                <el-button size="mini" type="danger" plain>删除</el-button>
                <el-button size="mini"> 调整</el-button>
            </el-button-group>      
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            pageSizes: [15, 25, 35, 50, 100], // 分页每页条数变化
            // value：true,
            // available:false,
            searchFormData: '',
            roleSearchValue: '',
            tableData: [{
                number: 25,
                code: 'MWZZ',
                roleName: '神奇的种子',
                describe: '我是一颗小种子,终于长大了!',
                sortNumber: '1',
                // available:'是',
                drag: ''
            }, {
                number: 26,
                code: 'BSHX',
                roleName: '美好的世界',
                describe: '',
                sortNumber: '2',
                // available:'否',
                drag: ''
            }, {
                number: 27,
                code: 'KDY',
                roleName: '多姿多彩的生活',
                describe: '',
                sortNumber: '3',
                // available:'是',
                drag: ''
            }, {
                number: 28,
                code: 'DCY',
                roleName: '明媚的阳光',
                describe: '',
                sortNumber: '4',
                // available:'是',
                drag: ''
            }, {
                number: 29,
                code: 'YGS',
                roleName: '广阔的草原',
                describe: '',
                sortNumber: '5',
                // available:'否',
                drag: ''
            }, {
                number: 30,
                code: 'PD',
                roleName: '绿油油的草地',
                describe: '',
                sortNumber: '6',
                // available:'是',
                drag: ''
            }, {
                number: 31,
                code: 'JNG',
                roleName: '火红的太阳',
                describe: '',
                sortNumber: '7',
                // available:'是',
                drag: ''
            }, {
                number: 32,
                code: 'PKQ',
                roleName: '银装素裹',
                describe: '',
                sortNumber: '8',
                // available:'是',
                drag: ''
            }, {
                number: 33,
                code: 'XHL',
                roleName: '美丽的童话世界',
                describe: '',
                sortNumber: '9',
                // available:'是',
                drag: ''
            }]
        }
    },
    methods: {
        searchRole() {
        },
        openCreateRole() {
        },
        update() {
        },
        remove() {
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

