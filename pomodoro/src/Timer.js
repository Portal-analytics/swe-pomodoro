import React, { Component } from "react";
import ReactDom from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Dialog from "material-ui/Dialog";
// import './Timer.css'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1500,
      totalTime: 1500,
      play: true,
      edit: true,
      name: null
    };
  }

  componentDidMount() {
    Notification.requestPermission();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ count: this.state.count - 1 });
    if (this.state.totalTime - 2 * this.state.count == 0) {
      console.log(2 * this.state.count);
      new Notification("Half Way for " + this.state.name + "!");
    }
    if (this.state.count == this.state.totalTime) {
      this.stopTimer();
      this.setState({
        ...this.state,
        count: 0,
        play: true
      });
      new Notification("Time's Up for " + this.state.name + "!");
    }
  }

  format(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }

  handleChangeTime(event) {
    this.setState({
      ...this.state,
      totalTime: event.target.value
    });

    console.log(this.state.totalTime);
  }

  handleChangeTitle(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    });

    console.log(this.state.name);
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 1000);
    this.setState({
      ...this.state,
      play: false
    });
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setState({
      ...this.state,
      play: true
    });
  }

  resetTimer() {
    this.setState({
      ...this.state,
      count: 0,
      totalTime: null,
      name: null
    });
  }

  render() {
    return (
      <div className="timer">
        <table className="pomoTable">
          <tr>
            <th>Title</th>
            <th>Time</th>
            <th>Elapsed</th>
            <th />
          </tr>
          <tr>
            <td>{this.state.name != null && this.state.name}</td>
            <td>
              {this.state.totalTime != null &&
                this.format(this.state.totalTime)}
            </td>
            <td>{this.format(this.state.count)}</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Title"
                onChange={event => this.handleChangeTitle(event)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Set Timer (in sec)"
                onChange={event => this.handleChangeTime(event)}
              />
            </td>
            <td>
              <button
                onClick={event => {
                  this.state.play ? this.startTimer() : this.stopTimer();
                }}
              >
                {this.state.play ? "Start" : "Stop"}
              </button>
              <button onClick={event => this.resetTimer()}>Reset</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Timer;
