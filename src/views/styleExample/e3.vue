/*
 * @Author: ZHAOSIYU 
 * @Date: 2018-03-20 15:13:01 
 * @Last Modified by: ZHAOSIYU
 * @Last Modified time: 2018-03-20 15:17:14
 */

<template>
    <div>
        <el-row>
            <!-- 左侧部分 -->
            <el-col :span="6">
                <div class="bim-card">
                    <el-card class="box-card" style="min-height: 800px">
                        <div slot="header" class="plr20 clearfix">
                            <h2>角色列表</h2>
                        </div>
                        <el-form 
                            class="toolWrap"
                            :model="searchRoleKey" 
                            @submit.native.prevent>
                            <el-form-item class="leftSearch">
                                <el-input
                                    class="el-input-primary-mini"
                                    size="mini"
                                    placeholder="搜索角色" 
                                    v-model="searchRoleKey.val" 
                                    @keyup.enter.native.prevent="searchRole">
                                    <el-button slot="append" icon="el-icon-search" @click="searchRole"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-tooltip class="item" effect="dark" content="从角色复制" placement="top-start">
                                <el-button :disabled="copyBtn" icon="bimicon-copy" class="custom-medium-btn primary-btn copyBtn" size="mini" @click="openCopy"></el-button>                        
                            </el-tooltip>
                        </el-form>
                        <template>
                        <div>
                            <el-table  id="role-table" :data="roleData" ref="table" style="width: 100%;cursor:pointer;" stripe border highlight-current-row @selection-change="checkedChange" @row-click="rowClick" v-loading="loading" :height="height">
                                <el-table-column :type="type" v-if="type && !mini" width="55"></el-table-column>   
                                <el-table-column label="编码" prop="code" align="center"></el-table-column>
                                <el-table-column label="角色名" prop="name" align="center"></el-table-column>                                                               
                            </el-table>
                            <!-- 分页开始 -->
                            <el-col :span="24" class="mt20 mb20">
                                <el-pagination 
                                background 
                                layout="prev, pager, next"
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
                        </div>
                    </template>
                    </el-card> 
                </div> 
            </el-col> 
            <!-- 右侧部分 -->
            <el-col :span="18" class="pl20"> 
                <div class="bim-card">
                <el-card class="box-card" style="min-height: 800px">
                    <el-row :gutter="20">
                        <!-- 系统模块 -->
                        <el-col :span="12">
                            <el-form 
                                class="maintainToolWrap"
                                :model="searchMaintainKey" 
                                @submit.native.prevent>
                                <el-form-item>
                                    <el-input 
                                        class="el-input-primary-mini"
                                        size="mini"
                                        placeholder="搜索权限" 
                                        v-model="searchMaintainKey.val" 
                                        @keyup.enter.native.prevent="searchMaintain(searchMaintainKey.val)">
                                        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchMaintain(searchMaintainKey.val)"></el-button>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <el-card class="box-card" style="min-height: 700px">
                                <div slot="header" class="saveBtn plr20">
                                    <h2>系统权限</h2>
                                    <el-tooltip class="item" effect="dark" content="保存修改" placement="top-start">                        
                                        <el-button
                                            icon="bimicon-pick" 
                                            class="custom-medium-btn primary-btn"
                                            @click="saveSystem"
                                            :disabled="insretClassBtn"
                                            size="mini">
                                        </el-button>
                                    </el-tooltip>
                                </div>  
                                <!-- 系统权限 -->
                                <el-tree
                                    :data="data2"
                                    show-checkbox
                                    node-key="id"
                                    :default-expanded-keys="[2, 3]"
                                    :default-checked-keys="[5]"
                                    :props="defaultProps">
                                </el-tree>
                            </el-card>
                        </el-col>
                        <!-- 自定义模块 -->
                        <el-col :span="12">
                            <div class="btnGroup">
                                <el-button-group>
                                  <el-button :disabled="insretClassBtn" @click="insretClass" class="custom-medium-btn primary-btn"   size="mini"> 新建类别</el-button>
                                  <el-button :disabled="insretBtn" @click="insretBehavior" class="custom-medium-btn primary-btn" size="mini">新建行为</el-button>
                                    <el-button :disabled="disableBtn" @click="editPermission" class="custom-medium-btn primary-btn" size="mini">修改</el-button>
                                    <el-button :disabled="disableBtn" class="custom-medium-btn red-btn"  @click="delPermission" size="mini">删除</el-button> 
                                </el-button-group>
                            </div>
                            <el-card class="box-card" style="min-height: 700px">
                                <div slot="header" class="saveBtn plr20">
                                    <h2>自定义权限</h2>
                                <el-tooltip class="item" effect="dark" content="保存修改" placement="top-start">                        
                                    <el-button
                                        icon="bimicon-pick" 
                                        class="custom-medium-btn primary-btn"
                                        @click="saveCustomize"
                                        :disabled="insretClassBtn"
                                        size="mini">                                        
                                    </el-button>
                                </el-tooltip>
                                </div> 
                                <!-- 自定义权限树 -->
                                <el-tree
                                    :data="data3"
                                    show-checkbox
                                    node-key="id"
                                    :default-expanded-keys="[2, 3]"
                                    :default-checked-keys="[5]"
                                    :props="defaultProps">
                                </el-tree>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card> 
                </div>
            </el-col>  
        </el-row>  
        <!-- 弹窗 -->
        <copyDialog ref="copyDialog" @refresh="refreshCustimize"/>
        <inertClassDialog ref="inertClassDialog" @refresh="refreshCustimize"/>
        <inertBehaviorDialog ref="inertBehaviorDialog" @refresh="refreshCustimize"/>
        <editDialog ref="editDialog" @refresh="refreshCustimize"/>
    </div>
