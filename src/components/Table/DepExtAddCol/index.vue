<template>
    <div>
        <el-row>
                <el-table
                        ref="multipleTable"
                        :data="classData"
                        tooltip-effect="dark"
                        style="width: 100%;cursor:pointer;"                   
                        border
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="公司名称"
                            prop="name"
                            align="center"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            label="是否启用"
                            align="center"                    
                            width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.valid? '是': '否'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="组织类型"
                        align="center"                    
                        prop="type">
                        </el-table-column>
                </el-table>
        </el-row>
    </div>
</template>

<script>
import {fetchOrgInfo, updateOrgProps, deleteOrgProps} from '@/api/org'


export default {
    props:[
        'type' // 表格类型
    ],
    data() {
        return {
            classData: null, // 页面表格数据
            selectedData: '', // 多选选中数据
            editedData: '' // 单选修改数据
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 数据加载
        init() {
            fetchOrgInfo().then(res => {
                this.classData = res
            }).catch(err => {
                console.warn('组织扩展属性获取数据错误', err)                
            })
        },

        // 新增
        insertData(ev) {
            this.classData.push(ev)
        },

        // checkbox选中
        handleSelectionChange(selection) {
            this.$emit('selection-change', selection)
            this.selectedData = selection          
        },

        // 更新属性状态
        updateOrgState(ev) {
            console.log(ev)
            let words, id = []
            ev? words = '启用': words = '停用'
            this.selectedData.forEach(val => {id.push(val)})
            let idCheck = id.filter(item => {return item.valid == ev})
            if (idCheck.length == this.selectedData.length) {
                this.$message({type: 'success', message: '已' + words})
            } else if (idCheck.length >= 1 && idCheck.length != this.selectedData.length) {
                idCheck = id.filter(item => item.valid != ev)
                idCheck.filter(item => item.valid = ev)
            } else if (idCheck.length == 0) {
                idCheck = id
                idCheck.filter(item => item.valid = ev)
            }
            this.$store.commit("SHOW_WAITING")                                                                                        
            updateOrgProps(idCheck).then(res => {
                this.$message({type: 'success', message: '已' + words})
                this.init()
                this.$store.commit("CLOSE_WAITING")                                                
            }).catch(err => {
                this.$message.error(words + '失败')
                console.warn('更新启停状态接口出错', err)
                this.$store.commit("CLOSE_WAITING")                                                
            })        
        },

        // 删除
        remove() {
            let id = []
            this.selectedData.forEach(value => {
                id.push(value.id)
            });
            this.selectedData = ''
            this.$confirm('此操作将删除该属性, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit("SHOW_WAITING")                                                                            
                deleteOrgProps(id).then(res => {
                    this.$message({type: 'success', message: '删除成功'})
                    this.$store.commit("CLOSE_WAITING")                                
                    this.init()
                }).catch(err => {
                    this.$message.error('删除失败')
                    console.warn('删除请求出错', err)
                    this.$store.commit("CLOSE_WAITING")
                    if(err.message) {
                        this.$message.error(err.message)                        
                    }                                
                })
            })
        },

    }
}
</script>

<style scoped>

</style>
