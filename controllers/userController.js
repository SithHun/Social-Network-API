const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving all users.' })
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found with that ID.' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving user with this ID.' })
    }
  },

  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const userdbData = await User.create({ username, email });
      res.json(userdbData)
    } catch (error) {
      res.status(400).json({ error: 'Failed to create new user. Please provide email and username.' })
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update the user with this ID.' });
    }
  },

  async deleteUser(req, res) {
    try {
      // Code for deleting a user
    } catch (error) {
      // Error handling
    }
  },

  async addFriend(req, res) {
    try {
      // Code for adding a friend
    } catch (error) {
      // Error handling
    }
  },

  async removeFriend(req, res) {
    try {
      // Code for removing a friend
    } catch (error) {
      // Error handling
    }
  },
};