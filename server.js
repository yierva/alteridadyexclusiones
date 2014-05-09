'use strict';

var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname + '/server'
});

requirejs([
  'conf',
  'express'
], function (
  conf,
  express
) {

  var server = module.exports = express();

  server.use(require('body-parser')());
  server.use(require('cookie-parser')());
  server.use(require('method-override')());

  // Compile less files
  server.use(require('less-middleware')(__dirname + '/public'));

  // Static files
  server.use(express.static(__dirname + '/public'));

  // TEMPORAL (Browserify Jade)
  server.set('views', __dirname + '/public');
  server.set('view engine', 'jade');

  // route: /
  server.route('/').get(function(req, res, next) {
    res.render('index');
  });

  server.route('/lema').get(function(req, res, next) {
    res.render('lema');
  });


  // Listen server
  server.listen(process.env.PORT || conf.port);

});
