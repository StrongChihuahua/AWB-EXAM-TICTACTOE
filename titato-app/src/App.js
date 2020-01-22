import React from 'react';
import './App.css';
import ScoreBoard from './Components/ScoreBoard/ScoreBoard';
import TicTacToe from './Components/TicTacToe/TicTacToe'




class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     playerX: null,
     playerO: null,
     didUpdateToggle: false
   };
   this.toggleUpdate = this.toggleUpdate.bind(this);
   this.getUserPayload = this.getUserPayload.bind(this);
 }

 toggleUpdate () {

  //toggle state if post player
   this.setState({
    didUpdateToggle: this.state.didUpdateToggle ? false : true
   });
 }

 getUserPayload(playerXData, playerOData) {
    this.setState({
      playerX: playerXData,
      playerO: playerOData
    });
 }

 extractData(data) {
   if(data === undefined) {
     console.log('No content')
   } else {
    console.log('has content')
   }
 }

  render() {
    return ( 
      <div className="App">
        <div className="tictactoe">
          <TicTacToe userpayload={this.getUserPayload} toggleupdate={this.toggleUpdate}/>
        </div>
        <div className="scoreboard">
          <ScoreBoard tochild={this.callbackFunction} playerXdata={this.state.playerX} playerOdata={this.state.playerO} toggleupdate={this.state.didUpdateToggle}/>
          <p>{this.state.message}</p>
        </div>
   
      </div> 
    );
  }
}

export default App;
