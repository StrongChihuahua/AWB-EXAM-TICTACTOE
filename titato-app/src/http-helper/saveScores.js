import axios from 'axios'

const saveScores = async (playerX, playerO) => {
    try {
        if(playerX[1] >= 1) {
             await axios.post(`http://localhost:2000/api/user/save`, {
                player_name: playerX[0],
                score: playerX[1]
            }, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        } 
        if(playerO[1] >= 1) {
             await axios.post(`http://localhost:2000/api/user/save`, {
                player_name: playerO[0],
                score: playerO[1]
            }, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });
        }
      } catch (err) {
          alert(`players not found`);
          console.log(err);
      }
}

export default saveScores;


 



