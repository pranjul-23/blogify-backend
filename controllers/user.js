const User = require("../models/user");

async function handleUserSignup(req, res) {
  try {
    const { fullName, email, password, profileImage } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      profileImage,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const token = await User.matchPasswordAndGenrateToken(email, password);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful.",
        data: null,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

async function handleUserLogout(req, res) {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Logout successful.",
        data: null,
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  getCurrentUser,
  handleUserLogout,
};
