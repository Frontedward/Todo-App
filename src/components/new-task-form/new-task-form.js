import PropTypes from 'prop-types'
import React, { useState } from 'react'
import './new-task-form.css'

export default function NewTaskForm({ addItem }) {
  const [formState, setFormState] = useState({
    label: '',
    min: '',
    sec: '',
  })

  const onLabelChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addItem(formState)
    setFormState({
      label: '',
      min: '',
      sec: '',
    })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          name="label"
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={formState.label}
          required
        />
        <input
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          type="number"
          onChange={onLabelChange}
          value={formState.min}
          min={0}
          max={null}
        />
        <input
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          type="number"
          onChange={onLabelChange}
          value={formState.sec}
          min={0}
          max={null}
        />
        <button type="submit"></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
