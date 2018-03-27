<template>
    <div class="container">
        <iframe class="ifm" src="src/views/gantt/gantt.html" frameborder="0"></iframe>
    </div>
</template>

<script>

export default {
    name: 'gantt'
}
</script>

<style scopde>
    html { overflow-x: scroll; }
    .container{
        width: 100%;
        height: 800px;
    }
    .ifm{
        width: 100%;
        height: 100%;
    }
</style>
