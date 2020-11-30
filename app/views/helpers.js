var hbs = require('hbs');

const prettifyDate = function(timestamp) {
    const milliseconds = timestamp * 1000 
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleDateString() //2019-12-9 
    return humanDateFormat;
    }

const round =  function(number) {
    return Math.round(number);
    }


module.exports = {
    prettifyDate,
    round
}
