import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './task-list.css';

const TaskList = ({ 
  tasks = [], 
  onComplete = () => {}, 
  onDeleted = () => {}, 
  onEditStart = () => {}, 
  onEditEnd = () => {} 
}) => {
  const taskElems = tasks.map((task) => (
    <Task
      {...task}
      key={task.id}
      onComplete={() => onComplete(task.id)}
      onDeleted={() => onDeleted(task.id)}
      onEditStart={() => onEditStart(task.id)}
      onEditEnd={(...args) => onEditEnd(...args)}
    />
  ));

  return <ul className="todo-list">{taskElems}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onComplete: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditStart: PropTypes.func,
  onEditEnd: PropTypes.func,
};

export default TaskList;
