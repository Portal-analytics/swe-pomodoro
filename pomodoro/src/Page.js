import React, { Component } from 'react';
import './Page.css';
import './App.css';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const cardStyle = {
    width: "35%"
}

const timeStyle = {
    fontSize: "70px"
}

const memoStyle = {
    width: "50%",
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
             count: 1500,
        half25: 750,
        half5: 150,
        work: true,
        play: true,
        edit: true,

            memoInput: "",
            users: []

        }

        this.leaderboard =  []
    }

    componentDidMount() {
        Notification.requestPermission();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    tick() {
    this.setState({count: (this.state.count + -1)})
    if (this.state.work){
    if ((this.state.count) == (this.state.half25)){
        console.log(2*(this.state.count))
        new Notification("Half Way for " + this.state.name + "!");
    }}

    if (!this.state.work){
        if ((this.state.count) == (this.state.half5)){
        console.log(2*(this.state.count))
        new Notification("Half Way for Break!");
    }}
    if (this.state.count == 0){
        if (this.state.work){
            this.stopTimer();
            this.setState({
                ...this.state,
                work:false,
                count:300,
                play:true
            })
            new Notification("Time's Up for " + this.state.name + "!");
        }else if(!this.state.work){
            this.stopTimer();
            this.setState({
                ...this.state,
                work:true,
                count:1500,
                play:true,
                name: null
            })
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
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
        this.setState({
            ...this.state,
            play: false
        })
    }

    stopTimer() {
        clearInterval(this.timer)
        this.setState({
            ...this.state,
            play: true
        })
    }

    resetTimer () {
    clearInterval(this.timer)  
    this.setState({
        ...this.state,
        count: 1500,
        totalTime: null,
        name:null,
        work: true,
        play: true
    });
  }

    //MEMO Functions
    handleMemoInput = (event, memoInput) => {
        this.setState({
            ...this.state,
            memoInput: event.target.value
        })
    }

    handleSubmitMemo = (memoInput) => {
        var date = String(new Date());
        var array1=this.state.users,
        updatedUsers= array1.concat([{ date: date, memo: memoInput,}]);
        // this.leaderboard.concat({
        //     user: this.props.userID,
        //     num_memos: this.leaderboard.num_memos + 1
        // })
        this.writeUserData(updatedUsers)
    }
    writeUserData=users=> {
    firebase.database().ref(this.props.userID).set({
        users
    });
    }
    componentWillMount(){
        var readData = firebase.database().ref(this.props.userID);
        readData.on('value',(snapshot) => {
            if (snapshot.val() === null) {
            this.setState({
            ...this.state,
            users: [],
            })}
            else {
            this.setState({
            ...this.state,
            users: snapshot.val().users,
            })}
        })


    } 
    render() {
        
        return (
            
            <MuiThemeProvider>
                <div>
                <div className='timer'>
                    <Card style={cardStyle}>
                        <CardHeader style={timeStyle}>{this.format(this.state.count)}</CardHeader>
                        <CardText>   
                                {(this.state.totalTime != null) && (this.format(this.state.totalTime))}
                            <TextField style={memoStyle} multiLine={true} hintText="Describe task here." onChange= {this.handleMemoInput} />
                             <br />
                            <RaisedButton primary={true} label='Submit' onClick={() => this.handleSubmitMemo(this.state.memoInput)} />
                        </CardText>
                        <CardActions>
                                <FlatButton label={this.state.play ? 'Start' : 'Stop'} onClick={(event) => { this.state.play ? this.startTimer() : this.stopTimer() }} />
                                <FlatButton label="Reset" onClick={(event) => this.resetTimer()} />
                        </CardActions>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader> Memo </CardHeader>
                        <CardText>
                            <table>
                                {this.state.users.map((memoObject) => {
                                    return (
                                        <tr>
                                            <td>
                                                {memoObject.memo}
                                            </td>
                                        </tr>
                                        )
                                    }
                                )}                
                         </table>
                         </CardText>
                    </Card>
                     
                </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Page;