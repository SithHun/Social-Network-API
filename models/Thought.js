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
    id: false,
  }
);

thoughtSchema.virtual('timeStamp').get(function (){
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return this.createdAt.toLocaleDateString(undefined, options);
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;