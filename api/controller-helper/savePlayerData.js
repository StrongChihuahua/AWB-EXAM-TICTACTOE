const PlayerData = require(`../Schema/UserData-model`);
const mongoose = require(`mongoose`);

module.exports = savePlayerData = async (req, res) => {
    if(!req.body.player_name || !req.body.score){
        return res.status(400).json({msg: `All fields are required`});
    }
    try {
        const userData = new PlayerData ({
            _id: new mongoose.Types.ObjectId(),
            player_name: req.body.player_name,
            score: req.body.score
        });
        const user = await userData.save();
        if(user) return res.json({msg: `Created!`, user});
        return res.status(400).json({msg: `Request failed`});
    } catch (err) {
        console.log(err);
        return res.status(400).json({msg: `Request failed`, err});
    }
}
