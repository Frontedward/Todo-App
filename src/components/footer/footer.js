import './footer.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/task-filter'

export default class Footer extends Component {
  static defaultProps = {
    filter: 'all',
    tasksLeft: 0,
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    deleteCompleted: PropTypes.func,
    tasksLeft: PropTypes.number,
  }

  render() {
    const { filter, onFilterChange, deleteCompleted, tasksLeft } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{tasksLeft} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={deleteCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
