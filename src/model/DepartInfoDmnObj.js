/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 17:44:52 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-02-01 14:45:54
 */
import ValidatableObject from "./base/ValidatableObject";
import { required, accessor, regex, type } from "./base/Decorators";
import rules from '@/utils/regex'

class DepartInfoDmnObj extends ValidatableObject {

    @required(false, '全称不能为空')
    _fullName = ''  // 部门全称

    @required(false, '简称不能为空')
    _name = ''  // 部门简称

    @regex(rules.word, '请输入字母')
    @required(false, '编码不能为空')
    _code = ''   // 部门编码

    @required(false, '属性不能为空')
    _stakeholderType = ''   // 部门属性

    @required(false, '级别类型不能为空')
    _levelType = ''   // 级别类型

    @required(false, '业务类型不能为空')
    _bizType = ''   // 业务类型

    @regex(rules.word, '请输入字母')
    @required(false, '全拼不能为空')
    _pinyin = ''    // 全拼

    @regex(rules.word, '请输入字母')
    @required(false, '简拼不能为空')
    _jianpin = ''   // 简拼

    @accessor()
    _flag = ''    // 1 根部门 0 子部门

    @accessor()
    _currentId = ''   // 当前层级节点

    @accessor()
    positionId

    @accessor()
    parentId
}

export default DepartInfoDmnObj