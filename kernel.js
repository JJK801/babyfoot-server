// Requires

var express   = require('express'),
    http      = require('http'),
    twig      = require('twig'),
    mongoose  = require('mongoose'),
    namedRoutes = require('express-named-routes'),
    req         = require('express/lib/request');

// Load

var app     = express(),
    server  = http.createServer(app);
    
    namedRoutes.extend(app);

// Twig

twig.extendFunction('path', function(routeName, attr) {
    var path;

        path = app.lookupRoute(routeName);

    if ('object' === typeof path) {
        throw new Error('Route "' + routeName + '" is not a final route')
    }
    
    var router = app._router;
    var route = null;
    
    for (var method in router.map) {
        var routes = router.map[method];
        
        for (var routeKey in routes) {
            
            if (routes[routeKey].path == path) {
                route = routes[routeKey];
                
                for (var attrName in attr) {
                    if (route.params[attrName]) {
                        // TODO: Checker les paramétres avant de construire l'url
                        path = path.replace(new RegExp(':' + attrName + '\\??'), attr[attrName]);
                    }
                }
            }
        }
    }
    
    if (route) {
        path = path.replace(/\/\:[^\/]+\?/, '');
    
        if (route.match(path)) {
            return path;
        }
    }
    
    return '';
    
});

// App configurations

app.configure(function () {
    app.set('views', __dirname + '/views/html');
    app.set('view engine', 'html.twig');
    app.engine('html.twig', twig.__express);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname+'/public'));
    
    // This section is optional and can be used to configure twig.
    app.set('twig options', { 
        strict_variables: false
    });
    
    // Params basic check
    
    app.param(function (name, fn) {
        if (fn instanceof RegExp) {
            return function(req, res, next, val){
                var captures = fn.exec(String(val));
                
                if (captures) {
                  req.params[name] = captures;
                  next();
                } else {
                  next('route');
                }
            }
        }
    });
    
    app.param('objectId', /^[0-9a-z]{24}$/); // Matching Mongo IDS
    
    app.param('range', /^(\w+)?\.\.(\w+)?$/); // Matching a range
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function () {
    app.use(express.errorHandler());
    
});

// Mongoose

mongoose.connect('mongodb://localhost/babyfoot');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '[Mongoose] Connection error:'));
db.once('open', function callback () {
    console.log('[Mongoose] MongoDB connection open.');
});

// Document manager

var dm = require('./document_manager');
var document_manager = new dm();

// Controllers load

require('./main_controller')(app, document_manager);

// start listening

server.listen(8080);

module.exports.app              = app;
module.exports.server           = server;
module.exports.document_manager = dm;
module.exports.db               = db;