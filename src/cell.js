import React from "react";
import "./cell.css";

export default function Cell(props) {
  let role = props.isBomb ? " bomb" : " clear";
  let open = props.isOpen ? " open" : "";
  let color = "";
  switch (props.content) {
    case "1":
      color = " lightblue";
      break;
    case "2":
      color = " green";
      break;
    case "3":
      color = " red";
      break;
    case "4":
      color = " blue";
      break;
    case "5":
      color = " purple";
      break;
    case "6":
      color = " yellow";
      break;
    case "7":
      color = " orange";
      break;
    case "8":
      color = " pink";
      break;
  }
  return (
    <div className={`cell tenByTen${role}${open}${color}`}>{props.content}</div>
  );
}
