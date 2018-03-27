/*
 * @Author: BaiChong 
 * @Date: 2018-01-29 11:36:23 
 * @Last Modified by: BaiChong
 * @Last Modified time: 2018-01-29 11:39:28
 */
// 所有岗位
import ObjectBase from "./base/ObjectBase";
import { accessor } from "./base/Decorators";

class Position extends ObjectBase {

    @accessor()
    _id

    @accessor()
    _code

    @accessor()
    _name

    @accessor()
    _category

}

export default Position