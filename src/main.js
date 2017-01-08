import { Engine } from 'tweed'
import DOMRenderer from 'tweed/render/dom'

import App from './App'

const engine = new Engine(
  new DOMRenderer(document.querySelector('#app'))
)

engine.render(new App())
