import './task-filter.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: '',
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  }

  btnFilters = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const btnFilters = this.btnFilters.map(({ name, label }) => {
      const isActive = filter === name
      const btnClass = isActive ? 'selected' : ''
      return (
        <label key={name} className={btnClass}>
          {' '}
          {label}
          <input type={'radio'} onClick={() => onFilterChange(name)} name="filter" checked={isActive} readOnly />
        </label>
      )
    })

    return <div className="filters">{btnFilters}</div>
  }
}
