import React, { useReducer } from "react";
import "./minefield.css";

window.oncontextmenu = function() {
  return false;
};

function init(props) {
  let cells = getCells(props.width, props.height);
  return {
    bombRatio: props.ratio,
    cells,
    hasBombs: false
  };
}
function reducer(state, action) {
  let cells;
  switch (action.type) {
    case "setup":
      let bombs = getBombSpots(
        state.cells[0].length,
        state.cells.length,
        state.bombRatio,
        action.cell
      );
      cells = setupCells(state.cells, bombs);
      cells = openCell(cells, action.cell.x, action.cell.y);
      return {
        cells,
        bombRatio: state.bombRatio,
        hasBombs: true
      };
    case "open":
      cells = openCell(state.cells, action.cell.x, action.cell.y);
      return {
        cells,
        bombRatio: state.bombRatio,
        hasBombs: state.hasBombs
      };
    case "mark":
      if (state.cells[action.cell.x][action.cell.y].status === "") {
        state.cells[action.cell.x][action.cell.y].status = "mark";
      }
      return {
        cells: state.cells,
        bombRatio: state.bombRatio,
        hasBombs: state.hasBombs
      };
    case "unmark":
      if (state.cells[action.cell.x][action.cell.y].status === "mark") {
        state.cells[action.cell.x][action.cell.y].status = "";
      }
      return {
        cells: state.cells,
        bombRatio: state.bombRatio,
        hasBombs: state.hasBombs
      };
    default:
      throw new Error();
  }
}
function openCell(cells, x, y) {
  if (cells[x][y].status === "") {
    cells[x][y].status = "open";
    if (cells[x][y].content === "") {
      let adjacents = getAdjacents(x, y, cells.length, cells[x].length);
      for (let i = 0; i < adjacents.length; i++) {
        cells = openCell(cells, adjacents[i].x, adjacents[i].y);
      }
    }
  }
  return cells;
}
export default function Minefield(props) {
  let minefieldStyle = {
    display: "grid",
    width: "1000px",
    height: "500px",
    gridTemplateColumns: "repeat(" + props.width + ", 1fr)",
    gridTemplateRows: "repeat(" + props.height + ", 1fr)",
    gridGap: "4px"
  };
  let [state, dispatch] = useReducer(reducer, props, init);
  let cellElements = getCellElements(state, dispatch);
  return <div style={minefieldStyle}>{cellElements}</div>;
}

function getBombSpots(width, height, ratio, cell) {
  let spots = [],
    numBombs = width * height * ratio;
  for (let i = 0; i < numBombs; i++) {
    let x = Math.floor(Math.random() * height),
      y = Math.floor(Math.random() * width);
    while (cell.x === x && cell.y === y) {
      x = Math.floor(Math.random() * height);
      y = Math.floor(Math.random() * width);
    }
    spots[i] = { x, y };
  }
  return spots;
}

function getCells(width, height) {
  let cells = [];
  for (let x = 0; x < height; x++) {
    cells[x] = [];
    for (let y = 0; y < width; y++) {
      cells[x][y] = {
        isBomb: false,
        content: "",
        status: ""
      };
    }
  }
  return cells;
}

