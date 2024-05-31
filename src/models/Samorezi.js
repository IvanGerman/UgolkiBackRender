const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SamoreziSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    linkToVideo: {
      type: String,
      required: true,
      unique: true
    },
    amountPiece: {
      type: Number,
      required: false,
      unique: false
    },
    amountKG: {
      type: Number,
      required: false,
      unique: false
    },
    pricePiece: {
      type: Number,
      required: false,
      unique: false
    },
    priceKG: {
      type: Number,
      required: false,
      unique: false
    },
    numberInKG: {
      type: Number,
      required: false,
      unique: false
    }
  }
);

module.exports = mongoose.model('samorezis', SamoreziSchema);
