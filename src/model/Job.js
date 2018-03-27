/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 17:50:28 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-01-31 16:09:01
 * 
 */
import ValidatableObject from "./base/ValidatableObject";
import { accessor, required, regex } from "./base/Decorators";
import rules from '@/utils/regex'

class Job extends ValidatableObject {

    @regex(rules.word, '请输入字母')
    @required(false, '编码不能为空')
    _code = ''

    @required(false, '名称不能为空')
    _fullName = ''

    @regex(rules.word, '请输入字母')
    @required(false, '简拼不能为空')
    _jianpin = ''

    @required(false, '简称不能为空')
    _name = ''

    @regex(rules.word, '请输入字母')
    @required(false, '全拼名称不能为空')
    _pinyin = ''

    // @accessor()
    // _currentId

    @required(false, '类型不能为空')
    _positionId = ''

    @accessor()
    _parentId
}

export default Job