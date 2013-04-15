var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
function LineupRuleset(v)
{
    // 0..2 rule
    
    if (this.Lineups.length == 2) {
        throw new Error("Can't assign more than 2 lineup");
    }
}

var MatchPrototype = {
    Goals:     [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
    Lineups:   [{ type: Schema.Types.ObjectId, ref: 'Lineup', set: LineupRuleset }],
    timestamps:  {
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        deleted: { type: Date, default: null }
    }
}

var MatchSchema = Schema(MatchPrototype);
    
var Match       = mongoose.model('Match', MatchSchema);

module.exports = Match;