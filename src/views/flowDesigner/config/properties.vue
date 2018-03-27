/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-26 14:43:03 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-26 15:07:46
 */
/**
|--------------------------------------------------
| 任务流详情
|--------------------------------------------------
*/
<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="基本信息" name="first">
    	<ul class="layout-container"> 
            <li>
                <span>流程名称：</span>
                <p>{{formData.baseInfo.name || '未填写'}}</p>
            </li>
            <li>
                <span>流程描述：</span>
                <p>{{formData.baseInfo.description || '未填写'}}</p>
            </li>
        </ul>
    </el-tab-pane>
    <el-tab-pane label="表单信息" name="second">
    	<flow-property-table :data="formData.tableData"></flow-property-table>
    </el-tab-pane>
    <el-tab-pane label="高级设置" name="third">
    	
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import flowPropertyTable from '@/components/Table/FlowDesigner/flowProperties'
export default {
    name: 'properies',
    components: {
        flowPropertyTable
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    computed: {
        formData() {
            const data = this.$store.state.flowDesigner.flowDesignerData.data
            const baseInfo = {
                data: data.name,
                description: data.description
            }
            const tableData = data.nodes.reduce((total, next) => {
                return [...total, ...next.customerFormDefines]
            }, []).filter(v => { return v.formType === 'New' })
            return {
                baseInfo,
                tableData
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.layout-container {
    list-style-type: none;
    display: flex;
    flex-flow: row wrap;
    li {
        width: 100%;
        p {
            display: inline;
        }
    }
}
</style>