import { mutating, Node } from 'tweed'

import Filter from './Filter'
import TodoList from './TodoList'
import Todos from './Todos'
import Header from './Header'
import Footer from './Footer'

export default class App {
  constructor () {
    const filter = new Filter()
    const todos = new Todos()

    this._todoList = new TodoList(todos, filter)
    this._header = new Header(this._todoList)
    this._footer = new Footer(todos, filter)
  }

  render () {
    return (
      <div>
        <section className='todoapp'>
          {this._header}
          {this._todoList}
          {this._footer}
        </section>

        <footer className='info'>
          <p>Double-click to edit a todo</p>
          <p>Written by <a href='https://twitter.com/emilpersson'>Emil Persson</a></p>
          <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>
        </footer>
      </div>
    )
  }
}
