var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupPrototype = {
    Team:        { type: Schema.Types.ObjectId, ref: 'Team' },
    Players:     [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    Matchs:      [{ type: Schema.Types.ObjectId, ref: 'Match' }],
    timestamps:  {
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        deleted: { type: Date, default: null }
    }
}

var LineupSchema = Schema(LineupPrototype);
    
var Lineup       = mongoose.model('Lineup', LineupSchema);

module.exports = Lineup;