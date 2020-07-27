const request = require('request')

const forcast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=50431b984b230832ea60ca63c82b9f03&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the web server', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} sky, It is currently ${body.current.temperature} degress out.`)
        }
    })

}

module.exports = forcast