var express = require('express') // เรียกใช้งาน express  mudule
var router = express.Router() // กำหนด router instance ให้กับ express.Router class
const mean = require('../src/controllers/mean')
const user = require('../src/controllers/user')
const middleware = require('../src/controllers/middleware');

router.post('/login' , user.index);
router.post('/register' , user.store);

router.get('/mean',middleware , mean.index);
router.post('/mean/store',middleware , mean.store);
router.get('/mean/edit/:id',middleware , mean.edit);
router.put('/mean/update',middleware , mean.update);
router.delete('/mean/delete',middleware , mean.delete);

module.exports = router