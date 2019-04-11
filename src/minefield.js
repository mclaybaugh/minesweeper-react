import React from 'react';
import Block from './block';

export default function Minefield(props) {
  let minefieldStyle = {
    display: 'grid',
    width: '500px',
    height: '500px',
    gridTemplateColumns: 'repeat(' + props.width + ', 1fr)',
    gridTemplateRows: 'repeat(' + props.height + ', 1fr)',
    gridGap: '4px'
  };
  let bombSpots = getBombSpots(props.width, props.height, props.ratio);
  let blocks = getBlocks(props.width, props.height, bombSpots);
  return (
    <div style={minefieldStyle}>
      {blocks}
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

function getBlocks(width, height, bombs) {
  let blocks = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let role = isBomb(x, y, bombs) ? 'bomb' : 'clear';
      let content = '';
      if (role === 'clear') {
        let adjacents = getAdjacents(x, y, width, height);
        let number = 0;
        for (let i = 0; i < adjacents.length; i++) {
          if (isBomb(adjacents[i].x, adjacents[i].y, bombs)) {
            number++;
          }
        }
        if (number > 0) {
          content = `${number}`;
        }
      } else {
        content = 'X';
      }
      blocks[x*height+y] = <Block key={x*height+y} role={role} content={content}/>
    }
  }
  return blocks;
}

function isBomb(x, y, bombs) {
  let bomb = false;
  for (let i = 0; i < bombs.length; i++) {
    if (bombs[i].x === x && bombs[i].y === y) {
      bomb = true;
      break;
    }
  }
  return bomb;
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