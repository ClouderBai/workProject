<template>
  <div>
    <div>这是接受了父组件传递的子组件的childArray:{{childArray}}</div>
    <button type="button" @click="changeArray">点击我改变父元素的parentArray</button>
  </div>
</template>

<script>
export default {
    name: 'componentsTest',
    // props: ['childArray'],
    props: {
        childArray: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            counter: 1
        }
    },
    methods: {
    // changeArray() {
    //   this.childArray.push(this.counter++)
    // }
        changeArray() {
            this.counter++
            this.$emit('update:childArray', this.counter)
            this.$emit('myClick', this.counter, '第二个参数')
        }
    },
    mounted() {
        // alert(JSON.stringify(this.$parent.list))
    }
}
</script>

<style>

</style>
