
const api = require('./api');
const models = require('../models/index');


const renderHomePage = async (req, res) => {

    res.render("index");

}

const renderAboutPage = (req, res) => {

    res.render("about");

}

const render404Page = (req, res) => {

    res.render("404");

}

const getWeather = async (req, res) => {
    
    const city = req.body.city;
    const lat = req.body.lat;
    const lon = req.body.lng;
    const day = new Date().toLocaleDateString();
    req.body.day = day;

    // Check if there is already a record for this city
    try {
        const weatherData = await models.getWeatherByCity(req.body);
        if (typeof weatherData != "undefined"  
                    && weatherData != null  
                    && weatherData.length != null  
                    && weatherData.length > 0) {
            

            // Check if this record for this day? If yes, render. If no, delete it.
            if(weatherData[0].day == day) {

                const { daily: temperature } = weatherData[0];
                const { city: city } = weatherData[0];
                res.render("index", {
                    daily: temperature,
                    title: `${city} weather forecast for 8-days!`
                })
                return;
            }
            else {
                await models.deleteWeatherForCity(req.body);
            }
        }
    } catch(err) {
        console.log(err);
        //res.render("index");
    }
    

    // Get data from API for this city
    const weatherDataFromApi = api.getWeatherByApi(lat, lon);
    weatherDataFromApi.then(async function(weatherData) {
        try {
            weatherData.city = city;
            weatherData.day = day;

            await models.insertWeatherForCity(weatherData);
            
            const { daily: temperature } = weatherData;
            const { city: city } = weatherData;
            res.render("index", {
                daily: temperature,
                title: `${city} weather forecast for 8-days!`
            })

        } catch(err) {
            console.log(err);
            res.send(err);
        }
    });

}

module.exports = {
    renderHomePage, 
    getWeather, 
    renderAboutPage,
    render404Page
  }
