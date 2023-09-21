const request = require('request')

const geocode = (add, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=88b055f2122a8efb230fc64944d422e8&query=' + add
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('UNABLE TO CONNECT', undefined)
        }
        else if (response.body.error) {
            callback("Try another search", undefined)
        }
        else {
                (!response.body.data.length) 
                    ? callback("Place not found",{})
                    : callback(undefined, {
                        lat: response.body.data[0].latitude,
                        long: response.body.data[0].longitude
                })

        }
    })
}


module.exports = geocode