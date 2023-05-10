import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import React, { useState, useEffect } from 'react'

import { getPadTime } from '../../getPadTime'
import './task.css'

export default function Task({
  label = '',
  id = '',
  onDeleted,
  onToggleDone,
  onToggleEdit,
  onToggleCount,
  edit = false,
  done = false,
  date = 0,
  onEditChange,
  isCounting,
  time = 0,
}) {
  const [state, setState] = useState({
    label,
    timer: new Date(),
    time,
  })

  useEffect(() => {
    let timerID
    if (isCounting && state.time !== 0) {
      timerID = setInterval(() => tick(), 1000)
    }
    return () => clearInterval(timerID)
  }, [isCounting, state.time])

  const tick = () =>
    setState((prevState) => {
      const { time } = prevState
      const nextState = {
        ...prevState,
        timer: new Date(),
      }
      if (isCounting && time !== 0) {
        nextState.time = time - 1
      }
      return nextState
    })

  const { label: stateLabel, time: stateTime } = state

  const creationDate = formatDistanceToNow(date, { includeSeconds: true })

  let className = ''
  if (done) {
    className += 'completed'
  }

  if (edit) {
    className += 'editing'
  }

  let minutes = getPadTime(Math.floor(stateTime / 60))
  let seconds = getPadTime(stateTime - minutes * 60)

  return (
    <li key={id} className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} readOnly={true} onClick={onToggleDone} name="label" />
        <label
          onClick={() => {
            onToggleDone()
            if (isCounting) onToggleCount()
          }}
          htmlFor="label"
        >
          <span className="title">{stateLabel}</span>
          <span className="description">
            {isCounting ? (
              <button
                className="icon icon-pause"
                onClick={(e) => {
                  e.stopPropagation()
                  if (done) return
                  onToggleCount()
                }}
              ></button>
            ) : (
              <button
                className="icon icon-play"
                onClick={(e) => {
                  e.stopPropagation()
                  if (done) return
                  onToggleCount()
                }}
              ></button>
            )}
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </span>
          <span className="description">created {creationDate} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {edit && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onEditChange(stateLabel ? stateLabel : label)
            onToggleEdit(id)
          }}
        >
          <input
            type="text"
            className="edit"
            value={stateLabel}
            onChange={(e) => {
              setState((prevState) => ({
                ...prevState,
                label: e.target.value,
              }))
            }}
          />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleCount: PropTypes.func,
  edit: PropTypes.bool,
  done: PropTypes.bool,
  date: PropTypes.number,
  onEditChange: PropTypes.func,
  isCounting: PropTypes.bool,
  time: PropTypes.number,
}
