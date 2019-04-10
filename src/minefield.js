import React from 'react';
import Block from './block';

export default function Minefield(props) {
  let minefieldStyle = {
    display: 'grid',
    width: '500px',
    height: '500px',
    gridTemplateColumns: 'repeat(' + props.x + ', 1fr)',
    gridTemplateRows: 'repeat(' + props.y + ', 1fr)',
    gridGap: '4px'
  };
  let bombSpots = getBombSpots(props.x, props.y, 0.1);
  let blocks = getBlocks(props.x, props.y, bombSpots);
  return (
    <div style={minefieldStyle}>
      {blocks}
    </div>
  );
}

function getBombSpots(x, y, ratio) {
  let spots = [],
      numBombs = x * y * ratio;
  for (let i = 0; i < numBombs; i++) {
    spots[i] = {
      x: Math.floor((Math.random() * x)),
      y: Math.floor(Math.random() * y)
    }
  }
  return spots;
}

function getBlocks(x, y, bombs) {
  let blocks = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      let role = isBomb(i, j, bombs) ? 'bomb' : 'clear';
      blocks[i*y+j] = <Block key={i*y+j} role={role} />
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