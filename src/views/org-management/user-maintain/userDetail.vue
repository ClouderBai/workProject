/*
 * @Author: zhanglianhao 
 * @Date: 2018-01-31 19:30:41 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-20 17:17:56
 */

/* 
    属性
    @props {number} userId 用户id 

    方法
    @method clear 清楚数据
 */

 /**
|--------------------------------------------------
| 用户详细信息
|--------------------------------------------------
*/

<template>
    <div class="infoContainer">
        <el-tabs v-model="activeName" type="card" class="tab-container">
            <el-tab-pane label="基本信息" name="first" class="tab-height" :disabled="userInfoShow">
                <ul class="info">
                    <li>
                        <span class="title">姓名：</span>
                        <span class="content"> {{ userInfo.baseInfo && userInfo.baseInfo.name }}</span>
                    </li>
                    <li>
                        <span class="title">性别：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.gender }}</span>
                    </li>
                    <li>
                        <span class="title">电话：</span>
                        <span></span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.mobile }}</span>
                    </li>
                    <li>
                        <span class="title">排序：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.order}}</span>
                    </li>
                    <li>
                        <span class="title">级别类型：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.levelType }}</span>
                    </li>
                    <li>
                        <span class="title">所属部门：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.orgName }}</span>
                    </li>
                    <li>
                        <span class="title">所属岗位：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.postName }}</span>
                    </li>
                    <li>
                        <span class="title">职务：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.dutyCode }}</span>
                    </li>
                     <li>
                        <span class="title">身份证号：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.idNo }}</span>
                    </li>
                    <li>
                        <span class="title">全拼：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.pinyin }}</span>
                    </li>
                    <li>
                        <span class="title">简拼：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.jianpin }}</span>
                    </li>
                    <li>
                        <span class="title">住址：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.address }}</span>
                    </li>
                     <li>
                        <span class="title">出生日期：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.birthDt }}</span>
                    </li>
                    <li>
                        <span class="title">文化程度：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.eduDegree }}</span>
                    </li>
                    <li>
                        <span class="title">职称：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.userTitle }}</span>
                    </li>
                    <li>
                        <span class="title">紧急联系人：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.emergencyContactName }}</span>
                    </li>
                     <li>
                        <span class="title">紧急联系人电话：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.emergencyContactPhone }}</span>
                    </li>
                    <li>
                        <span class="title">工种：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.profession }}</span>
                    </li>
                    <li>
                        <span class="title">特种作业证：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.specialOpCert }}</span>
                    </li>
                    <li>
                        <span class="title">用户类型：</span>
                        <span class="content">{{ userInfo.baseInfo && userInfo.baseInfo.userType }}</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="用户材料" name="second" class="tab-height" :disabled="userInfoShow">
                <template v-for="item in userInfo.materials">
                    <ul class="info">
                        <li>
                            <span class="title">材料类型：</span>
                            <span class="content">{{ item.fileType }}</span>
                        </li>
                        <li>
                            <span class="title">颁发组织：</span>
                            <span class="content">{{ item.issueOrg }}</span>
                        </li>
                        <li>
                            <span class="title">颁发日期：</span>
                            <span class="content">{{ item.issueDt }}</span>
                        </li>
                        <li>
                            <span class="title">检查日期：</span>
                            <span class="content">{{ item.chechDt }}</span>
                        </li>
                        <li>
                            <span class="title">过期日期：</span>
                            <span class="content">{{ item.expireDt }}</span>
                        </li>
                        <li>
                            <span class="title">更新日期：</span>
                            <span class="content">{{ item.updateDt }}</span>
                        </li>
                        <li>
                            <span class="title">备注：</span>
                            <span class="content">{{ item.remark }}</span>
                        </li>
                    </ul>
                </template>
            </el-tab-pane>

            <el-tab-pane label="用户角色" name="third" class="tab-height" :disabled="userInfoShow">
                <template v-for="item in userInfo.roles">
                    <ul class="info">
                        <li>
                            <span class="title">角色名：</span>
                            <span class="content">{{ item.name }}</span>
                        </li>
                        <li>
                            <span class="title">角色码：</span>
                            <span class="content">{{ item.code }}</span>
                        </li>
                        <li>
                            <span class="title">角色描述：</span>
                            <span class="content">{{ item.desc }}</span>
                        </li>
                        <li>
                            <span class="title">角色排序：</span>
                            <span class="content">{{ item.order }}</span>
                        </li>
                    </ul>
                </template>
            </el-tab-pane>

            <el-tab-pane label="用户分值" name="fourth" class="tab-height" :disabled="userInfoShow">
                 <ul class="info">
                    <li>
                        <span class="title">用户分值：</span>
                        <span class="content">{{ userInfo.score && userInfo.score.score }}</span>
                    </li>
                    <li>
                        <span class="title">重置日期：</span>
                        <span class="content">{{ userInfo.score && userInfo.score.scoreResetDt }}</span>
                    </li>
                 </ul>
            </el-tab-pane>

            <el-tab-pane label="扩展信息" name="fifth" class="tab-height" :disabled="userInfoShow">
                 <ul class="info">
                    <template v-for="item in userInfo.exts">
                        <li>
                            <span class="title">{{ item.colName }}：</span>
                            <span class="content">{{ item.data }}</span>
                        </li>
                    </template>
                 </ul>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
import { fetchUserInfo } from '@/api/user'
export default {
    name: 'userDetail',
    props: {
        userId: {
            default: null
        }
    }, // 基本信息 扩展信息
    data() {
        return {
            activeName: 'first',
            userInfo: {},
            userInfoShow: true // 默认tab不可选
        }
    },
    watch: {
        userId() {
            if (!this.userId) return false // 判断是否点击数组件
            this.getUserInfo(this.userId)
            this.userInfoShow = false
        }
    },
    methods: {
        // 获取用户详细信息
        async getUserInfo(id) {
            try {
                const data = await fetchUserInfo(id)
                this.userInfo = data
                this.$emit('getUserInfo', data)
            } catch (error) {
                // console.warn(`获取用户信息：${error}`)
                console.log(error)
            }
        },
        // 清除用户信息
        clear() {
            this.userInfo = {}
            this.userInfoShow = true
        }
    }

}
</script>

<style scoped>
ul, li {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.tab-container {
    padding: 0 10px;
}
.info {
    display: flex;
    flex-flow: row wrap;
}
.info>li {
    padding: 10px 20px;
    border-bottom: 1px solid #e4e7ed;
    width: 25%;
}
.info>li:last-child {
    margin-bottom: 0;
}
.info .title {
    display: inline-block;
    width: 100px;
    text-align: left;
    font-weight: bolder;
    color: #303133;
    font-size: 12px;
}
.info .content {
    color: #303133;
    font-size: 12px;
}
.tab-height {
    height: 160px;
    overflow-y: auto;
}
</style>
