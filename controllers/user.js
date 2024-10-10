const User = require("../models/user.js");

// RenderSignUp
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

// SignUp
module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to StayEasy");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// RenderLogin
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to StayEasy!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/listings");
  });
};