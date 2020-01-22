import React from 'react';
import './ScoreBoard.css'
import getScores from '../../http-helper/getScores';


class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPlayers: []
    }
  } 

  async componentDidMount() {
    //xhr Get players data
    this.setState({
      savedPlayers: await getScores()
    })
  }

  async componentDidUpdate(prevProps) {
    
    //check props then update leaderboard
    if(this.props.toggleupdate !== prevProps.toggleupdate){
      console.log(`update happen - inside`)
      this.setState({
        savedPlayers: await getScores()
      })
    }
   }
//
    render() {
      return (
        <div className="wrap">

          <div>
            <h1><strong>Scoreboard</strong></h1>
          </div>
          <div className="container">
            <table className="table text-left">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Handle</th>
                  <th scope="col">Player</th>
                  <th scope="col" className="text-center">Wins</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><strong>(X)</strong></th>
                  <td>{this.props.playerXdata === null || this.props.playerXdata[0] === undefined ? `` : `${this.props.playerXdata[0]}`}</td>
                  <td className="text-center">{this.props.playerXdata === null || this.props.playerXdata[0] === undefined ? `` : `${this.props.playerXdata[1]}`}</td>
                </tr>
                <tr>
                  <th scope="row"><strong>(O)</strong></th>
                  <td>{this.props.playerOdata === null || this.props.playerXdata[0] === undefined ? `` : `${this.props.playerOdata[0]}`}</td>
                  <td className="text-center">{this.props.playerOdata === null || this.props.playerXdata[0] === undefined ? `` : `${this.props.playerOdata[1]}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr></hr>

       
          <div className="container">
            <h1><strong>Leaderboard</strong></h1>
          </div>
          <div className="container">
            <table className="table text-left">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Player</th>
                  <th scope="col" className="text-center">Wins</th>    
                </tr>
              </thead>
            {
              this.state.savedPlayers.map((element, index) => {
               return <tbody key={index}>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{element.player_name}</td>
                          <td className="text-center">{element.score}</td>
                        </tr>
                      </tbody> 
                }
              )
            }
            </table>
          </div>
        </div> 
      );
    }
}

export default ScoreBoard;
