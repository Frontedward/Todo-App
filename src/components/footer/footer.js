import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/task-filter'
import './footer.css'

export default function Footer({ filter = 'all', onFilterChange, deleteCompleted, tasksLeft = 0 }) {
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

Footer.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  deleteCompleted: PropTypes.func,
  tasksLeft: PropTypes.number,
}
