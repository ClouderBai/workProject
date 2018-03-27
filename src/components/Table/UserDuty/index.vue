/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-27 14:19:31 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:41:13
 */

/* 
    属性
    @prop type
        selection  多选框
        index      序号
        expand     展开
*/

/*
    事件
    @event row-click 点击行时触发
    @return 选中数据对象

    @event selection-change 多选改变时触发
    @return 选中数据集合
*/

/*
    方法
    @method refreshList(String) 刷新列表数据
        (1) 搜索值
    
    @method insert(*Object) 在列表最后插入元素
        (1) 要插入的元素  可以是普通对象  也可以是Duty对象
    
    @method remove(Array) 删除check-box选中的元素
        (1) selectedData  要删除的职位类别多选集合  不传默认删除check-box选中的职位类别
 */
<template>
    <div>
        <el-table :data="dutyData" style="width: 100%;cursor:pointer;" stripe border highlight-current-row @selection-change="checkedChange" @row-click="rowClick" v-loading="loading" :height="500">
            <el-table-column :type="type" v-if="type" width="55">
            </el-table-column>
            <el-table-column label="类别名称" prop="name" align="center" width="400">
            </el-table-column>
            <el-table-column label="类别编码" prop="code" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchUserDuty, searchUserDuty, deleteUserDuty } from '@/api/user' // 请求方法
import Duty from '@/model/Duty'

export default {
    name: 'userDutyTable',
    props: ['type'],
    data() {
        return {
            loading: false,
            dutyData: [],
            selectedData: [],
            targetData: {}
        }
    },

    mounted() {
        this.init()
    },

    watch: {
        selectedData() {
            if (this.selectedData.length === 0) {
                this.$emit('selection-change', this.selectedData)
            }
        },
        targetData() {
            if (!this.targetData) {
                this.$emit('row-click', {})
            }
        }
    },

    methods: {
        init() {
            this.getList()
        },
        // 表格checked事件
        checkedChange(selected) {
            this.selectedData = selected
            this.$emit('selection-change', selected)
        },
        // 表格选中行事件
        rowClick(target) {
            this.targetData = target
            this.$emit('row-click', target)
        },
        // 提供给外部的刷新列表方法
        refreshList(value) {
            if (value) {
                this.search(value)
            } else {
                this.getList()
            }
        },
        // 提供给外部的set元素方法
        insert(item) {
            if (!(item instanceof Duty)) {
                item = new Duty().init(item)
            }
            this.dutyData.push(item)
        },
        // 提供给外部的删除元素方法
        async remove(selectedData = this.selectedData) {
            if (selectedData.length === 0) {
                this.$message.warning('请选择要删除的职位类别')
                return
            }
            try {
                await this.$confirm(
                    '此操作将删除所选职位类别, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        confirmButtonClass: 'ljt-btn primary-btn',
                        cancelButtonClass: 'ljt-btn tiffany-btn',
                        type: 'warning'
                    }
                )
                try {
                    const params = []
                    selectedData.forEach(v => {
                        params.push({
                            id: v.id,
                            mark: this.dutyData.indexOf(v)
                        })
                    })
                    await deleteUserDuty(params)
                    this.$message({ type: 'success', message: '删除成功' })
                    selectedData.forEach(v => {
                        this.dutyData.splice([this.dutyData.indexOf(v)], 1)
                    })
                } catch (error) {
                    const errorList = error.data
                        .map(v => {
                            return this.dutyData[v].name
                        })
                        .join()
                    this.$message.error(`类别 ${errorList} 已被使用无法删除`)
                }
            } catch (error) {} // eslint-disable-line
        },
        // 获取列表数据
        async getList() {
            this.loading = true
            try {
                this.dutyData = await fetchUserDuty()
                this.selectedData = []
                this.targetData = null
            } catch (error) {
                console.warn(`获取职位类别列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        },
        // 搜索职位类别列表
        async search(value) {
            if (this.loading) {
                this.$message({
                    type: 'warning',
                    message: '请耐心等待搜索结果'
                })
                return
            }
            this.loading = true
            try {
                this.dutyData = await searchUserDuty(value)
                this.selectedData = []
                this.targetData = null
            } catch (error) {
                console.warn(`搜索职位类别列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        }
    }
}
</script>