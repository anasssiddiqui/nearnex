const messages = {
  success: {
    forgetPassword: "Email has been sent with password reset link",
    otpVerifed: "Otp verified sucessfully",
    ResetPassword: "Password has been reset",
    logout: "Logout Successfully",
    changePassword: "Password has been changed successfully.",
    defaultMessage: "Saved successfully",
    defaultDeleteMessage: "Deleted successfully",
    signup: "User Registered Successfully",
    login: "User login successfully",
    logout: "User logout successfully",
    getMyProfile: "Profile retrieved successfully",
    CreatePost: "Post created successfully"
  },
  error: {
    default: "Oops! something went wrong",
    inavalidEmail: "Email not found. Please try again or sign up for a new account.",
    emailAlreadyExist: "This email is already registered with us",
    usernameAlreadyExist: "This username is already registered with us",
    invalidPassword: "Invalid password"
  },
  status: {
    validation: "Unprocessable Entity",
    authorization: "Unauthorized",
    internalServerError: "Internal Server Error",
    badRequest: "Bad Request",
  },
};

module.exports = messages;
