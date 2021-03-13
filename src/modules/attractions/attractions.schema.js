const { Schema, model } = require('mongoose');

const attractionsLocaleSchema = new Schema({
  _id: false,
  lang: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const attractionsSchema = new Schema({
  countryCodeISO2: {
    type: String,
    require: true,
  },
  countryId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  votes: {
    type: Array,
    require: true,
  },
  info: [attractionsLocaleSchema],
});

const Attractions = model('attractions', attractionsSchema);

module.exports = Attractions;
