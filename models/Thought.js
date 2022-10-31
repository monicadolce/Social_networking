const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
// Add individual properties and their types
// Setting required to true will disallow null values
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
