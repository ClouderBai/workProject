import ObjectBase from './ObjectBase'
import { ignore } from './Decorators'

class BindableObject extends ObjectBase {
  @ignore()
  _$propertyChangedHandlers = []

  invokePropertyChanged(p, v) {
      this._$propertyChangedHandlers.forEach(c => c(p, v))
  }

  addPropertyChangedHandler(handler) {
      if (typeof (handler) === 'function') {
          this._$propertyChangedHandlers.push(handler)
      }
  }

  removePropertyChangedHandler(handler) {
      if (typeof (handler) === 'function') {
          const index = this._$propertyChangedHandlers.indexOf(handler)
          if (index > -1) this._$propertyChangedHandlers.splice(index, 1)
      }
  }

  removePropertyChangedHandlers() {
      this._$propertyChangedHandlers = []
  }
}

export default BindableObject
