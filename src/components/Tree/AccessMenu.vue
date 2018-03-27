/*
 * @Author: BAICHONG 
 * @Date: 2018-03-21 10:28:47 
 * @Last Modified by: BAICHONG
 * @Last Modified time: 2018-03-27 14:47:53
 */
/**
|--------------------------------------------------
|  权限维护: 菜单树组件
|
|
|--------------------------------------------------
*/
<template>
    <div 
        :style="{ height: heightData, width:widthData }" 
        class="treeContainer" 
        v-loading="loading"
    >
        <!-- 搜索 -->
        <!-- <el-form ref="form" :model="searchFormData" @submit.native.prevent v-if="showSearch">
            <el-input clearable class="el-input-primary" placeholder="请输入搜索内容" v-model="searchFormData.orgSearchValue"/>
        </el-form> -->
        <!-- 树 -->
        <el-tree 
            :data="data"
            show-checkbox
            @current-change="treeChange" 
            node-key="id"
            default-expand-all
            :render-content="renderContent"
            ref="tree"
            check-strictly
            :default-checked-keys="checkedKeys"
            :expand-on-click-node="false"
            @check="checkChange"
            highlight-current 
            :props="defaultProps"
            
        />
        <!-- :filter-node-method="filterNode" -->
        <!-- <el-button @click="test">test</el-button>:filter-node-method="filterNode" -->
        <!-- <el-button @click="getTreeData" type="primary" size="mini">imp</el-button> -->
    </div>
