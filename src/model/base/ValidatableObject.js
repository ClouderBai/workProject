import EditableObject from './EditableObject'
import { ignore } from './Decorators'

class ValidatableObject extends EditableObject {

  @ignore()
  _$enable = true

  onValidated(args) {
  }

  async validate(property, args) {
    const errors = []
    const decos = this.decoratorsOf(property, 'validator')
    for (var deco of decos) {
      const v = deco.meta
      if (!await v.validate(this[property], args)) {
        errors.push(v.errorMessage)
      }
    }
    return errors
  }

  validatorOf(property, args) {
    const self = this;
    return async function (rule, value, callback) {
      const errors = await self.validate(property, args)
      if (errors.length > 0) {
        callback(new Error(errors[0]))
      } else {
        callback()
      }
    }
  }
}

export default ValidatableObject
