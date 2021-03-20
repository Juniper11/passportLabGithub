const userModel = require("../models/userModel").userModel;

//returns user from database, creates database entry for new users
const getUserByGitHubIdOrCreate(profile) {
  let user = userModel.findOne(profile);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  else {
    user = {
      id: id.user,
      name: name.user
    }
    //add user to database for new user
    database.push(user)
    return user;
  }
}

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate
};
