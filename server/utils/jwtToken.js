//creat and save token and save in cookie
const sendToken = (user, statusCode, res) => {
  //create jwt token
  const token = user.getJwtToken();

  //cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    token,
    options,
    user,
  });
};

module.exports = sendToken;
