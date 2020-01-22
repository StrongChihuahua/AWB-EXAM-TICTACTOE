import axios from 'axios'

const getScores = async () => {
    try {
        const playersData = await axios.get(`http://localhost:2000/api/user/usersdata`, {
          headers: {
              'Content-Type': 'application/json',
          }
      });
        if(playersData) return playersData.data.payload;
      } catch (err) {
          alert(`players not found`);
          console.log(err);
      }
}

export default getScores;
