/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-23 16:51:10 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-23 17:45:59
 */

/**
|--------------------------------------------------
|
|  表单权限设置列表
|
|--------------------------------------------------
*/

/* 
    属性
    @prop type
    @type String
    @default ''
        selection  多选框
        index      序号
        expand     展开

    @prop height
    @type Number
    @default 300
        表格高度 

    @prop data
    @type Array
    @default []
        form表单元素

    @prop permission
    @type String
    @default 'Operable'
        设置全部权限的 radio 值
*/
<template>
    <div>
        <el-table 
            v-loading="loading" 
            :data="data" 
            :type="type"
            :height="height" 
            style="cursor:pointer;" 
            highlight-current-row 
            border 
            stripe>
            <el-table-column :type="type" v-if="type" width="55" align="center"></el-table-column>
            <el-table-column prop="elementName" label="名字" align="center"></el-table-column>
            <el-table-column prop="elementType" label="类型" align="center"></el-table-column>
            <el-table-column prop="formElementAuthority" label="权限" align="center">
                <template slot-scope="scope">
                    <el-select v-model="selectedEntities[scope.$index]" placeholder="请选择">
                        <el-option 
                            v-for="permission in permissionEntities[scope.$index]" 
                            :key="permission.id" 
                            :label="permission.label" 
                            :value="permission.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { deepCopy } from '@/utils'
export default {
    name: 'formPermissionTable',
    props: {
        type: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default: () => []
        },
        permission: {
            type: String,
            default: 'Operable'
        },
        height: {
            type: Number,
            default: 300
        }
    },
    watch: {
        // 监听设置全部权限的 radio
        permission(type) {
            this.data.forEach((v, i) => {
                switch (type) {
                    case 'Read':
                        this.selectedEntities.splice(i, 1, '只读(显示)')
                        break
                    case 'Hide':
                        this.selectedEntities.splice(i, 1, '隐藏')
                        break
                    default:
                        this.selectedEntities.splice(i, 1, '可操作')
                }
            })
        },
        selectedEntities(val) {
            this.$emit('permission', this.selectedEntities) // 权限值传入父组件
        }
    },
    data() {
        return {
            loading: false,
            targetData: {},
            permissionList: [
                {
                    id: 2,
                    value: '可操作',
                    lable: 'Operable'
                },
                {
                    id: 1,
                    value: '只读(显示)',
                    lable: 'Read'
                },
                {
                    id: 3,
                    value: '隐藏',
                    lable: 'Hide'
                }
            ],
            permissionEntities: [],
            selectedEntities: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // 根据表格数据生成权限下拉列表
        init() {
            for (let i = 0; i < this.data.length; i++) {
                // 生成 seslect 下拉列表选项
                this.permissionEntities.push(deepCopy(this.permissionList))
                // select 默认值
                this.selectedEntities.push('可操作')
            }
        }
    }
}
</script>