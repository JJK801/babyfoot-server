module.exports = function(app, dm)
{
    var Player = dm.getModel('Player');
    var path = app.lookupRoute;
    
    // Show
    
    app.get(path('player.list'), function(req, res)
    {
        var query = Player.find();
        
            if (req.params.range) {
                var range = req.params.range;
                var start = ( range[1] ? parseInt(range[1]) : 0 );
                
                if (start) {
                    query.skip(start);
                }
                
                if (range[2]) {
                    var stop = parseInt(range[2]);
                    query.limit(stop - start);
                }
            }
            
            query.exec(function (err, Players) {
                if(err) throw err;
                
                res.render('player/list', { 'Players': Players });
            });
    });
    
    app.get(path('player.show'), function(req, res)
    {
        Player
            .findOne({'_id': req.params.objectId}, function (err, Player) {
                if(err) throw err;
                
                res.render('player/show', { 'Player': Player });
            });
    });
    
    
    // Register
    
    app.get(path('player.register'), function(req, res)
    {
        res.render('player/edit', { 'Player': new Player() });
    });
    
    app.post(path('player.register'), function(req, res)
    {
        // TODO: Gérer les erreurs et renvoi du form
        Player.create(req.body, function (err, Player) {
            if(err) throw err;
            res.redirect('/player/' + Player._id);
        });
    });
    
    // Update
    
    app.get(path('player.update'), function(req, res)
    {
        Player.findOne({'_id': req.params.objectId}, function (err, Player) {
            if(err) throw err;
            res.render('player/edit', { 'Player': Player });
        });
    });
    
    app.post(path('player.update'), function(req, res)
    {
        Player.update({'_id': req.params.objectId}, req.body, function (err, numAffected) {
            if(err) throw err;
            res.redirect('/player/' + req.params.objectId);
        });
    });
    
    // Remove
    
    app.get(path('player.remove'), function(req, res)
    {
        Player.remove({'_id': req.params.objectId}, function (err) {
            if(err) throw err;
            res.redirect('/player/' + req.params.objectId);
        });
    });
}