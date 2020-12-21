const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authCustomerUser');
const CustomerUser = require('../../models/CustomerUser');

// @route       Get api/auth
// @decs        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await CustomerUser.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
