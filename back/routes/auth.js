var express = require('express');
const router = express.Router();
const Auth = require('../model/auth');


router.get('/', function (req, res, next) {
  res.json(req.session.user);
});


router.post('/signup', async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const uid = await Auth.create(username, password);
    res.status(201).json({ success: 'true', uid: uid });
  } catch (err) {
    next(err);
  }
});


router.post('/login', async function (req, res, next) {
  req.session.regenerate(function (err) {
    if (err) {
      next(err)
    }
    const username = req.body.username;
    const password = req.body.password;
    Auth.verify(username, password).then(
      uid => {
        req.session.user = { id: uid };

        req.session.save(function (err) {
          if (err) {
            return next(err)
          }
          res.json(req.session.user);
        }
        );
      }).catch(err => next(err));
  })
});


router.post('/logout', function (req, res, next) {
  req.session.user = null
  req.session.save(function (err) {
    if (err) {
      next(err)
    }
    req.session.regenerate(function (err) {
      if (err) {
        next(err)
      }
      res.json({ msg: 'logout succeeded' });
    })
  })
})

module.exports = router;
