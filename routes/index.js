var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});

router.post('/submit', function(req, res){
  let name = req.body.name
  let email = req.body.email
  let number = req.body.number
  fs.appendFile('data.txt', `name: ${name}, email: ${email}, number: ${number}\n`, function(e){
    if(e){
      console.log(e)
    }
  })
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ratedr.music.concert@gmail.com',
      pass: 'ABCDE12345@'
    }
  });
  var mailOptions = {
    from: 'ratedr.music.concert@gmail.com',
    to: req.body.email,
    subject: 'Successfully Tickets Booked!',
    text: 'Congratulations! You have successfully booked the tickets for the upcoming event!'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.render('success')
    }
  });
})

module.exports = router;