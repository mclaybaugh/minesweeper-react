import React from 'react';
import Cell from './cell';

export default function Minefield(props) {
  let minefieldStyle = {
    display: 'grid',
    width: '500px',
    height: '500px',
    gridTemplateColumns: 'repeat(' + props.width + ', 1fr)',
    gridTemplateRows: 'repeat(' + props.height + ', 1fr)',
    gridGap: '4px'
  };
  let cells = getCells(props.width, props.height);
  let bombs = getBombSpots(props.width, props.height, props.ratio);
  cells = setupCells(cells, bombs);
  let cellElements = getCellElements(cells);
  return (
    <div style={minefieldStyle}>
      {cellElements}
    </div>
  );
}

function getBombSpots(width, height, ratio) {
  let spots = [],
      numBombs = width * height * ratio;
  for (let i = 0; i < numBombs; i++) {
    spots[i] = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }
  }
  return spots;
}

function getCells(width, height) {
  let cells = [];
  for (let x = 0; x < width; x++) {
    cells[x] = [];
    for (let y = 0; y < height; y++) {
      cells[x][y] = {isBomb: false};
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
        let adjacents = getAdjacents(x, y, cells[x].length, cells[y].length);
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
        cells[x][y].content = 'X';
      }
    }
  }
  return cells;
}
function getCellElements(cells) {
  let elements = [];
  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      let key = x * cells[x].length + y,
          role = cells[x][y].isBomb,
          content = cells[x][y].content;
      elements.push(<Cell key={key} isBomb={role} content={content}/>);
    }
  }
  return elements;
}

function getAdjacents(x, y, width, height) {
  let adjacents = [];
  // left top diag
  if (x-1 > -1 && y-1 > -1) {
    adjacents.push({
      x: x-1,
      y: y-1
    });
  }
  // top
  if (y-1 > -1) {
    adjacents.push({
      x: x,
      y: y-1
    });
  }
  // right top diag
  if (x+1 < width && y-1 > -1) {
    adjacents.push({
      x: x+1,
      y: y-1
    });
  }
  // right
  if (x+1 < width) {
    adjacents.push({
      x: x+1,
      y: y
    });
  }
  // right bot diag
  if (x+1 < width && y+1 < height) {
    adjacents.push({
      x: x+1,
      y: y+1
    });
  }
  // bot
  if (y+1 < height) {
    adjacents.push({
      x: x,
      y: y+1
    });
  }
  // left bot diag
  if (x-1 > -1 && y+1 < height) {
    adjacents.push({
      x: x-1,
      y: y+1
    });
  }
  // left
  if (x-1 > -1) {
    adjacents.push({
      x: x-1,
      y: y
    });
  }
  return adjacents;
}