const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const sd = require("silly-datetime");

const config = require('../config');
exports.doUpload = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,config.temp_path);
    if (!fs.existsSync(form.uploadDir)) {
        fs.mkdir(form.uploadDir);
    }
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req, function (err, fields, file) {
        var filePath = '';
        if(file.tmpFile){
            filePath = file.tmpFile.path;
        } else {
            for(var key in file){
                if( file[key].path && filePath==='' ){
                    filePath = file[key].path;
                    break;
                }
            }
        }
        var targetDir = path.join(__dirname, config.file_path);
        if (!fs.existsSync(targetDir)) {
            fs.mkdir(targetDir);
        }
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        if (('.alaw.basic.flac.g729.l16.mp3.mpeg.mulaw.ogg.wav.webm').indexOf(fileExt.toLowerCase()) === -1) {
            res.json({code:-1, message:'file type not support, please change to alaw/basic/flac/g729/l16/mp3/mpeg/mulaw/ogg/wav/webm'});
        } else {
            var fileName = sd.format(new Date(),'YYYYMMDDHHmmss') + "_" + new Date().getTime() + fileExt;
            var targetFile = path.join(targetDir, fileName);
            fs.rename(filePath, targetFile, function (err) {
                if (err) {
                    console.info(err);
                    res.json({code:-1, message:'upload failed'});
                } else {
                    res.json({code:0, fileName:fileName});
                }
            });
        }
    });
};