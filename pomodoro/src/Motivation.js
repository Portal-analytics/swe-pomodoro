import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
const quotes = [
  "Work outside of your habits.",
  "Stop staring. Get to work.",
  "Knock Knock. Who's There? Nobody. Go Work.",
  "Show some heart.",
  "Eat some healthy food.",
  "Smile.",
  "Get to work.",
  "Stop procrastinating.",
  "Get over yourself.",
  "Use spell check.",
  "Trust your gut.",
  "Question everything.",
  "Keep learning.",
  "Think about all the possibilities.",
  "Find inspiration everywhere."
];

const style = {
  margin: 12
};
var x = 0;
var z = 0;
var counter = z;
var arrayIndex = x;
const AppBarExampleIcon = () =>
  <AppBar
    title="Fucking Header"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />;

const RaisedButtonExampleSimple = () =>
  <div>
    <RaisedButton label="Next Quote" style={style} />
  </div>;

const RaisedButtonExampleSimple2 = () =>
  <div>
    <RaisedButton label="Random Quote" primary={true} style={style} />
  </div>;
class Motivation extends Component {
  state = {
    ...this.state,
    arrayIndex: x,
    counter: z
  };

  theSwitch = () => {
    if (this.state.arrayIndex === quotes.length - 1) {
      x = 0;

      this.setState({
        arrayIndex: x,
        counter: z++
      });
    } else {
      this.setState({
        arrayIndex: x++,
        counter: z++
      });
    }
  };

  Randomizer = () => {
    this.setState({
      arrayIndex: Math.floor(Math.random() * quotes.length),
      counter: z++
    });
  };
  render() {
    return (
      <div className="Motivation">
        <div />
        <h1 onClick={this.theSwitch} className="App-intro">
          {quotes[this.state.arrayIndex]}
        </h1>
        <p className="helper"> Click the text for some motivation. </p>
        <p className="helper"> Login to start working. </p>
      </div>
    );
  }
}

export default Motivation;
