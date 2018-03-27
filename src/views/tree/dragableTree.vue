<template>
    <ul id="demo">
        <item
            class="item"
            :model="treeData">
        </item>
    </ul>
</template>

<script>
import item from './treeItem/item'
const treeData = {
    name: 'My Tree',
    children: [
        { name: 'hello' },
        { name: 'wat' },
        {
            name: 'child folder',
            children: [
                {
                    name: 'child folder',
                    children: [
                        { name: 'hello' },
                        { name: 'wat' }
                    ]
                },
                { name: 'hello' },
                { name: 'wat' },
                {
                    name: 'child folder',
                    children: [
                        { name: 'hello' },
                        { name: 'wat' }
                    ]
                }
            ]
        }
    ]
}
export default {
    components: {
        item
    },
    data() {
        return {
            treeData
        }
    }
}
</script>

<style>

</style>
