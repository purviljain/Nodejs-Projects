const express = require('express');
const router = express.Router();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '548796',
  key: '93b9c4a854cc8f2d61e0',
  secret: '8c94136027cbb21313a8',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req, res) => {
    res.send("Poll");
})

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
      });

      res.json({
          success: true,
          message: "Thanks for voting!"
      });
})

module.exports = router;