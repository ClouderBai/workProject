/*
 * @Author: LiuJunTing
 * @Date: 2018-01-29 14:39:02
 * @Last Modified by: zhanglianhao
 * @Last Modified time: 2018-03-08 14:03:51
 */

import ValidatableObject from './base/ValidatableObject'
import { required, regex, accessor } from './base/Decorators'
import rules from '@/utils/regex'

class UserExt extends ValidatableObject {
  @required(false, '属性名称不能为空')
  @accessor()
  _colName = ''

  @required(false, '请选择属性类型')
  _colType = ''

  @regex(rules.signlessInteger, '属性序号必须是正整数')
  @required(false, '属性序号不能为空')
  _order = 0

  @accessor()
  _valid = true
}

export default UserExt