function setupCells(cells, bombs) {
  for (let i = 0; i < bombs.length; i++) {
    cells[bombs[i].x][bombs[i].y].isBomb = true;
  }
  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      if (!cells[x][y].isBomb) {
        let adjacents = getAdjacents(x, y, cells.length, cells[x].length);
        let number = 0;
        for (let i = 0; i < adjacents.length; i++) {
          if (cells[adjacents[i].x][adjacents[i].y].isBomb) {
            number++;
          }
        }
        if (number > 0) {
          cells[x][y].content = `${number}`;
        }
      } else {
        cells[x][y].content = "X";
      }
    }
  }
  return cells;
}
function getCellElements(state, dispatch) {
  let elements = [];
  for (let x = 0; x < state.cells.length; x++) {
    for (let y = 0; y < state.cells[x].length; y++) {
      let key = x * state.cells[x].length + y;
      let handleLeftClick;
      if (state.hasBombs) {
        handleLeftClick = () => dispatch({ type: "open", cell: { x, y } });
      } else {
        handleLeftClick = () => dispatch({ type: "setup", cell: { x, y } });
      }
      let handleRightClick,
        content = "";
      switch (state.cells[x][y].status) {
        case "open":
          handleRightClick = () => {};
          content = state.cells[x][y].content;
          break;
        case "mark":
          handleRightClick = () => dispatch({ type: "unmark", cell: { x, y } });
          content = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              id="svg2"
              viewBox="0 0 370 400"
            >
              <path
                d="m 127.37288,297.2034 a 59.440678,39.627117 0 1 1 -118.8813524,0 59.440678,39.627117 0 1 1 118.8813524,0 z"
                transform="translate(-.986 -9.85)"
                id="path2987"
                fillRule="evenodd"
                stroke="#000"
                strokeWidth="4"
                strokeLinecap="square"
              />
              <path
                d="m 75.091934,247.7976 c 0,4.4986 -3.646839,8.14544 -8.145442,8.14544 -4.498603,0 -8.145441,-3.64684 -8.145441,-8.14544 0,-0.52392 0.04946,-233.66871 0.143978,-234.16511 0.717019,-3.7658931 4.026781,-6.6127511 8.001463,-6.6127511 4.053208,0 7.414965,2.960458 8.040911,6.8370181 0.06878,0.425983 0.104531,233.495443 0.104531,233.940843 z"
                id="path2989"
                fillRule="evenodd"
                stroke="#000"
                strokeWidth="4"
                strokeLinecap="square"
              />
              <path
                d="m 71.653487,15.16518 1.000736,99.07285 30.960267,-10.13245 30.96026,-10.132453 30.96027,-10.132449 15.48013,-5.066225 c 27.16119,-8.889116 27.49107,-21.374161 -0.12509,-29.896983 l -15.60523,-4.816042 -31.21045,-9.632082 -31.21045,-9.632083 z"
                id="path2992"
                fill="#a4001b"
                stroke="#000"
                strokeWidth="2"
              />
            </svg>
          );
          break;
        default:
          handleRightClick = () => dispatch({ type: "mark", cell: { x, y } });
      }
      let color = "";
      switch (content) {
        case "1":
          color = "lightblue";
          break;
        case "2":
          color = "green";
          break;
        case "3":
          color = "red";
          break;
        case "4":
          color = "blue";
          break;
        case "5":
          color = "purple";
          break;
        case "6":
          color = "yellow";
          break;
        case "7":
          color = "orange";
          break;
        case "8":
          color = "pink";
          break;
        default:
          color = "black";
      }
      elements.push(
        <div
          key={key}
          className={`cell tenByTen ${state.cells[x][y].status} ${color}`}
          onClick={handleLeftClick}
          onContextMenu={handleRightClick}
        >
          {content}
        </div>
      );
    }
  }
  return elements;
}

function getAdjacents(x, y, width, height) {
  let adjacents = [];
  // left top diag
  if (x - 1 > -1 && y - 1 > -1) {
    adjacents.push({
      x: x - 1,
      y: y - 1
    });
  }
  // top
  if (y - 1 > -1) {
    adjacents.push({
      x: x,
      y: y - 1
    });
  }
  // right top diag
  if (x + 1 < width && y - 1 > -1) {
    adjacents.push({
      x: x + 1,
      y: y - 1
    });
  }
  // right
  if (x + 1 < width) {
    adjacents.push({
      x: x + 1,
      y: y
    });
  }
  // right bot diag
  if (x + 1 < width && y + 1 < height) {
    adjacents.push({
      x: x + 1,
      y: y + 1
    });
  }
  // bot
  if (y + 1 < height) {
    adjacents.push({
      x: x,
      y: y + 1
    });
  }
  // left bot diag
  if (x - 1 > -1 && y + 1 < height) {
    adjacents.push({
      x: x - 1,
      y: y + 1
    });
  }
  // left
  if (x - 1 > -1) {
    adjacents.push({
      x: x - 1,
      y: y
    });
  }
  return adjacents;
}
