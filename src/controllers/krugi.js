const Krugi = require('../models/Krugi');
  

module.exports.getKrugis = async function(req, res) { console.log('getKrugis');

  try {
    const allKrugis = await Krugi.find();
    res.status(200).json(allKrugis);
  } catch(err) {
    res.status(404).json({
      message: 'an error occured!'
    })
  }     
};

module.exports.postKrugi = async function(req, res) {

// check is this Krugi already in DB 
  const isKrugiInDB = await Krugi.findOne({name: req.body.name});
  if (isKrugiInDB) {
    res.status(409).json({
      message: 'this Krugi is already in DB!'
    })
  } else { //create new Ugolki
    const krugi = new Krugi({
      name: req.body.name,
      linkToVideo: req.body.linkToVideo,
      amountPiece: req.body.amountPiece,
      amountKG: req.body.amountKG,
      pricePiece: req.body.pricePiece,
      priceKG: req.body.priceKG,
      numberInKG: req.body.numberInKG
    });

    try {
      await krugi.save();
      res.status(201).json(krugi);
    } catch(err) {
      res.status(400).json({
        message: 'error occured'
      })
    }
  }
};

module.exports.deleteKrugi = async function(req, res) {
  
  try {
    // check is this Krugi in DB 
  const isKrugiInDB = await Krugi.findOne({_id: req.params.id});
  if (!isKrugiInDB) {
    res.status(404).json({
      message: 'this Krugi is not in DB!'
    })
  } else { //delete Krugi
    await Krugi.deleteOne({ _id: req.params.id });
    res.status(200).json(`${isKrugiInDB.name} is deleted`);
  }
  } catch(err) {
    res.status(404).json({
      message: 'error occured!'
    })
  }     
};


module.exports.updateKrugi = async function(req, res) { console.log('here------');

    
  try {
     const result = await Krugi.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      {linkToVideo: req.body.linkToVideo},
      {amountPiece: req.body.amountPiece},
      {amountKG: req.body.amountKG},
      {pricePiece: req.body.pricePiece},
      {priceKG: req.body.priceKG},
      {numberInKG: req.body.numberInKG},
      { new: true });
     res.status(200).json(`Krugi has been updated, new Krugi amountPiece is: ${result.amountPiece} `);
  } catch {
      res.status(400).json({
      message: 'error occured'
      })
    }
  };
