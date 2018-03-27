<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
    	
    </el-tab-pane>
    <el-tab-pane label="表单信息" name="second">
    	
    </el-tab-pane>
    <el-tab-pane label="高级设置" name="third">
    	
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        }
    }
}
</script>

<style>
</style>