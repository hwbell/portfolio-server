var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'harry.email.router@gmail.com',
    pass: process.env.gPass
  }
})

/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log('Handling post request')
  console.log(`Request Body: ${req.body.contact}`);

  var mailOptions = {
    from: 'harry.email.router@gmail.com',
    to: 'harold.william.bell@gmail.com',
    subject: `New Contact: ${req.body.name}`,
    text: `Hi, my name is ${req.body.name}. ${req.body.message} My email is ${req.body.email}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      console.log(`New Contact: ${req.body.name}`);
      console.log(`Message: ${req.body.message}`);
      console.log(`Email: ${req.body.email}`)
    }
  })

  let message = {
    body: 'Thank you for your information!'
  }
  res.json(message);
});

module.exports = router;
