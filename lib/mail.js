var nodemailer = require('nodemailer');
var config = require('../config');
var generator = require('xoauth2').createXOAuth2Generator(config.gmail);

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

module.exports = {
  sendIssueCreated: function(data, callback) {
    var ticketLink = config.redmineUrl + '/issues/' + data.redmineIssueId;

    var mailOptions = {
        from: 'Parkinghero ✔ <' + config.gmailUser + '>', // sender address 
        to: data.userEmail, // list of receivers 
        subject: 'Вітаємо! Ваша заявка прийнята ✔', // Subject line 
        text: 'Ви можете слідкувати за статусом її виконання тут: ' + ticketLink, // plaintext body 
        html: 'Ви можете слідкувати за статусом її виконання тут: ' + ticketLink // html body 
    };
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            callback(error);
        }else{
            console.log('Message sent: ' + info.response);
            callback(null, info);
        }
        transporter.close();
    });
  }
}
