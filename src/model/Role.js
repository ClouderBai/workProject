/*
 * @Author: LiuJunTing
 * @Date: 2018-01-30 09:17:11
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-22 11:24:31
 */

import ValidatableObject from './base/ValidatableObject'
import {
    validatorImpl
} from './base/DecoratorUtil'
import {
    Validator
} from './base/Validators'
import {
    required,
    regex,
    accessor
} from './base/Decorators'
import rules from '@/utils/regex'
import {
    checkRoleCode
} from '@/api/roleAccess'

class RoleCodeValidator extends Validator {
    constructor(errorMessage) {
        super(errorMessage)
    }

    async validate(value, args) {
        // if (value === args) return true
        if (!value) return true
        try {
            return !await checkRoleCode(value, args)
        } catch (error) {
            console.error('校验rodeCode异常')
        }
        return false
    }
}

function RoleCode(errorMessage) {
    return validatorImpl(new RoleCodeValidator(errorMessage))
}

class Role extends ValidatableObject {
    @required(false, '角色名称不能为空')
    _name = '' // 角色名称

    @RoleCode('角色编码已存在')
    @regex(rules.notChiness, '角色编码不能为中文')
    _code = '' // 角色编码

    @accessor()
    _desc // 描述

    @regex(rules.signlessInteger, '排序号必须是正整数')
    @required(false, '排序号不能为空')
    _order // 排序

    @accessor()
    _valid = true // 是否可用

    @accessor()
    _orgId = ''

    @accessor()
    _orgFullName = '' // 角色路径

    @accessor()
    _userId = 0 // number用户角色 目前用于用户维护的修改用户
}

export default Role
