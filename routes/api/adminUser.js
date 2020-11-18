const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//@route        Post api/Admin
//@desc
//@access       Public
router.post(
  '/',
  [
    body('username')
      .not()
      .isEmpty()
      .withMessage('username is required')
      .isLength({ min: 11, max: 11 })
      .withMessage('username need to have 11 charectors'),
    body('password')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 3 })
      .withMessage('password can not be less than 3 charactors'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('adminUser!');
  }
);
module.exports = router;
