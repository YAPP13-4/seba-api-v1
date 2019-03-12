module.exports = (req, res, next) => {
  if (NODE_ENV !== "production") {
    req.user = {
      name: "seba0",
      email: "seba0@gmail.com"
    };
  }
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(301, FRONT_HOST + "/sign");
}