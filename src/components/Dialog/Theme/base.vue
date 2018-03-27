<template>
    <el-container class="wrapper">
      <!-- <el-header
        height="80px"
        :style="{ 'background-color': primaryColor }">
        <ul class="header-operations">
          <li @click="showThemeDialog">{{ langConfig.header.switch[lang] }}</li>  
        </ul>
      </el-header> -->
      <el-dialog
        center
        :visible.sync="themeDialogVisible"
        :title="langConfig.header.switch[lang]"
        width="400px">
        <el-form
          :model="colors"
          :rules="rules"
          ref="form"
          class="theme-form"
          label-position="top"
          label-width="70px">
          <el-form-item :label="langConfig.form.theme[lang]" prop="primary">
            <el-color-picker v-model="colors.primary" ></el-color-picker>
          </el-form-item>
          <el-form-item class="color-buttons" >
            <el-button type="primary" @click="submitForm">切换</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- <el-dialog :visible.sync="helpDialogVisible" :title="langConfig.help.title[lang]">
        <div v-html="langConfig.help.content[lang]" class="help"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="helpDialogVisible = false">{{ langConfig.help.ok[lang] }}</el-button>
        </span>
      </el-dialog> -->
  </el-container>
</template>
<script>
    import generateColors from '../../../utils/color'
    import objectAssign from 'object-assign'
    import langConfig from '../../../lang'
    // import langConfig from './lang'
    import { use } from 'element-ui/lib/locale'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
    import enLocale from 'element-ui/lib/locale/lang/en'
    // import element1 from '../../../assets/custom-theme/fonts/element-icons.ttf'
    // import element2 from '../../../assets/custom-theme/fonts/element-icons.woff'
    export default {
        name: 'themeBase',
        created() {
            this.getIndexStyle()
            this.getSeparatedStyles()
            this.getFontFiles()
        },

        mounted() {
            this.$nextTick(() => {
                this.originalStylesheetCount = document.styleSheets.length
            })
        },
        data() {
            const colorValidator = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(this.langConfig.validate.required[this.lang]))
                } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
                    return callback(new Error(this.langConfig.validate.format[this.lang]))
                } else {
                    callback()
                }
            }
            return {
                form: {},
                colors: {
                    primary: '#409eff'
                },
                rules: {
                    primary: [
                        { validator: colorValidator, trigger: 'blur' }
                    ]
                },
                originalStylesheetCount: -1,
                originalStyle: '', // 获取index样式
                langConfig,
                // tableData,
                primaryColor: '#409eff',
                themeDialogVisible: false,
                // helpDialogVisible: false,
                zip: null,
                styleFiles: [],
                fontFiles: ['element-icons.ttf', 'element-icons.woff'],
                fonts: [],
                canDownload: false,
                query: {
                    name: '',
                    date: []
                }
    
            }
        },
        computed: {
            lang() {
                const lang = this.$route.path
                use(lang === '/zh-CN' ? zhLocale : enLocale)
                this.query.date = []
                return lang
            }
        },
        methods: {
            open(option) {
                if (this.themeDialogVisible) return
                this.themeDialogVisible = true
            },
            cancel() {
                this.close('cancel')
            },
            close(option = close, data) {
                if (!this.themeDialogVisible) return
                this.themeDialogVisible = false
                this.onClosed({ option, sender: this })
            },
            confirm() {
    
            },
            showThemeDialog() {
                this.themeDialogVisible = true
            },

            writeNewStyle() {
                let cssText = this.originalStyle
                Object.keys(this.colors).forEach(key => {
                    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
                })

                if (this.originalStylesheetCount === document.styleSheets.length) {
                    const style = document.createElement('style')
                    style.innerText = cssText
                    document.head.appendChild(style)
                } else {
                    document.head.lastChild.innerText = cssText
                }
            },

            submitForm() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.themeDialogVisible = false
                        this.primaryColor = this.colors.primary
                        this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary))

                        this.canDownload = true
                        this.writeNewStyle()
                    } else {
                        return false
                    }
                })
            },

            resetForm() {
                this.$refs.form.resetFields()
            },

            getStyleTemplate(data) {
                const colorMap = {
                    '#3a8ee6': 'shade-1',
                    '#409eff': 'primary',
                    '#53a8ff': 'light-1',
                    '#66b1ff': 'light-2',
                    '#79bbff': 'light-3',
                    '#8cc5ff': 'light-4',
                    '#a0cfff': 'light-5',
                    '#b3d8ff': 'light-6',
                    '#c6e2ff': 'light-7',
                    '#d9ecff': 'light-8',
                    '#ecf5ff': 'light-9'
                }
                Object.keys(colorMap).forEach(key => {
                    const value = colorMap[key]
                    data = data.replace(new RegExp(key, 'ig'), value)
                })
                return data
            },

            // ajax
            getFile(url, isBlob = false) {
                return new Promise((resolve, reject) => {
                    const client = new XMLHttpRequest()
                    client.responseType = isBlob ? 'blob' : ''
                    client.onreadystatechange = () => {
                        if (client.readyState !== 4) {
                            return
                        }
                        if (client.status === 200) {
                            const urlArr = client.responseURL.split('/')
                            resolve({
                                data: client.response,
                                url: urlArr[urlArr.length - 1]
                            })
                        } else {
                            reject(new Error(client.statusText))
                        }
                    }
                    client.open('GET', url)
                    client.send()
                })
            },

            getIndexStyle() {
                this.getFile('//unpkg.com/element-ui/lib/theme-chalk/index.css')
                    .then(({ data }) => {
                        this.originalStyle = this.getStyleTemplate(data)
                    })
            },

            getSeparatedStyles() {
                this.getFile('//unpkg.com/element-ui/lib/theme-chalk/')
                    .then(({ data }) => {
                        return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1])
                    })
                    .then(styleFiles => {
                        return Promise.all(styleFiles.map(file => {
                            return this.getFile(`//unpkg.com/element-ui/lib/theme-chalk/${file}`)
                        }))
                    })
                    .then(files => {
                        this.styleFiles = files.map(file => {
                            return {
                                name: file.url,
                                data: this.getStyleTemplate(file.data)
                            }
                        })
                    })
            },

            getFontFiles() {
                Promise.all(this.fontFiles.map(font => {
                    return this.getFile(`//unpkg.com/element-ui/lib/theme-chalk/fonts/${font}`, true)
                }))
                    .then(fonts => {
                        this.fonts = fonts
                    })
            }

        }
    
}
</script>
<style scoped>
.el-color-picker{
  left: 150px;
}
.color-buttons{
  left: 122px;
}


</style>
