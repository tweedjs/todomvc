import { Node } from 'tweed'

export default class Header {
  constructor (todoList) {
    this._todoList = todoList
  }

  render () {
    return (
      <header className='header'>
        <h1>todos</h1>
        {this._todoList.renderInput()}
      </header>
    )
  }
}
