<template>
    <div>
        <el-table
            border
            ref="multipleTable"
            :data="choseData"
            v-loading="rightLoaded"
            tooltip-effect="dark"
            highlightCurrentRow
            @selection-change="checkData"
            style="width: 100%;margin-top:-15px;cursor:pointer;">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
                align="center"
                prop="code"
                label="编码">
            </el-table-column>
            <el-table-column
                align="center" 
                prop="name" 
                label="角色名">
            </el-table-column>
        </el-table>
        <div class="block pageNum">
            <el-pagination
                background
                @current-change="additoryPageChange"
                layout="prev, pager, next"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { fetchRolesListAdded, searchRolesList, addRoleToGroup } from '@/api/roleAccess'

export default {
    data() {
        return {
            choseData: [],
            rightLoaded: false, // loading
            dataCode: '', // 选中角色组的 code
            totalPage: 1, // 分页总数
            pageSize: 10,
            pageNum: 1,
            selectData: '', // 选中的数据
            searchOrShow: false, // 判断是搜索还是展示
            searchKey: '' // 搜索关键字
        }
    },
    methods: {
        init(ev, page) {
            this.dataCode = ev.code
            this.getData(this.dataCode, 1)
        },

        // 获取数据
        getData(code, page) {
            this.rightLoaded = true
            fetchRolesListAdded({
                pageNo: page,
                pageSize: this.pageSize,
                groupCode: code
            }).then(res => {
                this.choseData = res.entities
                this.totalPage = res.entityCount
                this.rightLoaded = false
            }).catch(err => {
                console.warn('可添加角色列表获取出错', err)
                this.rightLoaded = false
            })
        },

        // 选中
        checkData(selection) {
            this.selectData = selection
        },

        // 添加选中
        addChosen() {
            const array = []
            this.selectData.forEach(element => {
                array.push({
                    groupCode: this.dataCode,
                    roleCode: element.code
                })
            })
            this.rightLoaded = true
            addRoleToGroup(array).then(res => {
                this.rightLoaded = false
                this.$message.success('添加成功')
                this.$emit('refresh')
                this.getData(this.dataCode, 1)
            }).catch(err => {
                this.$message.error('添加失败')
                console.warn('添加角色错误', err)
            })
        },

        // 搜索
        search(ev, pageNum) {
            this.searchKey = ev
            searchRolesList({
                pageNo: pageNum,
                pageSize: this.pageSize,
                filter: this.searchKey
            }).then(res => {
                this.choseData = res.entities
                this.totalPage = res.entityCount
                this.searchOrShow = true
            }).catch(err => {
                console.warn('可添加角色列表搜索获取出错', err)
            })
        },

        // 可添加列表页码
        additoryPageChange(pageNum) {
            this.pageNum = pageNum
            if (this.searchOrShow) {
                this.search(this.searchKey, pageNum)
            } else {
                this.getData(this.dataCode, this.pageNum)
            }
        }
    }
}
</script>

<style scoped>
    .pageNum {
        margin-top: 20px;
    }
</style>
