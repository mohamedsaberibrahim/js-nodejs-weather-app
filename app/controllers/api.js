const axios = require('axios');
const { response } = require('express');

const config = require('dotenv').config();
const baseUrl = 'http://api.openweathermap.org/data/2.5/onecall?'

function getWeatherByApi(lat, lng){
    const url = `${baseUrl}lat=${lat}&lon=${lng}&units=metric&exclude=minutely,current,hourly,alerts&appid=${process.env.API_KEY}`;
    
    const dataPromise = axios.get(url).then( (response) => response.data);
    // return it
    return dataPromise;
}


module.exports.getWeatherByApi = getWeatherByApi;