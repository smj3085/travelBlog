const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePlace,
  deletePlace,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, savePlace);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/places/:place_id').delete(authMiddleware, deletePlace);

module.exports = router;
