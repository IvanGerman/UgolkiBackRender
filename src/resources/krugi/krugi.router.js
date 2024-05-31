const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/krugi');

const router = express.Router();


//the callback function under can be replaced by controller
router.get('/krugi', passport.authenticate('jwt', { session: false }), controller.getKrugis);

router.post('/krugi', passport.authenticate('jwt', { session: false }), controller.postKrugi);

router.delete('/krugi/:id', passport.authenticate('jwt', { session: false }), controller.deleteKrugi);

router.put('/krugi/:id', passport.authenticate('jwt', { session: false }), controller.updateKrugi);



module.exports = router; 