# 🍬 sugar-form

`sugar-form` provides a [vue-modifier-like](https://vuejs.org/v2/guide/events.html#Event-Modifiers) way to simplify common React DOM event handling:

```jsx
import on from 'sugar-form'

<input {...on.keydown.enter.prevent.value(value => dispatch('SUBMIT', value))}/>
```

## Usage

```jsx
import on from 'sugar-form'

// Start with `on`. Then chain up sugars in any order.
<input {...on.sugar.sugar.sugar(listener)}/>

// Sugars can take args.
<input {...on(arg).sugar.sugar(arg)(listener)}/>
```

## Sugars

### Event binding

* `on('KeyPress')`

  Binds `keypress` event.
  
  *Note: Event name must be CamelCase.*

* `on('KeyPress KeyDown')`

  Binds both `keypress` and `keydown` events.

* `.click`

  Shortcut for `on('Click')`.

  Supported shortcuts: 

  - `.click`
  - `.keyup`
  - `.keydown`
  - `.keypress`
  - `.change`
  - `.input`
  - `.submit`
  - `.focus`
  - `.blur`

* Chaining

  `on('Pause').keypress.keydown` will bind them all.

* Capture

  Add `.capture` to bind **ALL** chained events in capture phase.

### Event handling

* `.stop`

  Call `event.stopPropagation()` before running your listener.

* `.prevent`

  Call `event.preventDefault()` before running your listener.

### Keyboard filtering

*Note: These sugars are available for keyboard events.*

* `.key('Enter')`, `.key('Enter Tab')`

  Filter out events whose `.key` is not included.

* `.code(13)`, `.code(13, 27)`

  Filter out events whose `.code` is not included.

* Shortcuts

  - `.enter`
  - `.tab`
  - `.delete`
  - `.backspace`
  - `.esc`
  - `.space`
  - `.up`
  - `.down`
  - `.left`
  - `.right`

* Chaining

  `.key('F12').delete.backspace.code(13)`

### Modifier keys filtering

*Note: These sugars are only available for mouse and keyboard events.*

* `.ctrl`, `.alt`, `.shift`, `.meta`

  Filter out events whose `.ctrlKey` (or `.altKey`, `.shiftKey`, `.metaKey`) is `false`.

* Chaining

  `.click.ctrl.shift` ensures **ALL** these modifier keys are pressed.

### Transforming

* `.value`

  Call your listener with `event.target.value` instead of `event`.

* `.number`

  Call your listener with `+event.target.value` instead of `event`.
