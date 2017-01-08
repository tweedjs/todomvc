import { mutating, Node } from 'tweed'

export default class Filter {
  @mutating name = 'all'

  constructor () {
    window.addEventListener(
      'hashchange',
      this._onHashChange.bind(this)
    )

    this._onHashChange()
  }

  _onHashChange () {
    this.name = window.location.hash.slice(2)
  }
}
