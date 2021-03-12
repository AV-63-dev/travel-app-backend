const { Schema, model } = require('mongoose');
/*{
  "countryCodeISO2": "US",
  "countryId": "",
  "imageURL": "https://gpxies.ru/team43/usa/attractions/1_Golden-Gate-Bridge.jpg",
  "rating": "0",
  "votes": [""],
  "info": [
    {
      "lang": "en",
      "title": "Golden gate bridge",
      "description": "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean."
    }
  ]
}*/
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

const Attractions = model('Place', attractionsSchema);

module.exports = Attractions;
