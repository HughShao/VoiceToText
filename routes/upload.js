var express = require('express');
var router = express.Router();
var FileUpload = require('../services/uploadFile.service');

/* Upload Voice to project. */
router.post('/', FileUpload.doUpload);

module.exports = router;
