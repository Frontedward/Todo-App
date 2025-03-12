import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TaskFilter = ({ onFilter, filters }) => {
  const filtersElems = filters.map((filter) => (
    <li key={filter.param}>
      <input type="radio"
             name="filter"
             id={filter.param}
             checked={filter.active}
             onChange={() => onFilter(filter.param)} />

      <label htmlFor={filter.param}>{filter.label}</label>
    </li>
  ));

  return <ul className="filters">{filtersElems}</ul>;
};

TaskFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
};

export default TaskFilter;
