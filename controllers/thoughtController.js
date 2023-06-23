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
        res.status(404).json({ message: 'Cannot find thought with this ID.' });
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
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id }});
      res.status(201).json(thought);
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
      // Code for creating a reaction
    } catch (error) {
      // Error handling
    }
  },

  async deleteReaction(req, res) {
    try {
      // Code for deleting a reaction
    } catch (error) {
      // Error handling
    }
  },
};