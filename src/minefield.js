import React from 'react';
import Block from './block';

export default function Minefield(props) {
  let minefieldStyle = {
    display: 'grid',
    width: '500px',
    height: '500px',
    margin: '1em auto',
    gridTemplateColumns: 'repeat(' + props.x + ', 1fr)',
    gridTemplateRows: 'repeat(' + props.y + ', 1fr)',
    gridGap: '4px'
  };
  let blocks = [...Array(props.x * props.y)].map((_, i) => <Block key={i}/>);
  return (
    <div style={minefieldStyle}>
      {blocks}
    </div>
  );
}