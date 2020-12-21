const express = require('express');
const router = express.Router();
const { body, checkSchema, validationResult } = require('express-validator');
const TypiestUser = require('../../models/TypiestUser');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
    body('agreewithrules')
      .isBoolean()
      .withMessage('not a boolean')
      .matches('true')
      .withMessage('Rules need to be true'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      phone,
      firstname,
      lastname,
      email,
      password,
      agreewithrules,
    } = req.body;
    try {
      //see if user exist
      let typiestUser = await TypiestUser.findOne({ phone });
      if (typiestUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exist' }] });
      }
      //get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      typiestUser = new TypiestUser({
        phone,
        firstname,
        lastname,
        email,
        avatar,
        password,
        agreewithrules,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);

      typiestUser.password = await bcrypt.hash(password, salt);

      await typiestUser.save();

      //return jsonwebtoken
      const payload = {
        typiestUser: {
          id: typiestUser.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);
module.exports = router;
