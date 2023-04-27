import './task-list.css'
import PropTypes from 'prop-types'

import Task from '../task/task'

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdit, onToggleCount, onEditChange }) => {
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

TaskList.defaultProps = {
  todos: [],
}

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onEditChange: PropTypes.func,
}

export default TaskList
