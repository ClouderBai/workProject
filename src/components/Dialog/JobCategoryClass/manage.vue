/*
 * @Author: ShaXin 
 * @Date: 2018-01-22 12:00:58 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-01-31 15:57:15
 */
<template>
    <div>
        <el-dialog title="岗位类别维护" :visible="visible" @close="close">

            <!-- 类别按钮 -->
            <el-row style="text-align: center">
                <div class="allWrap">
                    <el-button-group>
                        <el-button @click="openModal('positionAdd')">
                            <svg-icon icon-class="insert" />新增
                        </el-button>
                        <el-button @click="openModal('positionModify')" :disabled='canModify'>
                            <!-- <el-button @click="openModal('positionModify')"> -->
                            <svg-icon icon-class="edit" />修改
                        </el-button>
                        <el-button @click="del()" :disabled="canDel">
                            <!-- <el-button @click="del()"> -->
                            <svg-icon icon-class="delete" />删除
                        </el-button>
                    </el-button-group>
                    <div class="searchWrap">
                        <el-input v-model="searchVal" placeholder="搜索" style="width: 200px" @keyup.enter.native='searchByVal()'>
                            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchByVal()">
                            </i>
                        </el-input>
                        <!-- <md-input icon="search" style="margin-right:200px" v-model="searchVal" @keyup.enter.native='searchByVal()'>搜索</md-input> -->
                        <!-- </div>
                  <div class="searchWrap"> -->
                        <el-select v-model="searchSelect" @change="searchBySelect()" placeholder="筛选">
                            <el-option v-for="v in typeoptions" :key="v.id" :label="v.category" :value="v.category"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-row>

            <!--  查询 输入框和按钮 -->
            <!-- 列表 -->
            <job-table @tableCurrentRow="getCurrentRow" @tableSelection="getSelection" ref="table"></job-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close">关 闭</el-button>
            </div>
        </el-dialog>
        <template>
            <dia-job-category ref="jobDia"></dia-job-category>
        </template>
    </div>
</template>

<script>
import {
    deletePosition, // 删除
    fetchPositionMenuFromCache, // 岗位下拉菜单
    getAllPosition,
    getPositionByCondition,
    deleteBizType
} from "@/api/org";
import diaJobCategory from "./base";
import jobTable from "@/components/Table/JobCategoryClass/index";
import MdInput from "@/components/MDinput";
import DialogOptions from "../DialogOptions";
export default {
    components: {
        diaJobCategory,
        jobTable,
        MdInput
    },
    computed: {
        canModify() {
            return !this.currentRow;
        },
        canDel() {
            return this.multipleSelection.length < 1;
        }
    },

    data() {
        return {
            searchSelect: "", // 搜索select的值
            searchVal: "", // 查询的值
            formLabelWidth: "120px",
            multipleSelection: [], //多选值
            typeoptions: [],
            visible: false,
            currentRow: ""
        };
    },
    mounted() {
        this.init();
    },

    methods: {
        // 初始化
        init() {
            var _this = this;
            // 获取选择类别
            fetchPositionMenuFromCache().then(res => {
                _this.typeoptions = res.orgTypeCache.positionCat;
            });
        },

        // 打开弹窗
        openModal(v) {
            var params = {
                name: v,
                data: this.currentRow
            };
            this.$refs.jobDia.open(params);
            this.$refs.jobDia.onClosed = args => {
                if (args.option === DialogOptions.CONFIRM) {
                    this.$store.dispatch("getPositionOpt");
                    console.log(args.isEdit)
                    if (!args.isEdit) {
                        this.$refs.table.insert(args.data);
                    }
                    // this.$refs.table.refresh()
                }
            };
        },

        open() {
            this.visible = true;
        },

        close() {
            this.searchVal = "";
            this.searchSelect = "";
            this.visible = false;
        },

        // 删除u
        del() {
            this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$store.commit("SHOW_WAITING");
                this.$refs.table.remove();
            })
                .catch(() => {
                    this.$message({ type: "info", message: "已取消删除" });
                });
        },

        // 搜索
        searchByVal() {
            this.loading = true;
            var _this = this;
            _this.searchSelect = "";
            var data = {
                filter: _this.searchVal
            };
            this.$refs.table.searchByVal(data);
        },

        // 搜索
        searchBySelect() {
            this.$refs.table.searchBySelect(this.searchSelect);
        },

        // 获取当前行
        getCurrentRow(v) {
            this.currentRow = v;
        },

        // 获取多选被选中表格
        getSelection(v) {
            this.multipleSelection = v;
        }
    }
};
</script>

<style scoped>
.mabot30 {
    margin-bottom: 20px;
}

.allWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
