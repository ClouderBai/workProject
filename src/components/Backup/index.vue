/*
 * @Author: zhanglianhao 
 * @Date: 2018-03-07 09:27:03 
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-15 18:12:13
 */

 /*
    事件
    @event uploadFile 上传文件的自定义事件
    @param file 文件
           dom 清空文件的dom节点

*/

/*
    方法
    @method importData 导入数据
    
    @method exportData 导出数据
     @parm backupData 需要导出的数据

 */
<template>
    <div class="backup-contianer">
        <el-row>
            <el-col :span="24">
                <input 
                    type="file" 
                    id="imFile"
                    style="display: none"
                    @change="uploadFile($event)"
                    accept="*/"/>
                <a id="downlink"></a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import xlsx from 'xlsx'
export default {
    name: 'backup',
    mounted() {
        this.imFile = document.getElementById('imFile')
        this.outFile = document.getElementById('downlink')
    },
    methods: {
        // 导入
        importData() {
            this.imFile.click()
        },
        uploadFile(e) {
            this.$emit('uploadFile', e.target.files[0], this.imFile)
        },
        // 导出
        exportData(backupData, fileTitle = '编码备份') {
            let data = [{}]
            for (const k in backupData[0]) {
                data[0][k] = k
            }
            data = data.concat(backupData)
            this.downloadExl(data, fileTitle)
        },
        downloadExl(json, downName, type) {
            const keyMap = [] // 获取键
            for (const k in json[0]) {
                keyMap.push(k)
            }
            const tmpdata = [] // 用来保存转换好的json
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
                tmpdata[v.position] = {
                    v: v.v
                }
            })
            const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
            const tmpWB = {
                SheetNames: ['mySheet'], // 保存的表标题
                Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata, // 内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                        })
                }
            }
            const tmpDown = new Blob([this.s2ab(xlsx.write(tmpWB,
                { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
            ))], {
                type: ''
            }) // 创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown) // 创建对象超链接
            this.outFile.download = downName + '.xlsx' // 下载名称
            this.outFile.href = href // 绑定a标签
            this.outFile.click() // 模拟点击实现下载
            setTimeout(function() { // 延时释放
                URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
            }, 100)
        },
        // 导入excel
        importFile() {
            const obj = this.imFile
            if (!obj.files) {
                return
            }
            var f = obj.files[0]
            var reader = new FileReader()
            const $t = this
            reader.onload = function(e) {
                var data = e.target.result
                if ($t.rABS) {
                    $t.wb = xlsx.read(btoa(this.fixdata(data)), { // 手动转化
                        type: 'base64'
                    })
                } else {
                    $t.wb = xlsx.read(data, {
                        type: 'binary'
                    })
                }
                const json = xlsx.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
                $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
            }
            if (this.rABS) {
                reader.readAsArrayBuffer(f)
            } else {
                reader.readAsBinaryString(f)
            }
        },
        // 字符串转字符流
        s2ab(s) {
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for (var i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF
            }
            return buf
        },
        // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]
        getCharCol(n) {
            let s = ''
            let m = 0
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        },
        // 此处可以解析导入数据
        analyzeData(data) {
            return data
        },
        // 处理导入的数据
        dealFile(data) {
            this.imFile.value = ''
            if (data.length <= 0) {
                this.errorDialog = true
                this.errorMsg = '请导入正确信息'
            } else {
                this.$emit('importData', data) // 发出导入的数据
            }
        },
        // 文件流转BinaryString
        fixdata(data) {
            var o = ''
            var l = 0
            var w = 10240
            for (; l < data.byteLength / w; ++l) {
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
            }
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
            return o
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
