import './task.css'
import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { getPadTime } from '../../getPadTime'

export default class Task extends Component {
  static defaultProps = {
    label: '',
    id: '',
    edit: false,
    done: false,
    date: 0,
  }

  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
    edit: PropTypes.bool,
    done: PropTypes.bool,
    date: PropTypes.number,
  }

  state = {
    label: this.props.label,
    timer: new Date(),
    time: this.props.time,
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  tick() {
    this.setState({
      timer: new Date(),
    })
    if (this.props.isCounting && this.state.time !== 0) {
      this.setState({
        time: this.state.time - 1,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps && prevProps.isCounting !== this.props.isCounting) {
      clearInterval(this.timerID)
    }
  }

  render() {
    const {
      label,
      id,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      onToggleCount,
      edit,
      done,
      date,
      onEditChange,
      isCounting,
    } = this.props

    const creationDate = formatDistanceToNow(date, { includeSeconds: true })

    let className = ''
    if (done) {
      className += 'completed'
    }

    if (edit) {
      className += 'editing'
    }

    let minutes = getPadTime(Math.floor(this.state.time / 60))
    let seconds = getPadTime(this.state.time - minutes * 60)

    return (
      <li key={id} className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            readOnly={true}
            onClick={onToggleDone}
            name="label"
          />
          <label
            onClick={() => {
              onToggleDone()
              if (isCounting) onToggleCount()
            }}
            htmlFor="label"
          >
            <span className="title">{label}</span>
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
              onEditChange(this.state.label ? this.state.label : this.props.label)
              onToggleEdit(id)
            }}
          >
            <input
              type="text"
              className="edit"
              value={this.state.label}
              onChange={(e) => {
                this.setState({
                  label: e.target.value,
                })
              }}
            />
          </form>
        )}
      </li>
    )
  }
}
