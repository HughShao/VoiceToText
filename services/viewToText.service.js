var request = require('request');
const config = require('../config');
var fs = require('fs');
var AuthorizationStr = new Buffer('apikey:'+new Buffer(config.apikey,'base64').toString()).toString('base64');

function viewToTextApi(formData, callback) {
    //formData :{
    //     "contentType":"audio/mp3",//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-audio-formats&locale=zh-cn
    //     "path":"C:\\data\\audio-file.mp3",
    //     "model":"en-US_BroadbandModel",//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-models&locale=zh-cn
    // }
    
    console.log("ViewToText API==>");
    const headers = {
        Authorization: 'Basic '+ AuthorizationStr,
        'Content-Type': formData.contentType,
        Accept: 'application/json'
    }
    
    request.post({
        url: config.url,
        headers: headers,
        data:{"model":formData.model},
        body: fs.createReadStream(formData.path)
    }, (err, body, response) => {
        callback(err, body, response)
    })
}

module.exports ={viewToTextApi}