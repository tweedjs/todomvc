import { Node } from 'tweed'

export default class Footer {
  constructor (todos, filter) {
    this._filter = filter
    this._todos = todos
  }

  render () {
    if (this._todos.isEmpty) {
      return ''
    }

    const remaining = this._todos.remaining.length

    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{remaining}</strong> item{remaining === 1 ? '' : 's'} left
        </span>
        <ul className='filters'>
          <li><a href='#/all' class-selected={this._filter.name === 'all'}>All</a></li>
          <li><a href='#/active' class-selected={this._filter.name === 'active'}>Active</a></li>
          <li><a href='#/completed' class-selected={this._filter.name === 'completed'}>Completed</a></li>
        </ul>
        {this._todos.hasCompleted ? (
          <button className='clear-completed' on-click={this._todos.clearCompleted}>
            Clear completed
          </button>
        ) : ''}
      </footer>
    )
  }
}
