const VoiceToTextAPI = require('../services/voiceToText.service');

// describe('Test viewToText API use default mp3',()=>{

//     // test viewToText API use default mp3
//     test('test viewToText API use default mp3', async () => {
//         let responce = ViewToTextAPI.viewToTextApi(null,(err, body)=>{
//             if(err){
//                 console.log('view to text error.' +err);
//             }
//             console.log('audio content: '+body);
//         });
//     })
// });
let formData = {
    "contentType":"audio/mp3",
    "path":"C:\\data\\rec-5289ms-32kbps-32000hz.mp3",
    "model":"zh-CN_BroadbandModel",//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-models&locale=zh-cn
}
VoiceToTextAPI.voiceToText(formData,(err, body)=>{
    if(err){
        console.log('view to text error.' +err);
    }
    console.log(JSON.parse(body.body).results[0].alternatives[0].transcript);
});