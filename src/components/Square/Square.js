import React from "react";
import "./Square.css";

export default class Square extends React.Component {
  selectImage() {
    let zeroOne = this.props.zeroOne;
    let marioSquare = this.props.marioSquare;
    let type = null;
    if (zeroOne === 1) {
      type = "feed";
    }
    if (marioSquare) {
      type = "mario";
    }
    if (type === "mario") {
      return <img className="square-image" src="mario.png" />;
    } else if (type === "feed") {
      return <img className="square-image" src="feed.png" />;
    } else return null;
  }
  render() {
    return (
      <td className="square">
        <div className="square-image-container">{this.selectImage()}</div>
      </td>
    );
  }
}
