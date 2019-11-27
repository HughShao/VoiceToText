const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const VoiceToTextAPI = require('../services/voiceToText.service');
const config = require('../config');

/* recognize the text from voice. */
router.post('/', function(req, res, next) {
    let fileName = req.body.fileName;
    let filePath = path.join(__dirname,config.file_path + '/'+ fileName);
    if(!fs.existsSync(filePath)){
        res.json({code:-1, message:'file not exists'});
    }
    const formData = {
        contentType:req.body.type,
        path:filePath,
        model:req.body.model
    }
    VoiceToTextAPI.voiceToText(formData,(err, body)=>{
        if(err){
            res.json({code:-1, message:err});
        }
        if(body.statusCode == 200){
            res.json({code:1, data:JSON.parse(body.body)});
        }else{
            res.json({code:-1, data:JSON.parse(body.body)}); 
        }
    });
  });

module.exports = router;
