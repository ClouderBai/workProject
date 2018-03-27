/*
 * @Author: ZHAOSIYU 
 * @Date: 2018-03-20 15:00:53 
 * @Last Modified by: ZHAOSIYU
 * @Last Modified time: 2018-03-20 15:12:44
 */

<template>
  <div class="components-container">    
    <el-row>
      <!--树节点BEGIN-->
      <el-col :span='6'>       
        <div class="bim-card">
          <el-card class="box-card">
            <div slot="header" class="plr20">
              <el-button class="fr mt10" type="text">操作按钮</el-button>
              <h2>card加可编辑表格演示</h2>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
        </div> 
        <div class="bim-card mt20">
           <el-card class="box-card">
              <div slot="header" class="plr20">
                <h2>组织信息面板</h2>
              </div>
              <el-tabs v-model="activeName" type="card" v-cloak>
                <el-tab-pane label="基础信息" name="first">                                  
                  <div class="plr10 pb20">
                  <ul class="bim-list1"> 
                    <li class="float">
                      <strong class="title">部门名称：</strong> 
                      <p class="content">湖北路桥投资集团</p>                                                                                          
                    </li>
                    <li class="float">
                      <strong class="title">级别类型：</strong>                                           
                      <p class="content">湖北路桥投资集团</p>                                                                                                                                                                          
                    </li>
                    <li class="float">
                      <strong class="title">首称：</strong> 
                      <p class="content">湖北路桥</p>                  
                    </li>
                    <li class="float"> 
                      <strong class="title">业务类型：</strong>                 
                      <p class="content">湖北路桥</p>                      
                    </li>
                    <li class="float">
                      <strong class="title">编码：</strong>
                      <p class="content">UMS33</p>                                                                                                                                                        
                    </li>                                                                                                                                                          
                    <li class="float">
                      <strong class="title">部门属性：</strong>
                      <p class="content">UMS33</p>  
                    </li>                
                    </ul>
                  </div>
                  </el-tab-pane>
                <el-tab-pane label="扩展信息" name="second" class="extendInfo">
                  <div class="plr10 pb20">
                  <ul class="bim-list1"> 
                    <li class="nofloat">
                      <strong class="title">部门名称：</strong> 
                      <p class="content">湖北路桥投资集团</p>                                                                                          
                    </li>
                    <li class="nofloat">
                      <strong class="title">级别类型：</strong>                                           
                      <p class="content">湖北路桥投资集团</p>                                                                                                                                                                          
                    </li>
                    <li class="nofloat">
                      <strong class="title">首称：</strong> 
                      <p class="content">湖北路桥</p>                  
                    </li>
                    <li class="nofloat"> 
                      <strong class="title">业务类型：</strong>                 
                      <p class="content">湖北路桥</p>                      
                    </li>
                    <li class="nofloat">
                      <strong class="title">编码：</strong>
                      <p class="content">UMS33</p>                                                                                                                                                        
                    </li>                                                                                                                                                          
                    <li class="nofloat">
                      <strong class="title">部门属性：</strong>
                      <p class="content">UMS33</p>  
                    </li>                
                    </ul>
                  </div>
                </el-tab-pane>                              
              </el-tabs>
            </el-card>
        </div>
      </el-col>
      <!--树节点END-->
      <el-col :span='18' class="pl20">       
        <!--card加表格组件-->
        <div class="bim-card">
          <el-card class="box-card">
            <div slot="header" class="plr20">
              <h2>用户列表</h2>
            </div>            
            <el-row class="mb20">
              <el-col :span="24">
                <!--搜索框beigin-->
                <div class="bim-search1 fr ml10">
                <el-form ref="form" :model="form">
                  <el-input placeholder="请输入搜索内容" v-model="input4" class="el-input-primary">
                    <el-button slot="append" icon="el-icon-search" class="searchbtn"></el-button>
                  </el-input>
                </el-form>
                </div>
                <!--搜索框end-->
                  <!--下拉begin-->
                  <el-dropdown size="small" style="vertical-align:top;" class="fr ml10">
                    <el-tooltip class="item" effect="dark" content="设置" placement="top-start">
                        <el-button type="primary"><i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    </el-tooltip> 
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="dutyMaintain">职业类别维护</el-dropdown-item>
                      <el-dropdown-item command="userPropsExt">用户属性扩展</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!--下拉end-->
                  <!--按钮组begin-->
                  <el-button-group class="fl">
                    <el-tooltip class="item" effect="dark" content="新建" placement="top-start">
                        <el-button size="medium" icon="bimicon-roundaddlight" class="custom-medium-btn primary-btn" @click="openInfo"></el-button>                       
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                        <el-button size="medium" icon="bimicon-edit" class="custom-medium-btn primary-btn" @click="modifyInfo"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button size="medium" icon="bimicon-delete" class="custom-medium-btn red-btn"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="调整" placement="top-start">
                        <el-button size="medium" icon="bimicon-settings" class="custom-medium-btn primary-btn" @click="adjustment"></el-button>
                    </el-tooltip>     
                  </el-button-group>
                  <!--按钮组end-->
                </el-col>
              </el-row>
              <el-row class="mb20">
                <el-col :span="24">
                <!-- 表格begin -->
                 <el-table class="tablebtn mb10" :data="tableData" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection"  width="55"></el-table-column>
                    <el-table-column label="日期" width="180">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column  prop="name"  label="姓名" sortable width="180"></el-table-column>
                    <el-table-column prop="province" label="省份" width="180"></el-table-column>
                    <el-table-column prop="city" label="市区" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                  </el-table>
                <!-- 表格end -->
                <!-- 块2 begin-->
                <!-- 分页begin -->
                <div class="mb20">
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
                </div>
                <!-- 分页end -->
                <!-- 块2end -->
                <!-- 块3begin -->
                   <!--搜索框beigin-->
                <el-form ref="form" :model="form" class="fr ml10 mt20">
                  <el-input placeholder="请输入搜索内容" v-model="input4">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form>
                <!--搜索框end-->
                <!--下拉begin-->
                <el-dropdown size="small" class="fr mt20">
                  <el-tooltip class="item" effect="light" content="设置" placement="top-start">
                      <el-button><i class="el-icon-arrow-down el-icon--right"></i></el-button>
                  </el-tooltip>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="dutyMaintain">职业类别维护</el-dropdown-item>
                    <el-dropdown-item command="userPropsExt">用户属性扩展</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!--下拉end-->
                <!--按钮组begin-->
                <el-button-group class="fl mt20">
                  <el-tooltip class="item" effect="light" content="新建" placement="top-start">
                    <el-button size="medium" icon="bimicon-roundaddlight" @click="openDetail"></el-button>
                  </el-tooltip>
                    <el-tooltip class="item" effect="light" content="修改" placement="top-start">
                    <el-button size="medium" icon="bimicon-edit"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="删除" placement="top-start">
                    <el-button size="medium" icon="bimicon-delete" type="danger" plain></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="调整" placement="top-start">
                    <el-button size="medium" icon="bimicon-settings"></el-button>
                  </el-tooltip>
                </el-button-group>
                <!--按钮组end-->
                <!-- 块3end -->            
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
         <template>
           <!-- 弹出框 -->
           <three-base ref="threeBase"></three-base>
           <three-pop ref="threePop"></three-pop>
           <three-user ref="threeUser"></three-user>
         </template>
    </el-row>
  </div>
</template>
<script>
import threeBase from './Dialog/Three/base'
import threePop from './Dialog/Three/pop'
import threeUser from './Dialog/Three/user'

export default {
    components: {
        threeBase,
        threePop,
        threeUser
    },
    data() {
        return {
            activeName: 'first',
            form: '',
            input4: '',
            handleSelectionChange: false,
            model: '',
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },

    methods: {
        openInfo() {
            this.$refs.threeBase.open()
            this.$refs.threeBase.onClosed = args => {
            }
        },
        openDetail() {
            this.$refs.threePop.open()
            this.$refs.threePop.onClosed = args => {
            }
        },
        modifyInfo() {
            this.$refs.threeUser.open()
            this.$refs.threeUser.onClosed = args => {
            }
        }
        // adjustment() {
        //   this.$refs.threePicture.open();
        //   this.$refs.threePicture.onClosed = args => {
        //   };
        // }
    }
}
</script>

<style scoped>

</style>


