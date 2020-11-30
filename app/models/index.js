const mongo = require('mongodb');


var dbo = null;

mongo.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if(err) {
        console.trace(err); 
        process.exit(0);
    }
    dbo = db.db(process.env.DB_NAME);
    // console.log("Connected to MongoDb");
})

function readWeather(query) {
    return new Promise((resolve, reject) => {
        dbo
            .collection(process.env.COL_NAME)
            .find({city: query.city})
            .toArray((err, result) => {
                if(err) {
                    console.trace(err);
                    reject(err);
                }
                resolve(result);
            });
    });
}

function createWeather(weatherData) {
    return new Promise((resolve, reject) => {
        dbo.collection("weather_data").insertOne(weatherData, (err, result) => {
            if(err) {
                console.trace(err);
                reject(err);
            }
            resolve(result);
        });
    });
}

function updateWeather(weatherData) {
    return new Promise((resolve, reject) => {
        dbo.collection("weather_data").updateOne({ city: weatherData.city, $set: weatherData }, (err, result) => {
            if(err) {
                console.trace(err);
                reject(err);
            }
            resolve(result);
        });
    });
}

function deleteWeather(query) {
    return new Promise((resolve, reject) => {
        dbo.collection("weather_data").deleteOne({ city: query.city }, (err, result) => {
            if(err) {
                console.trace(err);
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    getWeatherByCity: readWeather,
    insertWeatherForCity: createWeather,
    updateWeatherForCity: updateWeather,
    deleteWeatherForCity: deleteWeather
}