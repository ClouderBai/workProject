import ValidatableObject from "./base/ValidatableObject";

import { accessor, required, regex, type } from "./base/Decorators";
import rules from '@/utils/regex'
// import rules from '@/utils/regex' 
// import Org from "./Org";


class Access extends ValidatableObject { 
    @regex(rules.chiness, "只能为中文")
    @required(false, '名字不能为空')
    _name = '' // 名字
    
    @regex(rules.code, "只能为大写英文")
    @required(false, '编码不能为空')
    _code = '' // 编码
}

export default Access