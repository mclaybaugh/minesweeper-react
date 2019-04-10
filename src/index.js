import React from "react";
import ReactDOM from "react-dom";
import Minefield from "./minefield";
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Minefield x={10} y={10}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));