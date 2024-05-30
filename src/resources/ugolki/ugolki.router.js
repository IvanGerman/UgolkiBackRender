const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/ugolki');

const router = express.Router();


//the callback function under can be replaced by controller
router.get('/ugolki', passport.authenticate('jwt', { session: false }), controller.getUgolkis);

router.post('/ugolki', passport.authenticate('jwt', { session: false }), controller.postUgolki);

router.delete('/ugolki/:id', passport.authenticate('jwt', { session: false }), controller.deleteUgolki);

router.put('/ugolki/:id', passport.authenticate('jwt', { session: false }), controller.updateUgolki);



module.exports = router; 