const ViewToTextAPI = require('../services/viewToText.service');

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
    "path":"C:\\data\\audio-file.mp3",
    "model":"en-US_BroadbandModel",//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-models&locale=zh-cn
}
ViewToTextAPI.viewToTextApi(formData,(err, body)=>{
    if(err){
        console.log('view to text error.' +err);
    }
    console.log(JSON.parse(body.body).results[0].alternatives[0].transcript);
});