<template>
    <div>
        <el-table
            border
            ref="singleTable"
            :data="rolesGroupData"
            highlight-current-row
            :show-header="showHeader"
            @row-click="rowClicked"
            class="lowerbtn"
            style="width: 100%;cursor:pointer;">
                <el-table-column 
                align="center"
                property="name" 
                label="角色组名称">
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {fetchRolesGroupList, deleteRoleGroup} from '@/api/roleAccess.js'

export default {
    data() {
        return {
            rolesGroupData: [],
            showHeader: false
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        // 数据加载
        init(data) {
            if (data) {
                fetchRolesGroupList().then(res => {
                    let filtData = res.filter( item => {
                        return item.id != data
                    })
                    this.rolesGroupData = filtData
                }).catch(err => {
                    console.warn('角色组数据加载出错', err)
                })
            } else {
                 fetchRolesGroupList().then(res => {
                    this.rolesGroupData = res
                }).catch(err => {
                    console.warn('角色组数据加载出错', err)
                })
            }   
        },

        // 选中行
        rowClicked(row, ) {
            this.$emit('row-click', row)
        },

        // 新增
        insertData(ev) {
            this.rolesGroupData.push(ev)
        },

        // 删除
        remove(ev) {
            this.$confirm('此操作将删除该角色组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: "ljt-btn primary-btn",
                cancelButtonClass: "ljt-btn tiffany-btn",
                type: 'warning'
            }).then(() => {
                this.$store.commit("SHOW_WAITING")                                                            
                deleteRoleGroup({
                    roleGroupCode: ev.code
                }).then(res => {
                    this.$message.success('删除成功')
                    this.init()  
                    this.editedData = '' 
                    this.$store.commit("CLOSE_WAITING")                                
                }).catch(err => {
                    console.warn('删除角色组错误', err)
                    this.$store.commit("CLOSE_WAITING")
                    if(err.message) {
                        this.$message.error(err.message)                        
                    }
                })                                                                         
            })
        }
    }
}
</script>

<style scoped>
.lowerbtn{
    margin-bottom: 20px;
}
    
</style>
