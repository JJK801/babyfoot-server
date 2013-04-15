var utils = require('./utils');

var Documents = new Array();

/**
 * Documents loader
 *
 * @param string rootDir Documents directory
 */
function loadDocuments(rootDir)
{
    utils.searchJsFiles(rootDir, function (dir, file) {
        var relativePath = dir.replace(rootDir, '');
        var entityName = file.replace('.js', '');
        var entityFqcn = ( relativePath ? relativePath + '/': '' ) + entityName;
        
            Documents[entityFqcn] = require(dir + '/' + file);
            console.log('[Document Loader] %s loaded', entityFqcn);
    })
}

/**
 * Documents manager
 *
 * @param string rootDir Custom documents directory
 */
function DocumentManager(rootDir)
{
    // Constructeur

    if (!rootDir) {
        rootDir = __dirname + '/Document';
    } else if(utils.type(rootDir) !== 'string') {
        throw new Error('Document manager root directory must be a string');
    }

    loadDocuments(rootDir);

    // Methods

    this.getModel = function (entityName) {
        if (typeof Documents[entityName] != 'undefined') {
            return Documents[entityName];
        }
        
        return null;
    }

    this.getModelsList = function () {
        var modelsNames = new Array();
        
        for (var key in Document) {
            modelsNames.push(key);
        }
        
        return modelsNames;
    }
}

module.exports = DocumentManager;