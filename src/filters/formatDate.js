/*
 * @Author: LiuJunTing
 * @Date: 2018-03-21 09:54:59
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-21 10:03:52
 */

import Vue from 'vue'
const moment = require('moment')

// 日期和时间的格式化 1992/05/08 12:00:00
Vue.filter('dateTimeFormat', function(value) {
    return moment(value).format(`YYYY/MM/DD HH:mm:ss`)
})

// 日期和时间的格式化(无秒) 1992/05/08 12:00
Vue.filter('dateTimeNoSecondFormat', function(value) {
    return moment(value).format(`YYYY-MM-DD HH:mm`)
})

// 日期和时间的格式化(年月日) 1992/05/08
Vue.filter('dateFormat', function(value) {
    return moment(value).format(`YYYY-MM-DD`)
})
