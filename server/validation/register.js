const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Convert empty fields to an empty string so we can use Validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  //Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is empty";
  }

  //Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is empty";
  }

  //Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  //Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is empty";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is empty";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
