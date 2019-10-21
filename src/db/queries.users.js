// #1
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  // #2
  createUser(newUser, callback) {
    // #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    // #4
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
      .then(user => {
        console.log("USER EMAIL : ", newUser.email);
        const msg = {
          to: newUser.email,

          from: "layneingramtaylor@gmail.com",
          subject: "Sending with Twilio SendGrid is Fun",
          text: "and easy to do anywhere, even with Node.js",
          html: "<strong>and easy to do anywhere, even with Node.js</strong>"
        };

        sgMail.send(msg);
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  }
};
