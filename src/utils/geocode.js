const request= require('request')
const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibGFzYWxzcyIsImEiOiJjazJhbmV5amQwa2M5M29tamkyNW90a2xoIn0.u0n8RdAU0gm2HwJwpTJy9w&limit=1'

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback("Unable to connect to weather server",undefined)
        } else if(body.features.length===0) {
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            })
        }


    })

}




module.exports=geocode