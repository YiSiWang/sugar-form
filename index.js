const initData = () => ({
  events: [],
  keys: [],
  codes: [],
})

const generateListeners = (data, listener) => {
  function sugar(event) {
    // Modifier keys
    if (data.ctrl && event.ctrlKey === false) return
    if (data.alt && event.altKey === false) return
    if (data.shift && event.shiftKey === false) return
    if (data.meta && event.metaKey === false) return
    // Keys and codes
    if (event.key !== undefined && data.keys.length) {
      if (data.keys.indexOf(event.key) === -1) return
    }
    if (event.code !== undefined && data.codes.length) {
      if (data.keys.indexOf(event.key) === -1) return
    }
    // Stop and prevent
    if (data.prevent) event.preventDefault()
    if (data.stop) event.stopPropagation()
    // Trasform
    let arg = event
    if (data.value) arg = event.target.value
    if (data.number) arg = +event.target.value
    return listener.call(this, arg)
  }
  const listeners = {}
  data.events.forEach(name => listeners[`on${name}${data.capture ? 'Capture' : ''}`] = sugar)
  return listeners
}

const extend = func => {
  function addEvent(event) {
    return {
      get() {
        if (!this._data) return on(event)
        this._data.events.push(event)
        return this
      },
    }
  }
  function setFlag(flag) {
    return {
      get() {
        this._data[flag] = true
        return this
      },
    }
  }
  function addKey(...key) {
    return {
      get() {
        this._data.keys.push(...key)
        return this
      },
    }
  }
  function addCode(code) {
    return {
      get() {
        this._data.codes.push(code)
        return this
      },
    }
  }
  Object.defineProperties(func, {
    // Events
    click: addEvent('Click'),
    keyup: addEvent('KeyUp'),
    keydown: addEvent('KeyDown'),
    keypress: addEvent('KeyPress'),
    change: addEvent('Change'),
    input: addEvent('Input'),
    submit: addEvent('Submit'),
    focus: addEvent('Focus'),
    blur: addEvent('Blur'),
    // Event flags
    capture: setFlag('capture'),
    prevent: setFlag('prevent'),
    stop: setFlag('stop'),
    // Modifier key flags
    ctrl: setFlag('ctrl'),
    alt: setFlag('alt'),
    shift: setFlag('shift'),
    meta: setFlag('meta'),
    // Keys and codes
    key: {
      get() {
        const that = this
        return keyNamesWithSpace => {
          that._data.keys.push(...keyNamesWithSpace.split(' '))
          return that
        }
      },
    },
    code: {
      get() {
        const that = this
        return (...codes) => {
          that._data.codes.push(...codes)
          return that
        }
      },
    },
    enter: addKey('Enter'),
    tab: addKey('Tab'),
    delete: addKey('Delete'),
    backspace: addKey('Backspace'),
    esc: addKey('Escape'),
    space: addKey(' '),
    up: addKey('ArrowUp', 'Up'),
    down: addKey('ArrowDown', 'Down'),
    left: addKey('ArrowLeft', 'Left'),
    right: addKey('ArrowRight', 'Right'),
  })
  return func
}

const on = eventNamesWithSpace => {
  const data = initData()
  data.events.push(...eventNamesWithSpace.split(' '))
  const func = generateListeners.bind(null, data)
  func._data = data
  return extend(func)
}
extend(on)

export default on
