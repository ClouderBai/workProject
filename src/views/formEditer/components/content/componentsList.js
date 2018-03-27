import row from './layout/row'
import col from './layout/col'
import {inputItem} from './basics/input'
import inputNumber from './basics/inputNumber'
import switchItem from './basics/switch'
import radioGroup from './basics/radioGroup'
import checkboxGroup from './basics/checkboxGroup'
import selectItem from './basics/select'

const basicsComp = {
	row,
	col,
	input:inputItem(),
	inputNumber,
	switch:switchItem,
	radioGroup,
	checkboxGroup,
	select:selectItem
};

export default basicsComp