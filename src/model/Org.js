/*
 * @Author: BaiChong 
 * @Date: 2018-01-27 17:50:39 
 * @Last Modified by:   BaiChong 
 * @Last Modified time: 2018-01-27 17:50:39 
 */
import ValidatableObject from "./base/ValidatableObject";
import { accessor } from "./base/Decorators";

class Org extends ValidatableObject {

    @accessor()
    _name = ''

    @accessor()
    _type = ''

}

export default Org