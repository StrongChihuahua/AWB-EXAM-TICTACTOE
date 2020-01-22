const express = require(`express`);
const router = express.Router();

//Helper functions
const savePlayerData = require('../controller-helper/savePlayerData');
const fetchPlayerData = require('../controller-helper/fetchPlayerData');


//Save player's data
router.post(`/save`, savePlayerData);

//fetch all players data
router.get(`/usersdata`, fetchPlayerData);

module.exports = router;
