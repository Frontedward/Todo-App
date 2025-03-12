import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';

import TaskFilter from '../tasks-filter';

const Footer = ({ 
  todoCount = 0, 
  onFilter = () => {}, 
  onClearActive = () => {},
  filters 
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>

      <TaskFilter onFilter={onFilter} filters={filters} />

      <button className="clear-completed" onClick={onClearActive}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  onFilter: PropTypes.func,
  onClearActive: PropTypes.func,
  filters: PropTypes.array.isRequired,
};

export default Footer;
