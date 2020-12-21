const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authCustomerUser');
const type = require('../../models/TypiestUser');

// @route       Get api/auth
// @decs        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await TypiestUser.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
