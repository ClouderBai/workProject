/**
 * Created by jacky on 2016/7/18.
 */
import Tool from '../main/Tool'

export default class BaseTool extends Tool {
    getCommonProperties(target) {
    	console.log(target)
        return target
    }
}
