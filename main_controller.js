var utils = require('./utils');

/**
 * Main Controller
 *
 * @param object app     Express application
 * @para  object dm      Document manager
 * @param string rootDir Controllers directory
 */
var mainController = function (app, dm, rootDir)
{
    // Routes
    app.defineRoute('home', '/');
    
    app.defineRoute('player', {
        list:     '/player/:range?',
        register: '/player/register',
        show:     '/player/:objectId',
        update:   '/player/:objectId/update',
        remove:   '/player/:objectId/remove'
    });
    
    app.defineRoute('team', {
        list:     '/team/:range?',
        register: '/team/register',
        show:     '/team/:objectId',
        update:   '/team/:objectId/update',
        remove:   '/team/:objectId/remove'
    });
    
    app.defineRoute('match', {
        list:     '/match/:range?',
        register: '/match/register',
        show:     '/match/:objectId',
        update:   '/match/:objectId/update',
        remove:   '/match/:objectId/remove'
    });
    
    // Constructeur

    if (!rootDir) {
        rootDir = __dirname + '/Controller';
    } else if(utils.type(rootDir) !== 'string') {
        throw new Error('Main controller root directory must be a string');
    }

    utils.searchJsFiles(rootDir, function (dir, file) {
        var relativePath = dir.replace(rootDir, '');
        require(dir + '/' + file)(app, dm);
        
        console.log('[Main Controller] %s loaded', ( relativePath ? relativePath + '/' : '' ) + file);
    })
}

module.exports = mainController;