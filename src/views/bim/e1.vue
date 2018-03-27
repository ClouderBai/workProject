

<script>
export default {
    data() {
        return {
            key: 'value'
        }
    },
    render(h, context) {
        let data = h('p', {
            style: {
                color: 'red',
                background: 'skyblue',
                margin: '4px',
                fontSize: '14px'
            },
            class: {
                foo: true,
                bar: false
            },
            attrs: {
                id: '这个地方写元素id属性'
            },
            on: {
                click: function() {
                    alert('你点我干嘛?')
                }
            }
            // domProps: {
            //     innerHTML: 'baz'
            // }
        }, [`这个位置插入p标签的内容`, h('span', [`--=-=-=-=-=-=-=`]), '第二个元素'])
        data = Array.apply(null, { length: 10 }).fill(data)
        return h(
            'div',
            {
                style: {
                    'height': '300px',
                    'width': '600px'
                }
            },
            data
        )
    }
}
</script>

<style>

</style>
