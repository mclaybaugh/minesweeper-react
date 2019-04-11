import React from "react";
import ReactDOM from "react-dom";
import Minefield from "./minefield";
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Minefield width={10} height={10}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));