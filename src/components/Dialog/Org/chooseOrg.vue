/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-07 09:23:32 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-27 13:35:44
 */

 /* 用法懒得再写一遍了  参考选择人组件  components/Dialog/User/addUser.vue /*

@method open(Object) 打开模态框
@params (1) title 标题  默认为"选择组织"
 
@method close(String,Object) 关闭模态框
@params (1) option 模态框关闭状态
        (2) data 要载荷的自定义数据 

@method onClosed(*Object) 模态框点击确认按钮时关闭时回调方法
@params (1) *option  模态框关闭状态
            *sender  组件this指向
            data     返回数据
 */


<template>
    <div class="components-container">
        <el-dialog :title="title" :visible="visible" @close="close()" append-to-body>
            <el-row>
                <el-form ref="form" :model="searchFormData" @submit.native.prevent class="mb20">
                    <el-input class="el-input-primary" placeholder="请输入搜索内容" v-model.trim="searchFormData.orgSearchValue" @keyup.enter.native.prevent="searchOrg">
                        <el-button slot="append" icon="el-icon-search" class="searchbtn" @click="searchOrg"></el-button>
                    </el-input>
                </el-form>
                <tree height="400" @changeTree='treeHandle' ref="tree"></tree>
            </el-row>
            <!-- 确认取消 -->
            <div slot="footer" class="dialog-footer">
                <el-button class="ljt-btn tiffany-btn" @click="cancel()">取 消</el-button>
                <el-button class="ljt-btn primary-btn" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tree from '@/components/Tree/OrgTreeCustom'
import DialogOptions from '../DialogOptions'

export default {
    name: 'chooseOrgdddd',
    components: {
        tree
    },
    data() {
        return {
            onClosed: function() {},
            title: '',
            visible: false,
            searchFormData: {
                orgSearchValue: '' // 组织树搜索条件
            },
            targetTreeData: {} // 树选中数据
        }
    },
    watch: {
        'searchFormData.orgSearchValue': {
            handler(val) {
                if (!val) {
                    this.searchOrg()
                }
            },
            deep: true
        }
    },
    methods: {
        treeHandle(data) {
            this.targetTreeData = data
        },

        open({ title = '选择组织' } = { title: '选择组织' }) {
            this.title = title
            this.visible = true
        },

        close(option = DialogOptions.CLOSE, hold) {
            if (!this.visible) return
            if (!hold) {
                this.visible = false
            }
            if (typeof this.onClosed === 'function') {
                const payload = {
                    option,
                    sender: this,
                    data: this.targetTreeData
                }
                this.onClosed(payload)
            }
        },

        confirm() {
            if (!this.targetTreeData.id) {
                this.$message.warning('请选择组织')
                return
            }
            this.close(
                DialogOptions.CONFIRM,
                true
            )
        },

        cancel() {
            this.close(DialogOptions.CANCEL)
        },

        // 搜索组织
        async searchOrg() {
            this.$refs.tree.search(this.searchFormData.orgSearchValue)

            // 清空一切与org相关的数据
            this.targetTreeData = {}
        }
    }
}
</script>
