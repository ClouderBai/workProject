import BindableObject from './BindableObject'
import { ignore } from './Decorators'

class EditableObject extends BindableObject {

  @ignore()
  _$backCopy = null

  @ignore()
  _$isEditing = false

  beginEdit() {
    if (this._$isEditing) return false
    this._$isEditing = true
    this._$backCopy = this.toJSON()
    return true
  }

  endEdit() {
    if (!this._$isEditing) return false
    this._$isEditing = false
    this._$backCopy = null
    return true
  }

  cancelEdit() {
    if (!this._$isEditing) return false
    Object.assign(this, this._$backCopy)
    this._$isEditing = false
    this._$backCopy = null
  }
}

export default EditableObject
