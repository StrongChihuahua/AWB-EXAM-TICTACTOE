const PlayerData = require(`../Schema/UserData-model`);

module.exports = fetchPlayerData = async (req, res) => {
    try {
        const players = await PlayerData.find().sort({score: `descending`}).limit(10).exec();
        if(players) return res.json({payload: players});
        return res.status(404).json({msg: `Players not found!`})
    } catch (err) {
        console.log(err);
        return res.status(404).json({msg: err})
    }
}
