import PropTypes from 'prop-types'
import './task-filter.css'

const TasksFilter = ({ filter = '', onFilterChange }) => {
  const btnFilters = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  return (
    <div className="filters">
      {btnFilters.map(({ name, label }) => {
        const isActive = filter === name
        const btnClass = isActive ? 'selected' : ''

        return (
          <label key={name} className={btnClass}>
            {label}
            <input type="radio" onClick={() => onFilterChange(name)} name="filter" checked={isActive} readOnly />
          </label>
        )
      })}
    </div>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
}

export default TasksFilter
