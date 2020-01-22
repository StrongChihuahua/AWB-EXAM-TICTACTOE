import React from 'react';
import SquareBox from '../SquareBox/SquareBox';
import './TicTacToe.css';
import UserForm from '../UserForm/UserForm'
import saveScores from '../../http-helper/saveScores';

class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          Boxes: Array(9).fill(undefined),
          playerX: [],
          playerO: [],
          prevHandler: '',
          prevWinner: '',
          isWinner: false,
          moves: 9,
          inGame: false,
          isButtonDisabled: true
        }
        this.updateHandler = this.updateHandler.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.savePlayerScores = this.savePlayerScores.bind(this);
        this.playGame = this.playGame.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
    }

    playGame(player1, player2) {
      this.setState({
        inGame: true,
        playerX: [player1, 0],
        playerO: [player2, 0]
      }, () => {
        this.props.userpayload(this.state.playerX, this.state.playerO)
      })
    }
    
    checkWinner (combination) {
      const conditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3 ,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] 
      ];
      for(let i = 0; i < conditions.length; i++) {
        const [x, y, z] = conditions[i];
        if(combination[x] && combination[x] === combination[y] && combination[x] === combination[z]){
           if(combination[x] === 'X') {
              this.setState({
                prevWinner: combination[x],
                playerX: [this.state.playerX[0], this.state.playerX[1] + 1],
                inGame: false
             }, () => {
                this.props.userpayload(this.state.playerX, this.state.playerO);
              })
           }
          if(combination[x] === 'O') {
            this.setState({
              prevWinner: combination[x],
              playerO: [this.state.playerO[0], this.state.playerO[1] + 1],
              inGame: false
            }, () => {
              this.props.userpayload(this.state.playerX, this.state.playerO);
            })
           }
         return true;
        }   
      }
      return false;
    }

    savePlayerScores() {
      if(this.state.playerX[1] >=1 || this.state.playerO[1] >= 1) {
        let playerX = this.state.playerX;
        let playerO = this.state.playerO

        //xhr post
        saveScores(playerX, playerO);

        //toggle update - userform component
        setTimeout(() => {
          this.props.toggleupdate();
        }, 1000);
      }
      this.setState({
        Boxes: Array(9).fill(undefined),
        inGame: false,
        isWinner: false,
        isButtonDisabled: true,
        playerX: [],
        playerO: []
      },() => {
        this.props.userpayload(this.state.playerX, this.state.playerO)
      } )
  }
      

    updateHandler(player) {
      this.setState({
        prevHandler: player
      }, () => {
          //check winner
          if(!this.checkWinner(this.state.Boxes)) {
              if(!this.state.Boxes.includes(undefined) && this.state.moves === 0 && this.state.isWinner === false)  {
                this.setState({
                  isButtonDisabled: false
                })
              }
          } else {
            this.setState({
              isWinner: this.checkWinner(this.state.Boxes),
              isButtonDisabled: false
            })
          }
       });
    }
    resetBoard() {
      this.setState({
        Boxes: Array(9).fill(undefined),
        inGame: true,
        isWinner: false,
        moves: 9,
        isButtonDisabled: true,
      })
    }


    render() {
      return (
        <div>
          <div>
            <UserForm playgame={this.playGame} savescores={this.savePlayerScores} />
          </div>
          <div className="d-inline-flex flex-wrap mt-4 BOX">
            {
              this.state.Boxes.map((square, index) => {
                return <SquareBox key={index} parentstate={this.state} updatehandler={this.updateHandler} indexes={index}/>
              })
            }
          </div>
          <div className="mt-5">
              <h1>
                {
                  this.state.isWinner
                  ?  `Player ${this.state.prevWinner} Win!` : this.state.inGame 
                  ? !this.state.Boxes.includes(undefined) && this.state.moves === 0 && this.state.isWinner === false 
                  ? `It's a Tie!` : `Turn:  ${this.state.prevHandler === 'X' 
                  ? 'O' : 'X'}` : ''
                }
              </h1>
              <button type="button" disabled={this.state.isButtonDisabled} onClick={this.resetBoard} className="btn btn-lg btn-outline-dark mt-3"><strong>Clear Board</strong></button>
          </div>
        </div>
      );
    }
}

export default TicTacToe;
