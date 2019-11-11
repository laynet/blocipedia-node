// #1
const User = require("./models").User;
const bcrypt = require("bcryptjs");

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
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  },
  upgrade(id, callback) {
    return User.findById(id)
      .then(user => {
        user.update({ role: "premium" });

        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  },
  downgrade(id, callback) {
    console.log("DOWNGRADE QUERY @@@@@@@@@@@@@@@@@@@", id);
    return User.findById(id)
      .then(user => {
        console.log("QUERY USER", user);
        user.update({ role: "standard" });
        callback(req.user.id, user);
      })
      .catch(err => {
        callback(err);
      });
  }
};
