const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'An error while retrieving thoughts.' });
    }
  },

  async getThoughtById(req, res) {
    try {
      const { id } = req.params;
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ message: 'Cannot find thought with this ID.' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving thought with this ID.' });
    }
  },

  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ thoughtText, username });
      const user = await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id}}, { new: true }).populate('thoughts', '-email');
      res.status(201).json({ thought, user });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create a new thought.' });
    }
  },

  async updateThought(req, res) {
    try {
      const { id } = req.params;
      const { thoughtText } = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(id, { thoughtText }, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought cannot be found with this ID.' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update the thought with this ID.' });
    }
  },

  async deleteThought(req, res) {
    try {
      const { id } = req.params;
      const deletedThought = await Thought.findByIdAndRemove(id);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      // Remove thought from associated user's thoughts array
      await User.updateMany({}, { $pull: { thoughts: id } });
      res.json({ message: 'Thought deleted successfully.' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete the thought.' });
    }
  },

  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const reaction = { reactionBody, username };

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: reaction } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create a reaction.' });
    }
  },


  async deleteReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionId } = req.body;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete the reaction.' });
    }
  }
};