const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/samorezi');

const router = express.Router();


//the callback function under can be replaced by controller
router.get('/samorezi', passport.authenticate('jwt', { session: false }), controller.getSamorezis);

router.post('/samorezi', passport.authenticate('jwt', { session: false }), controller.postSamorezi);

router.delete('/samorezi/:id', passport.authenticate('jwt', { session: false }), controller.deleteSamorezi);

router.put('/samorezi/:id', passport.authenticate('jwt', { session: false }), controller.updateSamorezi);



module.exports = router; 