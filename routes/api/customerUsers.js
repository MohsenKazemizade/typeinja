const express = require('express');
const router = express.Router();
const { body, checkSchema, validationResult } = require('express-validator');

//makeing schema for mobile number regex looks like working like this
//and then using in in request
const schema = {
  phone: {
    in: 'body',
    matches: {
      options: [/^(\+98|0)?9\d{9}$/],
      errorMessage: 'invalid phone number',
    },
  },
};
//@route        Post api/custuser
//@desc         Register customerUser
//@access       Public
router.post(
  '/',
  [
    body('phone')
      .not()
      .isEmpty()
      .withMessage('phone is required')
      .isNumeric()
      .withMessage('phone can to contain letters')
      .isLength({ min: 11, max: 11 })
      .withMessage('phone need to have 11 charectors'),
    checkSchema(schema),
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 3 })
      .withMessage('name can not be less than 3 charactors'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email is invalid'),
    body('agreeWithRules')
      .isBoolean()
      .withMessage('not a boolean')
      .matches('true')
      .withMessage('Rules need to be true'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('customerUsers!');
  }
);
module.exports = router;
