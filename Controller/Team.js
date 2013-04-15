module.exports = function(app, dm)
{
    var Team = dm.getModel('Team');
    var path = app.lookupRoute;
    
    // Show

    app.get(path('team.list'), function(req, res)
    {
        var query = Team.find();
        
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
            
            query.exec(function (err, Teams) {
                if(err) throw err;
                
                res.render('team/list', { 'Teams': Teams });
            });
    });
    
    app.get(path('team.show'), function(req, res)
    {
        Team
            .findOne({'_id': req.params.objectId}, function (err, Team) {
                if(err) throw err;
                
                res.render('team/show', { 'Team': Team });
            });
    });
    
    // Register
    
    app.get(path('team.register'), function(req, res)
    {
        res.render('team/edit', { 'Team': new Team() });
    });
    
    app.post(path('team.register'), function(req, res)
    {
        // TODO: Gérer les erreurs et renvoi du form
        Team.create(req.body, function (err, Team) {
            if(err) throw err;
            res.redirect('/team/' + Team._id);
        });
    });
    
    // Update
    
    app.get(path('team.update'), function(req, res)
    {
        Team.findOne({'_id': req.params.objectId}, function (err, Team) {
            if(err) throw err;
            res.render('team/edit', { 'Team': Team });
        });
    });
    
    app.post(path('team.update'), function(req, res)
    {
        Team.update({'_id': req.params.objectId}, req.body, function (err, numAffected) {
            if(err) throw err;
            res.redirect('/team/' + req.params.objectId);
        });
    });
    
    // Remove
    
    app.get(path('team.remove'), function(req, res)
    {
        Team.remove({'_id': req.params.objectId}, function (err) {
            if(err) throw err;
            res.redirect('/team/' + req.params.objectId);
        });
    });
}