import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props) {
    return (
        <div className="outerbox">
        <button onClick={() => { 
            window.location.href =props.link}}>
            <span className="entry">
            <p><h2>{props.title}</h2> <br/><p className="author">Author: {props.author} </p></p>
            <p className="description">{props.description}</p>
            </span>
        </button>
        </div>
      );
}
