const Ugolki = require('../models/Ugolki');
  

module.exports.getUgolkis = async function(req, res) { console.log('getUgolkis');

  try {
    const allUgolkis = await Ugolki.find();
    res.status(200).json(allUgolkis);
  } catch(err) {
    res.status(404).json({
      message: 'an error occured!'
    })
  }     
};

module.exports.postUgolki = async function(req, res) {
  console.log('postUgolki...');

// check is this book already in DB 
  const isUgolkiInDB = await Ugolki.findOne({name: req.body.name});
  if (isUgolkiInDB) {
    res.status(409).json({
      message: 'this ugolki is already in DB!'
    })
  } else { //create new Ugolki
    const ugolki = new Ugolki({
      name: req.body.name,
      linkToVideo: req.body.linkToVideo,
      amountPiece: req.body.amountPiece,
      amountKG: req.body.amountKG,
      pricePiece: req.body.pricePiece,
      priceKG: req.body.priceKG,
      numberInKG: req.body.numberInKG
    });

    try {
      await ugolki.save();
      res.status(201).json(ugolki);
    } catch(err) {
      res.status(400).json({
        message: 'error occured'
      })
    }
  }
};

module.exports.deleteUgolki = async function(req, res) {
  
  try {
    // check is this ugolki in DB 
  const isUgolkiInDB = await Ugolki.findOne({_id: req.params.id});
  if (!isUgolkiInDB) {
    res.status(404).json({
      message: 'this ugolki is not in DB!'
    })
  } else { //delete ugolki
    await Ugolki.deleteOne({ _id: req.params.id });
    res.status(200).json(`${isUgolkiInDB.name} is deleted`);
  }
  } catch(err) {
    res.status(404).json({
      message: 'error occured!'
    })
  }     
};


module.exports.updateUgolki = async function(req, res) { console.log('here------');

    
  try {
     const result = await Ugolki.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      {linkToVideo: req.body.linkToVideo},
      {amountPiece: req.body.amountPiece},
      {amountKG: req.body.amountKG},
      {pricePiece: req.body.pricePiece},
      {priceKG: req.body.priceKG},
      {numberInKG: req.body.numberInKG},
      { new: true });
     res.status(200).json(`Ugolki has been updated, new ugolki amountKG is: ${result.amountKG} `);
  } catch {
      res.status(400).json({
      message: 'error occured'
      })
    }
  };
