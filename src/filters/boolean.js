/*
 * @Author: LiuJunTing
 * @Date: 2018-03-09 13:55:00
 * @Last Modified by: LiuJunTing
 * @Last Modified time: 2018-03-09 13:55:25
 */

import Vue from 'vue'

// 过滤状态(是否可用)
Vue.filter('enable', function(value) {
    return value ? `正常` : `已禁用`
})
