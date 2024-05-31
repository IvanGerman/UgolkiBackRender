const Others = require('../models/Others');
  

module.exports.getOtherss = async function(req, res) { console.log('getOtherss');

  try {
    const allOtherss = await Others.find();
    res.status(200).json(allOtherss);
  } catch(err) {
    res.status(404).json({
      message: 'an error occured!'
    })
  }     
};

module.exports.postOthers = async function(req, res) {

// check is this Others already in DB 
  const isOthersInDB = await Others.findOne({name: req.body.name});
  if (isOthersInDB) {
    res.status(409).json({
      message: 'this Others is already in DB!'
    })
  } else { //create new Others
    const others = new Others({
      name: req.body.name,
      linkToVideo: req.body.linkToVideo,
      amountPiece: req.body.amountPiece,
      amountKG: req.body.amountKG,
      pricePiece: req.body.pricePiece,
      priceKG: req.body.priceKG,
      numberInKG: req.body.numberInKG
    });

    try {
      await others.save();
      res.status(201).json(others);
    } catch(err) {
      res.status(400).json({
        message: 'error occured'
      })
    }
  }
};

module.exports.deleteOthers = async function(req, res) {
  
  try {
    // check is this Others in DB 
  const isOthersInDB = await Others.findOne({_id: req.params.id});
  if (!isOthersInDB) {
    res.status(404).json({
      message: 'this Others is not in DB!'
    })
  } else { //delete Others
    await Others.deleteOne({ _id: req.params.id });
    res.status(200).json(`${isOthersInDB.name} is deleted`);
  }
  } catch(err) {
    res.status(404).json({
      message: 'error occured!'
    })
  }     
};


module.exports.updateOthers = async function(req, res) { console.log('here------');

    
  try {
     const result = await Others.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      {linkToVideo: req.body.linkToVideo},
      {amountPiece: req.body.amountPiece},
      {amountKG: req.body.amountKG},
      {pricePiece: req.body.pricePiece},
      {priceKG: req.body.priceKG},
      {numberInKG: req.body.numberInKG},
      { new: true });
     res.status(200).json(`Others has been updated, new Others pricePiece is: ${result.pricePiece} `);
  } catch {
      res.status(400).json({
      message: 'error occured'
      })
    }
  };
