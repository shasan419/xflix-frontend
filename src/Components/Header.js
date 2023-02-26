import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  root = () => {
    this.props.history.push("/");
  };


  render() {
    return (
      <div className="header">
        {/* Shows Qkart title image */}
        <div className="header-title" onClick={this.root}>
          <img src="xflixlogo.svg" alt="XFlix-icon"></img>
        </div>
        
        <div className="header-search">
        {this.props.search}
        </div>
        <div className="header-action">
        {this.props.upload}
        </div>
      </div>
    );
  }
}
