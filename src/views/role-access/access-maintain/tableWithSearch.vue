/*
 * @Author: ShaXin 
 * @Date: 2018-01-29 17:42:54 
 * @Last Modified by: ShaXin
 * @Last Modified time: 2018-01-30 19:28:15
  方法
    @method searchTable() 搜索列表
    @method handleCurrentChange() 获取当前被选择的行
 */
<template>
    <span>
        <el-card class="table-card">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
            </div>
            <el-row>
                <el-col :span="14">
                    <el-form>
                        <el-form-item>
                            <md-input icon="search" class="orgSearchInput" v-model="searchTableData" @keyup.enter.native='searchTable'>搜索</md-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
           <access-table ref="table" @handleCurrentChange = "handleCurrentChange"></access-table>
        </el-card>
    </span>
</template>
<script>
import MdInput from "@/components/MDinput"; // Md搜索框
import { mapMutations } from "vuex"; // vuex
import { getRoleList } from "@/api/roleAccess";
import accessTable from "@/components/Table/accessMaintain/index";
export default {
  name: "tableWithSearch",
  components: {
    MdInput,
    accessTable
  },
  data() {

    return {
      searchTableData: "",
      currentHandleCode: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.table.init();
    },

    // 获取table被选择的行
    handleCurrentChange(val) {
      this.currentHandle = val;
      this.$emit("handleCurrentChange", val);
    },
    
    // 搜索列表
    searchTable(){
      this.$refs.table.searchTableData(this.searchTableData)
    }
  }
};
</script>
<style>
.tree-card,
.table-card {
  height: 600px;
}
</style>
