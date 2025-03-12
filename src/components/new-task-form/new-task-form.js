import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = ({ onTaskCreate }) => {
  const [label, setLabel] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedLabel = label.trim();
    if (trimmedLabel) {
      onTaskCreate(trimmedLabel);
    }
    setLabel('');
  };

  const changeHandler = (e) => {
    setLabel(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={changeHandler}
        value={label}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onTaskCreate: PropTypes.func.isRequired,
};

export default NewTaskForm;
