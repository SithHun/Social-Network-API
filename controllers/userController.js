const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts', '-username -_id -createdAt').populate('friends', 'username');
      return res.json(users)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving all users.' })
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('thoughts').populate('friends', 'username');
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
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update the user with this ID.' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(400).json({ message: 'User not found with this ID.' });
      }
      // Remove user's associated thoughts if user is deleted
      await Thought.deleteMany({ username: deletedUser.username });
      // Remove user from friends' friend lists
      await User.updateMany({}, { $pull: { friends: id } });
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete the user.' });
    }
  },

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate('friends', 'username -_id');
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add a friend.' });
    }
  },

  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      res.json({ message: 'Friend has been successfully deleted!'})
    } catch (error) {
      res.status(400).json({ error: 'Failed to remove the friend.' });
    }
  },
};