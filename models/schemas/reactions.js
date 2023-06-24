const { Schema } = require('mongoose');

const reactionSchema = new Schema (
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(createdAt).toLocaleDateString(undefined, options);
            return formattedDate;
        }
    },
},
{
    id: false
}
);

reactionSchema.set('toObject', { getters: true }); // Enable getters when converting to a plain JavaScript object
reactionSchema.set('toJSON', { getters: true }); // Enable getters when converting to JSON

module.exports = reactionSchema;