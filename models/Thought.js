const { Schema, model } = require("mongoose");
const reactionSchema = require('./schemas/reactions');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
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
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJson: {
      virtuals: true,
    },
    versionKey: false,
    id: false
  }
);

thoughtSchema.set('toObject', { getters: true }); // Enable getters when converting to a plain JavaScript object
thoughtSchema.set('toJSON', { getters: true }); // Enable getters when converting to JSON


// thoughtSchema.virtual('created').get(function (){
//     const options = { month: 'long', day: 'numeric', year: 'numeric' };
//     const createdAt = new Date(this.createdAt);
//     return this.createdAt.toLocaleDateString(undefined, options);
// })

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;