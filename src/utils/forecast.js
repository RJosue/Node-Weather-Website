const request = require('request');

const forecast = (latitude, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cd7b4e38d39a73efb43784a182bcafbc&query='+ latitude + ',' + longitud + '&units=f'
    
    request({url, json: true}, (err, { body })=>{
        if(err){
            callback('Unable to connect a weather data.', undefined)
        }
        else if (body.success === false) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined,{
                temperature: body.current.temperature,
                fellslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast