const { Schema, model } = require('mongoose');

const localeSchema = new Schema({
  _id: false,
  lang: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const countrySchema = new Schema({
  coverURL: String,
  // videoUrl: String,
  codeISO2: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },
  capitalCoordinates: {
    lat: {
      type: String,
    },
    lon: {
      type: String,
    },
  },
  info: [localeSchema],
});

const Country = model('Country', countrySchema);

module.exports = Country;
