const express = require('express');
const router = express.Router();
const { body, checkSchema, validationResult } = require('express-validator');

const schema = {
  phone: {
    in: 'body',
    matches: {
      options: [/^(\+98|0)?9\d{9}$/],
      errorMessage: 'invalid phone number',
    },
  },
  password: {
    in: 'body',
    matches: {
      options: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/],
      errorMessage: 'password must contain letters and number in english',
    },
  },
};
//@route        Post api/typiestUsers
//@desc         Register typiestUser
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
      .withMessage('phone need to have 11 charectors')
      .withMessage('not a mobile phone valid number'),
    body('firstname')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 3 })
      .withMessage('name can not be less than 3 charactors'),
    body('lastname')
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
    body('password')
      .not()
      .isEmpty()
      .withMessage('password is required')
      .isLength({ min: 8, max: 33 })
      .withMessage('password needs to have at least 8 charactors'),
    checkSchema(schema),
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

    res.send('typiestUser!');
  }
);
module.exports = router;
