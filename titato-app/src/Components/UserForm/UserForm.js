import React from 'react';
import './UserForm.css';




class UserForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isButtonDisabled: false
        }
        this.playButton = this.playButton.bind(this);
        this.saveScores = this.saveScores.bind(this);
    }

    playButton(e) {
        e.preventDefault();
        if(e.target.player1.value && e.target.player2.value){
            const player1 = e.target.player1.value;
            const player2 = e.target.player2.value;
            this.props.playgame(player1, player2);
            this.setState({
                isButtonDisabled: true
            });
            return;
        }
        alert(`Please enter players name`)
    }

    
    saveScores() {
        this.props.savescores();
        this.setState({
            isButtonDisabled: false
        })
    }

    render() {
      return (
        <div className="d-inline-flex">
            <div className="m-3 player1">
                <form onSubmit={this.playButton}>
                    <label className="m-3">
                        <strong>PLAYER X: </strong> 
                        <input type="text" name="player1" />
                    </label>
                    <label className="m-3"> 
                        <strong>PLAYER O: </strong> 
                        <input type="text" name="player2" />
                    </label>
                    <div className="mt-4">
                        <button type="submit" disabled={this.state.isButtonDisabled} className="btn btn-outline-dark pl-5 pr-5"> <strong>Play</strong></button>
                    </div>
                </form>
                <button type="submit" disabled={!this.state.isButtonDisabled} onClick={this.saveScores} className="btn btn-outline-dark mt-3"> <strong>Save and quit</strong></button>
            </div>        
        </div>
      );
    }
}

export default UserForm;