</template>
<script>

export default {
    components: {

    },
    data() {
        return {
            searchRoleKey: { val: '' }, // 角色搜索
            searchMaintainKey: { val: '' }, // 权限搜索
            custimizeData: { // 自定义权限数据
                permissionClassData: '', // 权限类别数据
                permissionBehaviorData: '' // 权限行为数据
            },
            roleClickData: '',
            roleData: [{
                code: 'MWZZ',
                name: '神奇的种子'
            },
            {
                code: 'MWZR',
                name: '缤纷的色彩'
            },
            {
                code: 'MWZT',
                name: '美妙的音乐'
            },
            {
                code: 'MWZY',
                name: '可爱的小朋友'
            },
            {
                code: 'MWZU',
                name: '广阔的草原'
            },
            {
                code: 'MWZH',
                name: '绿油油的草地'
            }],
            data2: [{
                id: 1,
                label: '用户权限模块',
                children: [{
                    id: 4,
                    label: '添加角色'
                }, {
                    id: 4,
                    label: '获取权限角色信息'
                }, {
                    id: 4,
                    label: '获取角色信息列表'
                }, {
                    id: 4,
                    label: '更新角色信息'
                }, {
                    id: 4,
                    label: '获取角色权限信息'
                }]
            }, {
                id: 2,
                label: '组织架构模块',
                children: [{
                    id: 5,
                    label: '展示组织面板信息（基本和扩展）'
                }, {
                    id: 6,
                    label: '根据名称、拼音、简称、简拼搜索岗位或部门'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            data3: [{
                id: 1,
                label: '权限类别名称1',
                children: [{
                    id: 4,
                    label: '权限1'
                }, {
                    id: 4,
                    label: '权限2'
                }, {
                    id: 4,
                    label: '权限3'
                }]
            }, {
                id: 2,
                label: '权限类别名称2',
                children: [{
                    id: 5,
                    label: '权限4'
                }, {
                    id: 6,
                    label: '权限1'
                }]
            }, {
                id: 1,
                label: 'LA',
                children: [{
                    id: 4,
                    label: 'test'
                }, {
                    id: 4,
                    label: 'utest'
                }]
            }

            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }

        }
    }
}
</script>
<style scoped>
.toolWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 20px; */
}
.maintainToolWrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.btnGroup {
    margin-top: 7px;
    margin-bottom: 20px;
    text-align: right;
}
.saveBtn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.leftSearch {
    width: 60%;
}
.copyBtn {
    margin-bottom: 20px;
}

</style>

