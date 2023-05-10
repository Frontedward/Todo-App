import './app.css'
import { Component } from 'react'
import { nanoid } from 'nanoid'

import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'

export default class App extends Component {
  state = {
    taskData: [],
    filter: 'all',
  }
  createTask(label, min, sec) {
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

  addItem = ({ label, min, sec }) => {
    label = label.trim()
    if (label.length < 1) {
      return
    }
    const newItem = this.createTask(label, min, sec)

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem]

      return {
        taskData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)

      const newArray = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]

      return {
        taskData: newArray,
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({ taskData }) => {
      const completedData = taskData.filter((el) => !el.done)

      return {
        taskData: completedData,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const newItem = { ...arr[idx], [propName]: !arr[idx][propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleEdit = (id) => {
    this.setState(({ taskData }) => {
      return {
        taskData: this.toggleProperty(taskData, id, 'edit'),
      }
    })
  }
  onToggleDone = (id) => {
    this.setState(({ taskData }) => {
      return {
        taskData: this.toggleProperty(taskData, id, 'done'),
      }
    })
  }

  onToggleCount = (id) => {
    this.setState(({ taskData }) => {
      return {
        taskData: this.toggleProperty(taskData, id, 'isCounting'),
      }
    })
  }

  filter(items, filter) {
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

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onEditChange = (id, newLabel) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const newItem = { ...taskData[idx], label: newLabel ? newLabel : taskData[idx].label }

      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
      return {
        taskData: newArr,
      }
    })
  }

  render() {
    const { taskData, filter } = this.state
    const doneCount = taskData.filter((el) => !el.done).length
    const visibleItems = this.filter(taskData, filter)

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleEdit={this.onToggleEdit}
            onToggleDone={this.onToggleDone}
            onEditChange={this.onEditChange}
            onToggleCount={this.onToggleCount}
          />
        </section>
        <Footer
          tasksLeft={doneCount}
          deleteCompleted={this.deleteCompleted}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    )
  }
}
