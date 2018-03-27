/*
 * @Author: BAICHONG 
 * @Date: 2018-03-15 09:07:11 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-16 11:20:35
 */
<script>
/**
|--------------------------------------------------
| 接受文件流下载文件到本地
| import DownLoad from '本文件'
|
| <DownLoad :propMethod='在data上绑定接口,不要加()'  />
|
|--------------------------------------------------
*/
import FileSaver from 'file-saver'
const getFile = (method) => {
    return new Promise((resolve, reject) => {
        method()
            .then(data => { resolve(data.data) })
            .catch(error => { reject(error.toString()) })
    })
}
export default {
    props: {
        // 按钮 type
        type: {
            type: String,
            default: 'primary'
        },
        // 按钮 size
        size: {
            type: String,
            default: 'mini'
        },
        // 导出的请求方法
        propMethod: {
            type: Function,
            required: true
        },
        // 文件名
        fileName: {
            type: String,
            default: '标准菜单列表打包.json'
        },
        // 自定义 class
        btnClass: {
            type: String,
            default: ''
        },
        // 图标
        iconType: {
            type: String,
            default: ''
        }
    },
    render(h) {
        // rel='external nofollow' href='javascript:;'
        return (<el-button icon={this.iconType} class={this.btnClass} type={this.type} size={this.size} on-click={ () => this.handleBatchDownload() } >导出</el-button >)
    },
    methods: {
        handleBatchDownload() {
            // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
            // const data = 'http://bim001.320.io/bimsapi/rest/standardMenu/jsonExportStandardMenuTree'
            console.log('%c%s', 'color:red;font-size:20px', 'this.propMethod  : ', this.propMethod)
            const data = this.propMethod
            getFile(data)
                .then(res => {
                    // console.log(res)
                    // const blob = new Blob([res], { type: 'json/plain;charset=utf-8' })
                    // FileSaver.saveAs(blob, '标准菜单列表打包')
                    const file = new File([res], this.fileName, { type: 'text/plain;charset=utf-8' })
                    FileSaver.saveAs(file)
                })
            // const zip = new JSZip()
            // const cache = {}
            // const promises = []
            // data.forEach(item => {
            //     const promise = getFile(item)
            //         .then(data => { // 下载文件, 并存成ArrayBuffer对象
            //             // const arr_name = item.split('/')
            //             // const file_name = arr_name[arr_name.length - 1] // 获取文件名
            //             // zip.file(file_name, data, { binary: true }) // 逐个添加文件
            //             zip.file('标准菜单列表', data, { binary: true }) // 逐个添加文件
            //             cache['标准菜单列表'] = data
            //             // cache[file_name] = data
            //         })
            //     promises.push(promise)
            // })
            // Promise.all(promises)
            //     .then(() => {
            //         zip.generateAsync({ type: 'blob' })
            //             .then(content => { // 生成二进制流
            //                 FileSaver.saveAs(content, '打包.zip') // 利用file-saver保存文件
            //             })
            //     })
        }
    }
}

</script>

<style>

</style>
