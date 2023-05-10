import { useState } from 'react'
import { nanoid } from 'nanoid'

import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'
import './app.css'

export default function App() {
  const [taskData, setTaskData] = useState([])
  const [filter, setFilter] = useState('all')

  function createTask(label, min, sec) {
    return {
      label,
      time: Number(+sec + min * 60),
      id: nanoid(),
      done: false,
      edit: false,
      date: Date.now(),
      isCounting: false,
    }
  }

  function addItem({ label, min, sec }) {
    label = label.trim()
    if (label.length < 1) {
      return
    }
    const newItem = createTask(label, min, sec)
    setTaskData((taskData) => [...taskData, newItem])
  }

  function deleteItem(id) {
    setTaskData((taskData) => {
      const idx = taskData.findIndex((el) => el.id === id)
      return [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
    })
  }

  function deleteCompleted() {
    setTaskData((taskData) => taskData.filter((el) => !el.done))
  }

  function toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const newItem = { ...arr[idx], [propName]: !arr[idx][propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  function onToggleEdit(id) {
    setTaskData((taskData) => toggleProperty(taskData, id, 'edit'))
  }

  function onToggleDone(id) {
    setTaskData((taskData) => toggleProperty(taskData, id, 'done'))
  }

  function onToggleCount(id) {
    setTaskData((taskData) => toggleProperty(taskData, id, 'isCounting'))
  }

  const showFiltered = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((el) => !el.done)
      case 'completed':
        return items.filter((el) => el.done)
      default:
        return items
    }
  }

  function onFilterChange(filter) {
    setFilter(filter)
  }

  function onEditChange(id, newLabel) {
    setTaskData((taskData) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const newItem = { ...taskData[idx], label: newLabel ? newLabel : taskData[idx].label }
      return [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
    })
  }

  const doneCount = taskData.filter((el) => !el.done).length
  const visibleItems = showFiltered(taskData, filter)

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleEdit={onToggleEdit}
          onToggleDone={onToggleDone}
          onEditChange={onEditChange}
          onToggleCount={onToggleCount}
        />
      </section>
      <Footer tasksLeft={doneCount} deleteCompleted={deleteCompleted} filter={filter} onFilterChange={onFilterChange} />
    </section>
  )
}
