const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ltb25lOTEiLCJhIjoiY2thcDZ5amc1MDJ2ZzMwcGFyeTN6cW05MiJ9.IIdRuRTEtz_brbVLrK4J9w&limit=1'   

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the location service', undefined)
       } else if (response.body.features.length === 0) {
           callback('Unable to find the location. Try another search.', undefined)
       } else {
           callback(undefined, {
               longitude: response.body.features[0].center[1],
               latitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name 
           })
       }

   })

}

module.exports = geocode