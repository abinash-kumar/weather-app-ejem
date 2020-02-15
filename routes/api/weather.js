const path = require('path');


const adminController = require('../../controllers/weather');

module.exports = (app) => {

    app.get('/api/weather', adminController.getGetWeather);

}



