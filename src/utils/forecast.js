const request = require('request')

const forecast = (lat, long, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=55114de1f35a91026e6babdd349a6e9d&query='
    url = url.concat(lat)
    url = url.concat(',')
    url = url.concat(long)

    // console.log("URL= " + url)

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('UNABLE TO CONNECT', undefined)
        }
        else if (response.body.error) {
            callback(response.body.error, undefined)
        }
        else //if (response.body.cuurrent)
        {
            // if (response.body.temperature==undefined)
            //     callback({error:'UNABLE TO CONNECT PLEASE TRY AGAIN LATER'}, undefined)
            // else
             callback(undefined,`The temp is ${response.body.current.temperature} but it feels liks ${response.body.current.feelslike} there is ${response.body.current.precip} chance of raining`)
        }//else
        //callback('DATA NOT FOUND',undefined)
    })
}
module.exports = forecast