</template>
<script>
import _ from 'lodash'
import { fetchAuthorityManageTree, updateAuthorityManage } from '@/api/authorityManage'
import PermissionOption from '@/views/org-management/Permission'
import StyleOptions from './TreeStyleOptions'
export default {
    props: {
        defaultId: {
            type: Number,
            default: 0
        },
        height: {
            type: String,
            default: '200'
        },
        widthData: {
            type: String,
            default: '100%'
        }
    },
    computed: {
        heightData() {
            return `${this.height}px`
        }
    },
    // watch: {
    //     filterText(val) {
    //         this.$refs.tree.filter(val)
    //     }
    // },
    data() {
        return {
            // orgId: -1,
            data: [],
            selected: {},
            defaultProps: {
                label: 'name',
                children: 'children',
                disabled: data => !data.hasCanCheck,
                isLeaf: data => !data.hasChild
            },
            // treeId: undefined,
            selectedNodeId: [], // 默认选中,初始化值,不会改变
            checkedKeys: [], // 选中checked,随点改变
            submitData: [],
            userInfo: {}, // 选中的角色数据
            loading: false

        }
    },
    methods: {
        // test
        getTreeData() {
            return this.checkedKeys.map(id => Object.assign({}, this.$refs.tree.getNode(id).data))
        },
        // 获取树数据
        loadData(id = this.orgId, code, userInfo) {
            this.userInfo = userInfo
            if (!id) { this.$message.warning(`请选择节点`); return }
            this.orgId = id
            this.loading = true
            fetchAuthorityManageTree(id, code)
                .then(res => {
                    this.selectedNodeId = [] // 初始化默认选中节点
                    this.checkedKeys = [] // 初始化选中节点
                    this.data = res
                    this.findCheckedId(res) // 根据返回的权限筛选勾选数组
                })
                .catch(e => void console.warn(`获取树数据: ${e && e.message}`))
                .finally(() => (this.loading = false))
        },

        // 找到所有checked
        findCheckedId(data) {
            // console.log('%c%s', 'color:red;font-size:20px', 'findCheckedId  : ', data)
            if (data) {
                data.forEach(item => {
                    item.CHECKED = false // 每一个节点添加自定义,本身node节点是否check (Boolean)
                    item.ROLEACTION = [] // 每一个节点添加自定义,本身node节点详细权限数组([])
                    if (item.hasCanCheck && item.roleActionList) { // 能被勾选,并且有权限数组
                        let defaultPermission = PermissionOption[item.code] || (this.$message.error(`${item.name}: 未配置${item.code}权限`) || { default: [] })// 找到权限层级default
                        defaultPermission = defaultPermission.default
                        // 找到节点所有actions
                        const actionsArr = item.roleActionList.map(actionsArray => actionsArray.action)
                        // 如果满足对应permission,是checked,加入默认选中数组
                        const result = defaultPermission.every(v => actionsArr.includes(v))
                        if (result) {
                            // item.hasCheck = true
                            this.selectedNodeId.push(item.id)
                            this.checkedKeys.push(item.id)
                            item.CHECKED = true
                            item.ROLEACTION = actionsArr // 节点所有权限
                        }
                    }
                    if (item.hasChild) {
                        this.findCheckedId(item.children)
                    }
                })
            }
        },

        // 自定义树节点
        renderContent(h, { node, data, store }) {
            const treeIcon = data.icon ? data.icon : StyleOptions.iconDefault
            const iconColor = data.iconColor ? data.iconColor : StyleOptions.textColorDefault
            return h('span', {}, [h('i', { style: { color: iconColor }, class: treeIcon }, [' ']), h('span', {}, node.label)])
        },

        // 当前节点改变时
        treeChange(data) {
            if (data.hasCanCheck) {
                this.selected = data
                // console.log('%c%s', 'color:red;font-size:20px', 'data  : ', data)
                this.$emit('treeChange', data)
            } else {
                this.$emit('clearDetailData')
            }
        },

        // checked状态变化时,将数组保存起来
        checkChange(data, checkedOptions) {
            this.checkedKeys = checkedOptions.checkedKeys
            data.CHECKED = this.checkedKeys.includes(data.id) // 判断节点check值 true:checked false: 未checked
            // data.CHECKED 从false => true 需要增加权限
            if (data.CHECKED) {
                PermissionOption[data.code].default.forEach(action => {
                    data.ROLEACTION.includes(action) ? '' : data.ROLEACTION.push(action)
                })
            }
            console.log('%c%s', 'color:red;font-size:20px', 'data.ROLEACTION  : ', data)
            // node节点check改变后触发权限详情页改变
            this.$emit('accessDetailUpdate', data)
        },
        // 权限详情页check状态更新后,更新对应节点,自定义key:ROLEACTION字段
        permissionDetailChange(permission) {
            const data = this.$refs.tree.getNode(this.selected).data
            if (data.CHECKED) {
                data.ROLEACTION = [...permission, ...PermissionOption[data.code].default]
            }
            // 将详情页点击的权限保存到node节点上
            console.log('%c%s', 'color:red;font-size:20px', 'this.data  : ', JSON.stringify(this.data))
        },

        // 保存权限
        savePermission() {
            this.submitData = []
            this.handlerSubmitData(this.data)
            // console.log('%c%s', 'color:red', 'this.data  : ', JSON.stringify(this.data))
            updateAuthorityManage(this.submitData)
                .then(res => {
                    console.log('%c%s', 'color:red;font-size:20px', 'res  : ', res)
                })
            // console.log('%c%s', 'color:red;font-size:20px', 'this.submitData  : ', this.submitData)
            // setTimeout(() => {
            //     console.log('%c%s', 'color:red;font-size:20px', 'this.submitData  : ', this.submitData)
            // }, 1e3)
        },
        //
        handlerSubmitData(data) {
            const template = {
                roleCode: this.userInfo.code,
                orgId: this.userInfo.orgId
            }
            data.forEach(node => {
                if (node.hasCanCheck) { // 找到可以check,hasCanCheck为true的
                    // node权限节点尚未点击,所有权限删除
                    if (node.CHECKED) {
                        // node.ROLEACTION = [...node.ROLEACTION, ...PermissionOption[node.code].default]
                        console.log('%c%s', 'color:red;font-size:20px', 'node.ROLEACTION  : ', node.ROLEACTION, node.name)
                    } else {
                        node.ROLEACTION = []
                    }
                    // roleActionList里有action,需要取差集
                    if (node.roleActionList) {
                        const roleActionArr = node.roleActionList.map(item => item.action)// 后台给的action
                        const changedActions = node.ROLEACTION // 用户改变后的action
                        // 找到后台给的action里没有的,为需要删除的
                        const hasDeleteAction = _.difference(roleActionArr, changedActions)
                        // 找到改变后的action,但是后台没有,为需要添加的
                        const hasAddAction = _.difference(changedActions, roleActionArr)
                        console.log('%c%s', 'color:red;font-size:20px', '需要删除的  : ', hasDeleteAction, node.name)
                        console.log('%c%s', 'color:red;font-size:20px', '需要添加的  : ', hasAddAction, node.name)
                        console.log('%c%s', 'color:red;font-size:20px', '后台的  : ', roleActionArr, node.name)
                        console.log('%c%s', 'color:red;font-size:20px', '改变后的  : ', changedActions, node.name)
                        // 需要添加的
                        hasAddAction.forEach(action => {
                            this.submitData.push({ ...template, action, menuCode: node.code })
                        })
                        hasDeleteAction.forEach(action => {
                            this.submitData.push(node.roleActionList.find(v => v.action === action))
                        })
                    // roleActionList为null,所有添加的action都是需要添加的
                    } else {
                        node.ROLEACTION.forEach(action => {
                            this.submitData.push({ ...template, action, menuCode: node.code })
                        })
                        console.log('%c%s', 'color:red', 'node  : ', JSON.stringify(node))
                    }
                    // node.ROLEACTION.forEach(item => {
                    // })
                }
                if (node.hasChild) {
                    this.handlerSubmitData(node.children)
                }
            })
        }
        /**
|--------------------------------------------------
| {
    "id": 4,                       // action id
    "roleCode": "ROLE_00123",      // 角色code
    "orgId": 330,                  // 组织id
    "menuCode": "BZCD_00012",      // 菜单
    "action": "authorityManage:updateAuthorityManage", // action
    "jointAction": "330#BZCD_00012#authorityManage:updateAuthorityManage"
  }
{
    "id": 127,
    "code": "ROLE_00123",
    "name": "砥砺奋进拉风教师节快乐",
    "desc": null,
    "order": 21,
    "valid": true,
    "orgId": 330,
    "orgFullName": null,
    "userId": null,
    "title": "砥砺奋进拉风教师节快乐",
    "levelType": "ROLE",
    "hasChild": false
}
|--------------------------------------------------
*/
    }
}
</script>
<style scoped>
.treeContainer {
    overflow-y: auto;
}
</style>


