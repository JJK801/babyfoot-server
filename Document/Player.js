var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerPrototype = {
    name: {
        first: String,
        last:  String
    },
    birth:     Date,
    photo:     String,
    Teams:     [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    timestamps: {
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        deleted: { type: Date, default: null }
    }
}

var PlayerSchema = Schema(PlayerPrototype);
    PlayerSchema.virtual('age').get(function () {
        var curDate = new Date();
        var age = curDate.getYear() - this.birth.getYear();
        
        if (curDate.getMonth() < this.birth.getMonth()) {
            age -= 1;
        } else if (curDate.getMonth() == this.birth.getMonth()) {
            if (curDate.getDay() < this.birth.getDay()) {
                age -= 1;
            }
        }
        
        return age;
    });
    PlayerSchema.virtual('name.full').get(function () {
        return this.name.first + ' ' + this.name.last;
    });
    
var Player       = mongoose.model('Player', PlayerSchema);

module.exports = Player;