const Samorezi = require('../models/Samorezi');
  

module.exports.getSamorezis = async function(req, res) { console.log('getSamorezis');

  try {
    const allSamorezis = await Samorezi.find();
    res.status(200).json(allSamorezis);
  } catch(err) {
    res.status(404).json({
      message: 'an error occured!'
    })
  }     
};

module.exports.postSamorezi = async function(req, res) {

// check is this Samorezi already in DB 
  const isSamoreziInDB = await Samorezi.findOne({name: req.body.name});
  if (isSamoreziInDB) {
    res.status(409).json({
      message: 'this Samorezi is already in DB!'
    })
  } else { //create new Samorezi
    const samorezi = new Samorezi({
      name: req.body.name,
      linkToVideo: req.body.linkToVideo,
      amountPiece: req.body.amountPiece,
      amountKG: req.body.amountKG,
      pricePiece: req.body.pricePiece,
      priceKG: req.body.priceKG,
      numberInKG: req.body.numberInKG
    });

    try {
      await samorezi.save();
      res.status(201).json(samorezi);
    } catch(err) {
      res.status(400).json({
        message: 'error occured'
      })
    }
  }
};

module.exports.deleteSamorezi = async function(req, res) {
  
  try {
    // check is this Samorezi in DB 
  const isSamoreziInDB = await Samorezi.findOne({_id: req.params.id});
  if (!isSamoreziInDB) {
    res.status(404).json({
      message: 'this Samorezi is not in DB!'
    })
  } else { //delete Samorezi
    await Samorezi.deleteOne({ _id: req.params.id });
    res.status(200).json(`${isSamoreziInDB.name} is deleted`);
  }
  } catch(err) {
    res.status(404).json({
      message: 'error occured!'
    })
  }     
};


module.exports.updateSamorezi = async function(req, res) { console.log('here------');

    
  try {
     const result = await Samorezi.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      {linkToVideo: req.body.linkToVideo},
      {amountPiece: req.body.amountPiece},
      {amountKG: req.body.amountKG},
      {pricePiece: req.body.pricePiece},
      {priceKG: req.body.priceKG},
      {numberInKG: req.body.numberInKG},
      { new: true });
     res.status(200).json(`Samorezi has been updated, new Samorezi amountKG is: ${result.amountKG} `);
  } catch {
      res.status(400).json({
      message: 'error occured'
      })
    }
  };
