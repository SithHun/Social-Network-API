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
}
);

// reactionSchema.virtual('timestamp').get(function(){
//     const options = { month: 'long', day: 'numeric', year: 'numeric' }
//     return this.createdAt.toLocaleDateString(undefined, options);
// });

module.exports = reactionSchema;