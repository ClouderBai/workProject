<template>
    <div>
        <el-table
            ref="singleTable"
            border
            highlight-current-row
            v-loading="centerLoaded"
            :data="rolesData"
            style="width: 100%;cursor:pointer;">
            <el-table-column
                align="center"
                prop="code"
                label="编码"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"  
                prop="name"
                label="角色名"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="desc"
                label="描述">
            </el-table-column>
            <el-table-column
                align="center"
                prop="valid"
                label="是否可用">
                <template slot-scope="scope">
                    <span>{{scope.row.valid? '是': '否'}}</span>
                </template>
            </el-table-column>
        </el-table>   
        <div class="block pageNum">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {fetchRolesList, clearRolesList} from '@/api/roleAccess'

export default {
    data() {
        return {
            rolesData: [], 
            centerLoaded: false,
            dataCode: '',
            pageSize: 10,
            totalPage: 1
        }
    },
    methods: {
        // 数据加载
        init(ev) {
            this.dataCode = ev.code   
            this.getData(this.dataCode, 1)    
        },

        // 获取数据
        getData(code, page) {
            this.centerLoaded = true
            fetchRolesList({
                pageNo: page,
                pageSize: this.pageSize,
                groupCode: code
            }).then(res => {
                this.rolesData = res.entities
                this.totalPage = res.entityCount
                this.centerLoaded = false
            }).catch(err => {
                console.warn('角色组角色列表获取出错', err)
                this.centerLoaded = false
            })
        },

        // 清空数据
        clear(ev) {
            this.centerLoaded = true
            clearRolesList({
                groupCode: ev.code
            }).then(res => {
                this.centerLoaded = false
                this.getData(this.dataCode, 1)
                this.$emit('refresh')
            }).catch(err => {
                console.warn('角色组角色列表清空出错', err)
                this.centerLoaded = false
            })
        },

        // 可添加列表页码
        pageChange(pageNum) {
            this.pageNum = pageNum
            this.getData(this.dataCode, this.pageNum) 
        }
    }
}
</script>

<style scoped>
    .pageNum {
        margin-top: 20px;
    }
</style>
