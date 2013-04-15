var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    NestedSetPlugin = require('mongoose-nested-set'),
    Player   = require('./Player');

var TeamPrototype = {
    name:      String,
    Players:   [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    timestamps: {
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        deleted: { type: Date, default: null }
    }
}

var TeamSchema = Schema(TeamPrototype);
    TeamSchema.plugin(NestedSetPlugin);
    
var Team       = mongoose.model('Team', TeamSchema);

module.exports = Team;