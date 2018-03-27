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
                                    v-model.trim="searchRoleKey.val" 
                                    @keyup.enter.native.prevent="searchRole">
                                    <el-button slot="append" icon="el-icon-search" @click="searchRole"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-tooltip class="item" effect="dark" content="从角色复制" placement="top-start">
                                <el-button :disabled="copyBtn" icon="bimicon-copy" class="custom-medium-btn primary-btn copyBtn" size="mini" @click="openCopy"></el-button>                        
                            </el-tooltip>
                        </el-form>
                        <role-table @row-click="rowClick" :height="600" :mini="true" ref="roleTable"></role-table>                    
                    </el-card> 
                </div> 
            </el-col> 
            <!-- 右侧部分 -->
            <el-col :span="18" class="pl20"> 
                <el-card class="box-card" style="min-height: 807px">
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
                                        v-model.trim="searchMaintainKey.val" 
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
                                <system-tree 
                                    height="600"
                                    ref="systemTree" 
                                    @refresh="refreshSystem"/>
                            </el-card>
                        </el-col>
                        <!-- 自定义模块 -->
                        <el-col :span="12">
                            <div class="btnGroup">
                                <el-button-group>
                                  <el-button
                                    :disabled="insretClassBtn"
                                    @click="insretClass"
                                    class="custom-medium-btn primary-btn" 
                                    size="mini">
                                    新建类别
                                  </el-button>
                                  <el-button 
                                    :disabled="insretBtn" 
                                    @click="insretBehavior"
                                    class="custom-medium-btn primary-btn" 
                                    size="mini">
                                    新建行为
                                  </el-button>
                                    <el-button 
                                        :disabled="disableBtn" 
                                        @click="editPermission"                                    
                                        class="custom-medium-btn primary-btn" 
                                        size="mini">
                                        修改
                                    </el-button>
                                    <el-button 
                                        :disabled="disableBtn" 
                                        class="custom-medium-btn red-btn" 
                                        @click="delPermission"
                                        size="mini"> 
                                        删除                                  
                                    </el-button> 
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
                                <custimize-tree 
                                    height="600" 
                                    ref="custimizeTree" 
                                    @refresh="refreshCustimize" 
                                    @node-click="handleCheckChange"/>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card> 
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
import roleTable from "@/components/Table/Role/index";
import MdInput from "@/components/MDinput";
import custimizeTree from "@/components/Tree/RoleCustimizeTree.vue"; // 自定义权限树
import copyDialog from "@/components/Dialog/AccessMaintain/copy.vue"; // 复制弹窗
import inertClassDialog from "@/components/Dialog/AccessMaintain/base.vue"; // 新建权限类别弹窗
import inertBehaviorDialog from "@/components/Dialog/AccessMaintain/base.vue"; // 新建权限类别弹窗
import editDialog from "@/components/Dialog/AccessMaintain/base.vue"; // 修改权限弹窗
import RoleCustomizePermission from "@/model/RoleCustomizePermission.js"; // 自定义权限类别类
import RoleCustimizeList from "@/model/RoleCustimizeList.js"; // 自定义权限行为类
import systemTree from "@/components/Tree/RoleSystemTree"; // 自定义权限行为类

export default {
  components: {
    roleTable,
    MdInput,
    copyDialog,
    inertClassDialog,
    inertBehaviorDialog,
    editDialog,
    custimizeTree,
    systemTree
  },

  computed: {
    insretClassBtn() {
      return !(this.roleClickData != "");
    },
    insretBtn() {
      return !(this.custimizeData.permissionClassData != "");
    },
    disableBtn() {
      return !(
        this.custimizeData.permissionClassData != "" ||
        this.custimizeData.permissionBehaviorData != ""
      );
    },
    copyBtn() {
      return !(this.roleClickData != "");
    }
  },

  data() {
    return {
      searchRoleKey: { val: "" }, // 角色搜索
      searchMaintainKey: { val: "" }, // 权限搜索
      custimizeData: {
        // 自定义权限数据
        permissionClassData: "", // 权限类别数据
        permissionBehaviorData: "" // 权限行为数据
      },
      roleClickData: ""
    };
  },

  methods: {
    // 角色搜索
    searchRole() {
      this.$refs.roleTable.search(this.searchRoleKey.val);
    },

    //角色权限复制
    openCopy() {
      this.$refs.copyDialog.open(this.roleClickData);
    },

    // 权限搜索
    searchMaintain(ev) {
      this.$refs.custimizeTree.search(ev);
      this.$refs.systemTree.search(ev);
    },

    // 点击角色列表
    rowClick(row) {
      if (row.code) {
        this.roleClickData = row;
        this.$refs.custimizeTree.getData(row);
        this.$refs.systemTree.getData(row);
      }
    },

    // 新建权限类别
    insretClass() {
      this.$refs.inertClassDialog.insertClass(this.roleClickData);
    },

    // 新建权限行为
    insretBehavior() {
      this.$refs.inertBehaviorDialog.insertBehavior(
        this.roleClickData,
        this.custimizeData.permissionClassData
      );
    },

    // 修改权限
    editPermission() {
      this.$refs.editDialog.edit(this.custimizeData);
    },

    // 勾选自定义权限
    handleCheckChange(ev) {
      if (ev instanceof RoleCustomizePermission) {
        // 点击权限类别
        this.custimizeData.permissionClassData = ev;
        this.custimizeData.permissionBehaviorData = "";
      } else if (ev instanceof RoleCustimizeList) {
        // 点击权限行为
        this.custimizeData.permissionBehaviorData = ev;
        this.custimizeData.permissionClassData = "";
      }
    },

    // 刷新自定义权限
    refreshCustimize() {
      this.$refs.custimizeTree.getData(this.roleClickData);
    },

    // 刷新系统权限
    refreshSystem() {
      this.$refs.systemTree.getData(this.roleClickData);
    },

    // 删除自定义权限
    delPermission() {
      this.$refs.custimizeTree.removeNodeTree(this.custimizeData);
    },

    // 保存自定义权限
    saveCustomize() {
      this.$refs.custimizeTree.save();
    },

    // 保存系统权限
    saveSystem() {
      this.$refs.systemTree.save();
    }
  }
};
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
