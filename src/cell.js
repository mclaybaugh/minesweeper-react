import React from "react";
import "./cell.css";

export default function Cell(props) {
  let role = props.isBomb ? "bomb" : "clear";
  return <div className={`cell tenByTen ${role}`}>{props.content}</div>;
}
