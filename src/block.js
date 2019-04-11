import React from 'react';
import './block.css';

export default function Block(props) {
    return (
        <div className={`block tenByTen ${props.role}`}>
            {props.content}
        </div>
    );
}