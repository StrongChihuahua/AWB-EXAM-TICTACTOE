import React from 'react';
import './SquareBox.css'


class SquareBox extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);

    }

    clickHandler() {
        if(this.props.parentstate.inGame) {
            if(this.props.parentstate.prevHandler === 'X' && this.props.parentstate.Boxes[this.props.indexes] === undefined) {
                this.props.updatehandler('O')
                this.props.parentstate.Boxes[this.props.indexes] = 'O';
                this.props.parentstate.moves--;
            } else if (this.props.parentstate.Boxes[this.props.indexes] === undefined){
                this.props.updatehandler('X')
                this.props.parentstate.Boxes[this.props.indexes] = 'X';
                this.props.parentstate.moves--;
            }
        }
    }

    render() {
      return (
        <div className="box">
            <button className="btn btn-outline-dark"  onClick={this.clickHandler} ><h1>{this.props.parentstate.Boxes[this.props.indexes]}</h1></button>
        </div>
      );
    }
}

export default SquareBox;
