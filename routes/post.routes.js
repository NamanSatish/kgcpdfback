var express = require('express')
var router = express.Router()
const datastore = require('nedb')

// Mailgun
const api_key = 'key-7890c73c1175a01493f14b98535c6647';
const domain = 'mailgun.kgcinc.com';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

//var request = require("request"); // another api call library (supported by POSTMAN)

async function PromiseF(req) { // This Function will wait for whatever is inbetween before continuing
    return new Promise((resolve, reject) => {
        
        
        db.insert(req.body)    
        resolve();
    })
}

/* Insert a new post */
router.post('/', async (req, res) => { //This is the command being run when you post
/*   const data = {
    from: 'kgcforms@kgcinc.com',
    to: 'brian@thinkrelion.com',
    subject: 'Day Sheet',
    text: JSON.stringify(req.body)
  }; */
/*   mailgun.messages().send(data, function (error, body) {
    console.log(body);
  }); */
  await PromiseF(req)
    .then(post => res.status(201).json({
            Response: "Your message has been placed in the DB",
            message: 'If you are seeing these messages, contact Naman',
            message1:'If the following is empty,null,or err, contact Naman',
            YourPost: req.body
    }))
    .catch(err => res.status(500).json("Something has gone wrong" + err))

})

module.exports = router