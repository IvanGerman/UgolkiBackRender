const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/others');

const router = express.Router();


//the callback function under can be replaced by controller
router.get('/others', passport.authenticate('jwt', { session: false }), controller.getOtherss);

router.post('/others', passport.authenticate('jwt', { session: false }), controller.postOthers);

router.delete('/others/:id', passport.authenticate('jwt', { session: false }), controller.deleteOthers);

router.put('/others/:id', passport.authenticate('jwt', { session: false }), controller.updateOthers);



module.exports = router; 