import express from "express";
import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

const router = express.Router();

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.send({
        message: `${existingUser.name} already exists`,
        success: false,
        data: null,
      });
    }

    // Add fav_food validation here
    if (!req.body.fav_food) {
      return res.send({
        message: "Favourite food is required",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const hashedFavFood = await bcrypt.hash(
      req.body.fav_food.toLowerCase(),
      10,
    );

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      fav_food: hashedFavFood,
      provider: "local",
    });

    await newUser.save();

    res.send({
      message: "User Created Successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
// ================= NORMAL LOGIN =================

router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({
      email: req.body.email,
    });

    if (!userExists) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    // Check if user registered with Google
    if (userExists.provider === "google" || !userExists.password) {
      return res.send({
        message: "You registered with Google. Please login with Google.",
        success: false,
        data: null,
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password,
    );

    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign(
      {
        userId: userExists._id,
      },
      process.env.jwt_secret,
      {
        expiresIn: "1d",
      },
    );

    res.send({
      message: `Welcome ${userExists.name}`,
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// ================= GOOGLE LOGIN =================

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,

      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;

    const name = payload.name;

    const googleId = payload.sub;

    let user = await User.findOne({
      email,
    });

    // create new google user

    if (!user) {
      user = new User({
        name: name,

        email: email,

        googleId: googleId,

        provider: "google",

        password: null,
      });

      await user.save();
    }

    const jwtToken = jwt.sign(
      {
        userId: user._id,
      },

      process.env.jwt_secret,

      {
        expiresIn: "1d",
      },
    );

    res.send({
      message: "Google Login Successful",

      success: true,

      data: jwtToken,
    });
  } catch (error) {
    console.log(error);

    res.send({
      message: error.message,

      success: false,

      data: null,
    });
  }
});

// ================= GET USER BY ID =================

router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select(
      "-password -_id -email -createdAt -updatedAt -__v",
    );

    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// ================= RESET PASSWORD =================

router.post("/reset-password", async (req, res) => {
  try {
    const { email, fav_food, newPassword } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    // Check if user signed in with Google
    if (user.provider === "google") {
      return res.send({
        message:
          "This account uses Google login. Please reset your password through Google.",
        success: false,
        data: null,
      });
    }

    // Check favourite food answer
    const isFavFoodCorrect = await bcrypt.compare(
      fav_food.toLowerCase(),
      user.fav_food,
    );

    if (!isFavFoodCorrect) {
      return res.send({
        message: "Favourite food answer is incorrect",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    res.send({
      message: "Password reset successful",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// ================= CONTACT FORM =================

// router.post("/contact", async (req, res) => {
//   try {
//     const { name, email, mobile, msg } = req.body;

//     if (!name || !email || !mobile || !msg) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//         data: null,
//       });
//     }

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.GMAIL_USER,
//       to: process.env.GMAIL_USER,
//       replyTo: email,
//       subject: "New Contact Form Inquiry",

//       text: `
// New Contact Form Inquiry

// Name: ${name}
// Email: ${email}
// Mobile: ${mobile}

// Message:
// ${msg}
//       `,

//       html: `
//         <h2>New Contact Form Inquiry</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Mobile:</strong> ${mobile}</p>
//         <h3>Message:</h3>
//         <p>${msg.replace(/\n/g, "<br>")}</p>
//       `,
//     });

//     return res.status(200).json({
//       message: "Message sent successfully!",
//       success: true,
//       data: null,
//     });
//   } catch (error) {
//     console.error("Contact form error:", error);

//     return res.status(500).json({
//       message: error.message,
//       success: false,
//       data: null,
//     });
//   }
// });

router.post("/contact", async (req, res) => {
  try {
    const { name, email, mobile, msg } = req.body;

    if (!name || !email || !mobile || !msg) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        data: null,
      });
    }

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: "New Contact Form Inquiry",

      html: `
    <h2>New Contact Form Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <h3>Message:</h3>
    <p>${msg.replace(/\n/g, "<br>")}</p>
  `,
    });

    console.log("Resend result:", result);

    if (result.error) {
      return res.status(500).json({
        message: result.error.message || "Failed to send email",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Message sent successfully!",
      success: true,
      data: null,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      message: error.message || "Failed to send email",
      success: false,
      data: null,
    });
  }
});
export default router;
