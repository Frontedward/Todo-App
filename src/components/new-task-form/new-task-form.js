import './new-task-form.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func,
  }
  state = {
    label: '',
    min: '',
    sec: '',
  }
  onLabelChange = (e) => {
    this.setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            name="label"
            className="new-todo"
            type="text"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
            required
          />
          <input
            name="min"
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            type="number"
            onChange={this.onLabelChange}
            value={this.state.min}
            min={0}
            max={null}
          />
          <input
            name="sec"
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            type="number"
            onChange={this.onLabelChange}
            value={this.state.sec}
            min={0}
            max={null}
          />
          <button type="submit"></button>
        </form>
      </header>
    )
  }
}
