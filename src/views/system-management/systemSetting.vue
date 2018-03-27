/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-05 13:54:05 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-09 11:20:10
 */

<template>
    <div class="components-container">
        <el-card>
            <el-row class="warning">注意：请勿随便修改系统参数！</el-row>
        </el-card>
        &nbsp;
        <el-card>
            <el-row class="title">支持自定义菜单的组织类型（只有定义菜单的组织可以支持组织切换）</el-row>
            <el-checkbox v-for="(menuOrg,index) in systemParams.menuOrgList" v-model="menuOrg.settingVal" :key="index">{{menuOrg.name}}</el-checkbox>
        </el-card>
        &nbsp;
        <el-card>
            <el-row class="title">支持自定义角色的组织类型</el-row>
            <el-checkbox v-for="(roleOrg,index) in systemParams.roleOrgList" v-model="roleOrg.settingVal" :key="index">{{roleOrg.name}}</el-checkbox>
        </el-card>
        &nbsp;
        <el-card>
            <el-row class="title">支持业务权限的组织类型</el-row>
            <el-checkbox v-for="(actionOrg,index) in systemParams.actionOrgList" v-model="actionOrg.settingVal" :key="index">{{actionOrg.name}}</el-checkbox>
        </el-card>
         <el-button :disabled="noChanged" class="custom-medium-btn primary-btn margin-top-20" @click="save">   
            保存
        </el-button>
    </div>
</template>

<script>
import { fetchSystemParams, updateSystemParams } from '@/api/system' // 请求方法

export default {
    name: 'SystemSetting',
    data() {
        return {
            systemParams: {},
            strParams: ''
        }
    },
    computed: {
        noChanged() {
            return JSON.stringify(this.systemParams) === this.strParams
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            try {
                this.systemParams = await fetchSystemParams()
                // 保存数据对象的字符串  用来做脏检查
                this.strParams = JSON.stringify(this.systemParams)
            } catch (error) {
                console.error(`获取系统参数异常${JSON.stringify(error)}`)
                this.$message.error('获取系统参数失败')
            }
        },
        async save() {
            // 脏检查  数据未改变时不走接口
            try {
                await updateSystemParams(this.systemParams)
                // 数据更新后  更新数据对象字符串
                this.strParams = JSON.stringify(this.systemParams)
                this.$message.success('保存系统参数成功')
            } catch (error) {
                console.error(`保存系统参数异常${JSON.stringify(error)}`)
                this.$message.error('保存系统参数失败')
            }
        }
    }
}
</script>

<style scoped>
.warning{
    color: red
}
.title{
    margin-bottom: 10px;
}
</style>
