import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

const TaskList = ({ todos = [], onDeleted, onToggleDone, onToggleEdit, onToggleCount, onEditChange }) => {
  const elements = todos.map((item) => {
    const { id, label, time, edit, done, date, isCounting } = item

    return (
      <Task
        label={label}
        time={time}
        key={id}
        edit={edit}
        done={done}
        date={date}
        isCounting={isCounting}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onToggleCount={() => onToggleCount(id)}
        onEditChange={(label) => onEditChange(id, label)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      edit: PropTypes.bool.isRequired,
      done: PropTypes.bool.isRequired,
      date: PropTypes.number.isRequired,
      isCounting: PropTypes.bool.isRequired,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleCount: PropTypes.func.isRequired,
  onEditChange: PropTypes.func.isRequired,
}

export default TaskList
