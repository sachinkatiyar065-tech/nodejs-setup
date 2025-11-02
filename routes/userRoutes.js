const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// ✅ Create User API
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ message: 'User fetched successfully', users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // user id from URL
    const updateData = req.body; // new data from request body

    const updatedUser = await User.updateOne(
      { _id: id },            // find user by ID
      { $set: updateData }    // update fields
    );

    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // user ID from URL

    const deletedUser = await User.deleteOne({ _id: id });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // user ID from URL

    const deletedUser = await User.deleteOne({ _id: id });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
