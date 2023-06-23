const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Thoughts routes
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);

  module.exports = router;