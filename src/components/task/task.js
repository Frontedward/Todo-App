/* eslint-disable */
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

const Task = ({ 
  completed = false,
  editing = false,
  id = 100,
  description = '',
  createTime = new Date(),
  onComplete,
  onEditStart,
  onDeleted,
  onEditEnd
}) => {
  const [taskLabel, setTaskLabel] = useState(description);

  const onTaskEdit = (e) => {
    const trimmedValue = e.target.value.trimStart();
    if (trimmedValue !== '') {
      setTaskLabel(trimmedValue);
    } else {
      alert('Ошибка! Строка не может быть пустой.');
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onEditEnd(taskLabel, id);
  };

  const getEditField = () => {
    if (editing) {
      return (
        <form onSubmit={onSubmitHandler}>
          <input type="text" className="edit" value={taskLabel} onChange={onTaskEdit} />
        </form>
      );
    }
    return null;
  };

  const classNames = [completed ? 'completed' : '', editing ? 'editing' : ''].join(' ');

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" id={`${id}__check`} onChange={onComplete} checked={completed} />
        <label htmlFor={`${id}__check`}>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(createTime)}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditStart} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>

      {getEditField()}
    </li>
  );
};

Task.propTypes = {
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  id: PropTypes.string,
  description: PropTypes.string,
  createTime: PropTypes.instanceOf(Date),
  onComplete: PropTypes.func,
  onEditStart: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditEnd: PropTypes.func,
};

export default Task;
