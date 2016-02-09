var express = require('express');
var router = express.Router();
var isLoggedIn = require('../controllers/loggedin');

var noAuth = require('./noAuth/noAuth');
var reqAuth = require('./reqAuth/reqAuth');

router.use('/', noAuth);
router.use('/reqauth', reqAuth);

router.get('/', isLoggedIn.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'MEAN CMS' });
});

module.exports = router;
