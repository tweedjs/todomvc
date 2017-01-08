import { mutating, Node } from 'tweed'

export default class TodoList {
  @mutating _editingTodo
  @mutating _inputText = ''
  @mutating _editText = ''

  constructor (todos, filter) {
    this._todos = todos
    this._filter = filter

    this._setInputText = this._setInputText.bind(this)
    this._onInputKeyPress = this._onInputKeyPress.bind(this)
    this._onCheckAll = this._onCheckAll.bind(this)
    this._setEditText = this._setEditText.bind(this)
    this._completeEdit = this._completeEdit.bind(this)
    this._cancelEdit = this._cancelEdit.bind(this)
    this._onEditKeyPress = this._onEditKeyPress.bind(this)
    this._renderListItem = this._renderListItem.bind(this)
  }

  _setInputText (e) {
    this._inputText = e.target.value
  }

  _onInputKeyPress (e) {
    if (e.key !== 'Enter' || this._inputText === '') {
      return
    }

    this._todos.add({
      text: this._inputText,
      completed: false
    })

    this._inputText = ''
  }

  _onCheckAll (e) {
    const completed = e.target.checked

    this._todos.completeAll(completed)
  }

  _complete (todo, completed) {
    this._todos.complete(todo, completed)
  }

  _delete (todo) {
    this._todos.delete(todo)
  }

  _edit (todo, e) {
    this._editText = todo.text
    this._editingTodo = todo
  }

  _setEditText (e) {
    this._editText = e.target.value
  }

  _completeEdit () {
    this._todos.setText(this._editingTodo, this._editText)
    this._editingTodo = null
  }

  _cancelEdit () {
    this._editingTodo = null
  }

  _onEditKeyPress (e) {
    switch (e.key) {
      case 'Enter':
        this._completeEdit()

      case 'Escape':
        this._cancelEdit()
    }
  }

  renderInput () {
    return (
      <input
        className='new-todo'
        autofocus
        autocomplete='off'
        placeholder='What needs to be done?'
        value={this._inputText}
        on-input={this._setInputText}
        on-keypress={this._onInputKeyPress}
      />
    )
  }

  render () {
    return (
      <section className='main'>
        {this._renderToggleAllCheckbox()}
        {this._renderList()}
      </section>
    )
  }

  _renderToggleAllCheckbox () {
    if (this._todos.isEmpty) {
      return ''
    }

    return (
      <input
        className='toggle-all'
        type='checkbox'
        on-change={this._onCheckAll}
        checked={!this._todos.hasRemaining}
      />
    )
  }

  _chooseList () {
    if (this._filter.name === 'completed') {
      return this._todos.completed
    }

    if (this._filter.name === 'active') {
      return this._todos.remaining
    }

    return this._todos.items
  }

  _renderList () {
    const list = this._chooseList()

    return (
      <ul className='todo-list'>
        {list.map(this._renderListItem)}
      </ul>
    )
  }

  _renderListItem (todo) {
    return (
      <li
        className='todo'
        class-completed={todo.completed}
        class-editing={todo === this._editingTodo}
      >
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            on-change={this._complete.bind(this, todo, !todo.completed)}
            checked={todo.completed}
          />

          <label
            on-dblclick={this._edit.bind(this, todo)}
          >{todo.text}</label>

          <button
            className='destroy'
            on-click={this._delete.bind(this, todo)}
          />
        </div>

        {todo === this._editingTodo ? (
          <input
            className='edit'
            type='text'
            value={this._editText}
            on-input={this._setEditText}
            on-blur={this._completeEdit}
            on-keydown={this._onEditKeyPress}
          />
        ) : ''}
      </li>
    )
  }
}
