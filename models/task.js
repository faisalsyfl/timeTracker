var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    name : String,
    start_date : String,
    end_date : String,
    start_time : String,
    end_time : String,
    durations : Number,
    project : String
});

module.exports = mongoose.model('tasks',taskSchema);