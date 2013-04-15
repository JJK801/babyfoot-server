var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GoalPrototype = {
    Player:      { type: Schema.Types.ObjectId, ref: 'Player' },
    Match:       { type: Schema.Types.ObjectId, ref: 'Match' },
    time:        { type: Date, default: Date.now },
    timestamps:  {
        deleted: { type: Date, default: null }
    }
}

var GoalSchema = Schema(GoalPrototype);
    
var Goal       = mongoose.model('Goal', GoalSchema);

module.exports = Goal;