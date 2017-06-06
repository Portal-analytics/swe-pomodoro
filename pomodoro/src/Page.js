import React, { Component } from "react";
import "./Page.css";
import "./App.css";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardText, CardHeader, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import * as firebase from "firebase";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const cardStyle = {
  margin: "12"
};

const timeStyle = {
  fontSize: "70px"
};

const memoStyle = {
  width: "100%"
};

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1500,
      half25: 750,
      half5: 150,
      work: true,
      play: true,
      edit: true,

      // memo states
      user: {},
      listOfMemoItems: [],
      listExists: false,
      userlist: []
    };
  }

  componentDidMount() {
    Notification.requestPermission();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ count: this.state.count + -1 });
    if (this.state.work) {
      if (this.state.count == this.state.half25) {
        new Notification("Half Way for " + this.state.memoInput + "!");
      }
    }

    if (!this.state.work) {
      if (this.state.count == this.state.half5) {
        new Notification("Half Way for Break!");
      }
    }
    if (this.state.count == 0) {
      if (this.state.work) {
        // this.stopTimer();
        this.setState({
          ...this.state,
          work: false,
          count: 300,
          play: true
        });
        new Notification("Time's Up for " + this.state.memoInput + "!");
      } else if (!this.state.work) {
        this.stopTimer();
        this.setState({
          ...this.state,
          work: true,
          count: 1500,
          play: true,
          name: null
        });
        new Notification("Time's Up for break! Back to Work");
      }
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
    clearInterval(this.timer);
    this.setState({
      ...this.state,
      count: 1500,
      totalTime: null,
      name: null,
      work: true,
      play: true
    });
  }

  //MEMO Functions
  handleMemoInput = (event, memoInput) => {
    this.setState({
      ...this.state,
      memoInput: event.target.value
    });
  };

  handleSubmitMemo = memoInput => {
    var date = new Date();
    var temp_list_of_memo_items = [];
    var temp_userlist = [];
    if (this.state.listOfMemoItems != null) {
      var temp_list_of_memo_items = this.state.listOfMemoItems.splice(0);
    }
    if (this.state.userlist != null) {
      var temp_userlist = this.state.userlist.splice(0);
    }

    var memoWithDate = { memoInput: memoInput, date: date.toDateString() };
    var temp_user = this.state.user;
    var temp_userID = this.props.userID;
    var updated_temp_list_of_memo_items = temp_list_of_memo_items.concat([
      memoWithDate
    ]);

    var updated_temp_user_list = temp_userlist;

    if (!updated_temp_user_list.includes(temp_userID)) {
      updated_temp_user_list = temp_userlist.concat([this.props.userID]);
    }
    temp_user[temp_userID] = updated_temp_list_of_memo_items;
    this.writeUserAndMemoData(temp_user, updated_temp_user_list);
    var temp_userID = this.props.userID;
    var readData = firebase.database().ref();
    this.setState({
      ...this.state,
      listExists: true
    });
    readData.on("value", snapshot => {
      if (snapshot.val() === null) {
        this.setState({
          ...this.state,
          user: {},
          listOfMemoItems: [],
          userlist: []
        });
      } else {
        this.setState({
          ...this.state,
          user: snapshot.val().temp_user,
          listOfMemoItems: snapshot.val().temp_user[this.props.userID],
          userlist: snapshot.val().userlist
        });
      }
    });
  };

  writeUserAndMemoData = (temp_user, updated_temp_user_list) => {
    firebase.database().ref().set({
      temp_user: temp_user,
      userlist: updated_temp_user_list
    });
  };

  componentWillMount() {
    var temp_userID = this.props.userID;
    var readData = firebase.database().ref();
    readData.on("value", snapshot => {
      if (snapshot.val() === null) {
        this.setState({
          ...this.state,
          user: {},
          listOfMemoItems: [],
          userlist: []
        });
      } else {
        this.setState({
          ...this.state,
          user: snapshot.val().temp_user,
          listOfMemoItems: snapshot.val().temp_user[this.props.userID],
          userlist: snapshot.val().userlist
        });
      }
    });
  }
  /*
  createLeaderBoard = () => {
    console.log(this.state.userlist);
    var userList = this.state.userlist;
    var list1 = userList.map(userKey => {
      this.state.user[userKey].length;
    });
    list1.sort();
    console.log(list1);
  };
  */

  render() {
    return (
      <MuiThemeProvider>
        <div className="bigdiv">
          <div className="memoList">
            <Card style={cardStyle}>
              <CardHeader> Memo List </CardHeader>
              <CardText>
                {this.state.listOfMemoItems != null &&
                  <table>
                    {this.state.listOfMemoItems.map(memoItem => {
                      return (
                        <tr>
                          <td> {memoItem.memoInput} </td>
                          <td> {memoItem.date} </td>
                        </tr>
                      );
                    })}
                  </table>}
              </CardText>
            </Card>
          </div>
          <div className="timer">
            <Card style={cardStyle}>
              <CardHeader style={timeStyle}>
                {this.format(this.state.count)}
              </CardHeader>
              <CardText>
                {this.state.totalTime != null &&
                  this.format(this.state.totalTime)}
                <TextField
                  style={memoStyle}
                  multiLine={true}
                  hintText="Describe task here."
                  onChange={this.handleMemoInput}
                />
                <br />
                <RaisedButton
                  primary={true}
                  label="Submit"
                  disabled={!this.state.memoInput}
                  onClick={() => this.handleSubmitMemo(this.state.memoInput)}
                />
              </CardText>
              <CardActions>
                <FlatButton
                  label={this.state.play ? "Start" : "Stop"}
                  onClick={event => {
                    this.state.play ? this.startTimer() : this.stopTimer();
                  }}
                />
                <FlatButton
                  label="Reset"
                  onClick={event => this.resetTimer()}
                />
              </CardActions>
            </Card>
          </div>
          <div className="leaderboard">
            <Card style={cardStyle}>
              <CardHeader> Leaderboard </CardHeader>

              <CardText>
                <table>
                  {this.state.userlist
                    .sort((a, b) => {
                      return (
                        this.state.user[b].length - this.state.user[a].length
                      );
                    })
                    .map(userKey => {
                      return (
                        <tr>
                          <td> {userKey} </td>
                          <td>
                            {this.state.user[userKey].length}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </CardText>

            </Card>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          hello
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Page;
