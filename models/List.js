const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type : Array
    },
    created: {
        type: Date,
        default: Date.now
    },
    author: {
         type: mongoose.Schema.Types.ObjectId, ref: "User" 
    }
},{
    collection: "todos"
});

const List = mongoose.model("List", listSchema);

module.exports = List;