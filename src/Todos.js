import { mutating } from 'tweed'

export default class Todos {
  @mutating items = []

  constructor () {
    this.clearCompleted = this.clearCompleted.bind(this)
  }

  get isEmpty () {
    return this.items.length === 0
  }

  get remaining () {
    return this.items.filter((t) => !t.completed)
  }

  get completed () {
    return this.items.filter((t) => t.completed)
  }

  get hasRemaining () {
    return this.remaining.length > 0
  }

  get hasCompleted () {
    return this.completed.length > 0
  }

  clearCompleted () {
    this.items = this.remaining
  }

  completeAll (completed = true) {
    this.items = this.items.map(({ text }) =>
      ({ text, completed })
    )
  }

  complete (todo, completed = true) {
    this.items = this.items
      .map((t) => t === todo
        ? { text: t.text, completed }
        : t
      )
  }

  add (todo) {
    this.items = this.items.concat(todo)
  }

  delete (todo) {
    this.items = this.items.filter((t) => t !== todo)
  }

  setText (todo, text) {
    this.items = this.items
      .map((t) => t === todo
        ? { text, completed: t.completed }
        : t
      )
  }
}
