var request = require('request');
var config = require('../config');
var fs = require('fs');
var AuthorizationStr = new Buffer('apikey:'+new Buffer(config.apikey,'base64').toString()).toString('base64');

function voiceToText(formData, callback) {
    //formData :{
    //     "contentType":"audio/mp3",//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-audio-formats&locale=zh-cn
    //     "path":"C:\\data\\audio-file.mp3",
    //     "model":"en-US_BroadbandModel",//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-models&locale=zh-cn
    // }
    
    console.log("VoiceToText API==>");
    const headers = {
        'Authorization': 'Basic '+ AuthorizationStr,
        'Accept': 'application/json'
    }
    if(formData.contentType){
        headers['Content-Type'] = formData.contentType;
    }
    request.post({
        url: config.url,
        headers: headers,
        body: fs.createReadStream(formData.path)
    }, (err, body, response) => {
        callback(err, body, response)
    })
}

module.exports ={voiceToText}