/*
 * @Author: LiuJunTing 
 * @Date: 2018-01-27 14:19:31 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-02-13 10:41:22
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
    @method refreshList() 刷新列表数据
    
    @method insert(*Object) 在列表最后插入元素
        (1) 要插入的元素  可以是普通对象  也可以是UserExt对象

    @method update(*Boolean)    
        (1) 要更新的状态 true:启用  false:停用
    
    @method remove(Array) 删除check-box选中的元素
        (1) selectedData  要删除的用户扩展属性多选集合  不传默认删除check-box选中的用户扩展属性
 */
<template>
    <div>
        <el-table :data="extData" style="width: 100%;cursor:pointer;" stripe border highlight-current-row @selection-change="checkedChange" @row-click="rowClick" v-loading="loading" :height="500">
            <el-table-column :type="type" v-if="type" width="55">
            </el-table-column>
            <el-table-column label="属性名称" prop="colName" align="center">
            </el-table-column>
            <el-table-column label="是否启用" prop="valid" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.valid?'是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="属性类型" prop="colType" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.colType | indicatorType}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchListExt, deleteUserExt, updateExtStatus } from '@/api/user' // 请求方法
import UserExt from '@/model/UserExt'

export default {
    name: 'userExtTable',
    props: ['type'],
    data() {
        return {
            loading: false,
            extData: [],
            selectedData: []
        }
    },

    mounted() {
        this.init()
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
            this.$emit('row-click', target)
        },
        // 提供给外部的刷新列表方法
        refreshList() {
            this.getList()
        },
        // 提供给外部的set元素方法
        insert(item) {
            if (!(item instanceof UserExt)) {
                item = new UserExt().init(item)
            }
            this.extData.push(item)
        },
        // 提供给外部的更新状态方法 启用/停用
        async update(status) {
            try {
                const params = []
                this.selectedData.forEach(v => {
                    params.push({
                        extId: v.id,
                        valid: status
                    })
                })
                await updateExtStatus(params)
                this.$message({ type: 'success', message: '更新状态成功' })
                this.refreshList()
            } catch (error) {
                console.warn(
                    `更新用户扩展属性状态异常:${JSON.stringify(error)}`
                )
                this.$message.error('更新状态失败')
            }
        },
        // 提供给外部的删除元素方法
        async remove(selectedData = this.selectedData) {
            if (selectedData.length === 0) {
                this.$message.warning('请选择要删除的扩展属性')
                return
            }
            try {
                await this.$confirm(
                    '此操作将删除所选扩展属性, 是否继续?',
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
                            extId: v.id,
                            index: this.extData.indexOf(v)
                        })
                    })
                    await deleteUserExt(params)
                    this.$message({ type: 'success', message: '删除成功' })
                    selectedData.forEach(v => {
                        this.extData.splice([this.extData.indexOf(v)], 1)
                    })
                } catch (error) {
                    const errorList = error.data
                        .map(v => {
                            return this.extData[v].colName
                        })
                        .join()
                    this.$message.error(`属性 ${errorList} 已被使用无法删除`)
                }
            } catch (error) {} // eslint-disable-line
        },
        // 获取列表数据
        async getList() {
            this.loading = true
            try {
                this.extData = await fetchListExt()
                this.targetData = null
            } catch (error) {
                console.warn(`获取用户属性列表Error:${JSON.stringify(error)}`)
                this.$message.error('获取列表失败')
            } finally {
                this.loading = false
            }
        }
    }
}
</script>