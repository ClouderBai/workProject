/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-20 17:17:22 
 * @Last Modified by:   zhanglianhao 
 * @Last Modified time: 2018-03-20 17:17:22 
 */
/**
|--------------------------------------------------
| 公司详细信息
|--------------------------------------------------
*/
<template>
    <div class="infoContainer">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基本信息" name="first" class="tab-container">
                <ul class="info" >
                    <li>
                        <span class="title">{{type}}名称：</span>
                        <span class="content" v-if="hasData"> {{ baseData && baseData.fullName }}</span>
                    </li>
                    <li>
                        <span class="title">{{type}}简称：</span>
                        <span class="content" v-if="hasData">{{ baseData && baseData.name }}</span>
                    </li>
                    <li>
                        <span class="title">{{type}}编码：</span>
                        <span class="content" v-if="hasData">{{ baseData && baseData.code }}</span>
                    </li>
                    <li v-if="!extShow">
                        <span class="title">级别类型：</span>
                        <span class="content" v-if="hasData">{{ levelType}}</span>
                    </li>
                    <li v-if="!extShow">
                        <span class="title">业务类型：</span>
                        <span class="content" v-if="hasData">{{ bizType }}</span>
                    </li>
                    <li v-if="!extShow">
                        <span class="title">{{type}}属性：</span>
                        <span class="content" v-if="hasData">{{ stakeholderType }}</span>
                    </li>
                    <li v-else>
                        <span class="title">{{type}}类型：</span>
                        <!-- {{ baseData && baseData.positionId }} -->
                        <span class="content" v-if="hasData">{{ position }}</span>
                    </li>
                    <li>
                        <span class="title">{{type}}全拼：</span>
                        <span class="content" v-if="hasData">{{ baseData && baseData.pinyin }}</span>
                    </li>
                    <li>
                        <span class="title">{{type}}简拼：</span>
                        <span class="content" v-if="hasData">{{ baseData && baseData.jianpin }}</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="扩展信息" name="second" :disabled="extShow">
                <ul class="info">
                    <template v-for="item in extData" v-if="hasData">
                        <li>
                            <span class="title">{{ item.colName }}：</span>
                            <span class="content">{{ item.data }}</span>
                        </li>
                    </template>
                </ul>
                <p v-if="!hasData" class="detailPanel">
                    暂无数据
                </p>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'companyDetail',
    props: ['orgInfo'], // 基本信息 扩展信息
    created() {
        this.$store.dispatch('getPositionOpt')
        this.$store.dispatch('getMenuFromOpt')
    },
    data() {
        return {
            activeName: 'first',
            positionOptions: {},
            baseData: {},
            extData: {},
            type: '',
            extShow: '',
            hasData: false
        }
    },
    watch: {
        orgInfo(val) {
            this.hasData = Boolean(val && val.departInfoDmnObj)
            this.baseData = this.orgInfo.departInfoDmnObj
            this.extData = this.orgInfo.orgExtColDmnObjList
            if (this.orgInfo && this.orgInfo.departInfoDmnObj && this.orgInfo.departInfoDmnObj.positionId) {
                this.activeName = 'first'
                this.extShow = true// 判断是否展示扩展信息
                this.type = '岗位'// 判断级别类型
            } else {
                this.extShow = false
                this.type = '部门'
            }
        }
    },
    computed: {
        position() {
            return this.$store.state.dictionary.positionOpt.get(this.baseData.positionId)
        },
        levelType() {
            return this.$store.state.dictionary.menuFromOpt.levelType.get(this.baseData.levelType)
        },
        bizType() {
            return this.$store.state.dictionary.menuFromOpt.bizType.get(this.baseData.bizType)
        },
        stakeholderType() {
            return this.$store.state.dictionary.menuFromOpt.stakeholderType.get(this.baseData.stakeholderType)
        }

    }
}
</script>

<style scoped>
ul,
li {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.tab-container {
    padding: 0 20px;
}
.info > li {
    padding: 10px 0;
    border-bottom: 1px solid #e4e7ed;
}
.info > li:last-child {
    margin-bottom: 0;
}
.info .title {
    display: inline-block;
    width: 65px;
    text-align: left;
    color: #303133;
    font-size: 12px;
    font-weight: bolder;
}
.info .content {
    color: #606266;
    font-size: 12px;
}
.detailPanel {
    text-align: center;
}
</style>
