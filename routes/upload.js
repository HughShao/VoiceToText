const express = require('express');
const router = express.Router();
const FileUpload = require('../services/uploadFile.service');

/* Upload Voice to project. */
router.post('/', FileUpload.doUpload);

module.exports = router;
