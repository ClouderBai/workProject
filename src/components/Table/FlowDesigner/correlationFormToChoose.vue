/*
 * @Author: LiuJunTing 
 * @Date: 2018-03-23 16:00:44 
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-23 16:41:59
 */

/**
|--------------------------------------------------
|
|  选择关联表单列表
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

    @prop uuid  必传  node节点唯一标识
    @type String
*/

/*
    事件
    @event row-click 点击行时触发
    @return 选中数据对象
*/
<template>
    <div>
        <el-table :data="data" :type="type" style="cursor:pointer;" highlight-current-row @row-click="rowClick" border stripe>
            <el-table-column :type="type" v-if="type" width="55" align="center">
            </el-table-column>
            <el-table-column prop="formCode" label="表单编码" align="center"></el-table-column>
            <el-table-column prop="formName" label="表单名称" align="center"></el-table-column>
            <el-table-column prop="dom" label="所属节点" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'correlationFormToChoose',
    props: {
        type: {
            type: String,
            default: ''
        },
        uuid: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            data: [],
            targetData: {}
        }
    },

    watch: {
        targetData() {
            if (!this.targetData) {
                this.$emit('row-click', {})
            }
        }
    },
    mounted() {
        if (!this.uuid) return this.$message.warning(`该列表组件必须绑定uuid`)
        this.getList()
    },
    methods: {
        // 表格选中行事件
        rowClick(target) {
            this.targetData = target
            this.$emit('row-click', target)
        },

        // 获取数据列表
        getList() {
            alert(1);
            // const nodes = this.$store.getters.getAllNodes().filter(v => v.uuid !== this.uuid)
            // nodes.map(v => v.customerFormDefines.map(t => { t.customerFormDefines.belongedToNodeDisplayName = v.label;t.customerFormDefines.belongedToNodeName = v.name }))
            console.log("nodes："+JSON.stringify(this.$store.getters.getAllNodes().filter(v => v.uuid !== this.uuid)))
            console.log("呵呵:"+JSON.stringify(this.$store.getters.getAllNodes().filter(v => v.uuid !== this.uuid).map(v => v.customerFormDefines.map(t => { t.customerFormDefines.belongedToNodeDisplayName = v.label;t.customerFormDefines.belongedToNodeName = v.name }))))
        }
    }
}
</script>