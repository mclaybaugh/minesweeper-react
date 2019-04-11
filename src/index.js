import React from "react";
import ReactDOM from "react-dom";
import Minefield from "./minefield";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Minefield width={20} height={10} ratio={0.15} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
