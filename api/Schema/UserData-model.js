const mongoose = require('mongoose');

const PlayerDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player_name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
},
    {
    timestamps: true
    }
);

module.exports = mongoose.model(`PlayerData`, PlayerDataSchema);
