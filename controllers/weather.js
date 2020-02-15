// const Product = require('../models/product');
const request = require('request');
const convert = require('xml-js');

exports.getGetWeather = (req, res, next) => {
  const url = `http://weather-ydn-yql.media.yahoo.com/forecastrss?location=${req.query.location}`;
  request.get(url,  {
    oauth:{
      consumer_key:'dj0yJmk9eDNzTWF2eW1vT0ZUJmQ9WVdrOWRrdDRRalZFTkdzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWZk',
      consumer_secret:'5aec7e5ac3a3d79df171d02e6c50d63ec2199b22',
  }}, function (error, response) {
    if (error) throw new Error(error);
    const xml = response.body;
    var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
    res.end(result1)
    });
};