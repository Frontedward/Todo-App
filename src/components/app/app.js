import React, { useState, useEffect, useCallback } from 'react';
import { parseISO } from 'date-fns';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer';

import './app.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filters, setFilters] = useState([
    { label: 'All', param: 'all', active: true },
    { label: 'Active', param: 'active', active: false },
    { label: 'Completed', param: 'completed', active: false },
  ]);

  const createTask = (label) => ({
    description: label,
    createTime: new Date().toISOString(),
    completed: false,
    editing: false
  });

  const transformTask = useCallback((task) => ({
    ...task,
    createTime: parseISO(task.createTime)
  }), []);

  const toggleProperty = (arr, id, prop) => {
    const elIdx = arr.findIndex((el) => el.id === id);
    const el = arr[elIdx];

    const newEl = {
      ...el,
      [prop]: !el[prop],
    };

    return [...arr.slice(0, elIdx), newEl, ...arr.slice(elIdx + 1, arr.length)];
  };

  const getFilteredTasks = useCallback(() => {
    if (activeFilter === 'all') {
      return tasks;
    }
    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (activeFilter === 'active') {
      return tasks.filter((task) => !task.completed);
    }
  }, [activeFilter, tasks]);

  const completeTaskHandler = useCallback((id) => {
    const task = tasks.find((t) => t.id === id);
    
    if (!task) {
      console.error(`Task with id ${id} not found`);
      return;
    }

    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })
      .then(response => response.json())
      .then(() => {
        setTasks(prevTasks => toggleProperty(prevTasks, id, 'completed'));
      });
  }, [tasks]);

  const deleteTaskHandler = useCallback((id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      });
  }, []);

  const editStartTaskHandler = useCallback((id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({
        ...task,
        editing: task.id === id,
      }))
    );
  }, []);

  const editEndTaskHandler = useCallback((value, id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: value
      })
    })
      .then(response => response.json())
      .then(() => {
        setTasks(prevTasks =>
          prevTasks.map(task => {
            if (task.id !== id) {
              return task;
            }
            return {
              ...task,
              editing: false,
              description: value,
            };
          })
        );
      });
  }, []);

  const onTaskCreate = useCallback((label) => {
    const newTask = createTask(label);
    
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(task => {
        setTasks(prevTasks => [transformTask(task), ...prevTasks]);
      });
  }, [transformTask]);

  const onClearActive = useCallback(() => {
    const completedTasks = tasks.filter(task => task.completed);
    
    Promise.all(
      completedTasks.map(task =>
        fetch(`http://localhost:3001/todos/${task.id}`, {
          method: 'DELETE'
        })
      )
    ).then(() => {
      setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    });
  }, [tasks]);

  const filterHandler = useCallback((param) => {
    setFilters(prevFilters =>
      prevFilters.map(filter => ({
        ...filter,
        active: filter.param === param,
      }))
    );
    setActiveFilter(param);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(response => response.json())
      .then(todos => {
        setTasks(todos.map(transformTask));
      });
  }, [transformTask]);

  const filteredTasks = getFilteredTasks();
  const todoCount = tasks.filter(task => !task.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskCreate={onTaskCreate} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onComplete={completeTaskHandler}
          onDeleted={deleteTaskHandler}
          onEditStart={editStartTaskHandler}
          onEditEnd={editEndTaskHandler}
        />
      </section>
      <Footer
        todoCount={todoCount}
        onFilter={filterHandler}
        filters={filters}
        onClearActive={onClearActive}
      />
    </section>
  );
};

export default App;
