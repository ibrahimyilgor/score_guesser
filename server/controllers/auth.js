import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
/*REGISTER USER*/

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exists." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentails." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE PASSWORD */

export const updatePassword = async (req, res) => {
  try {
    const { _id, password } = req.body;

    if (_id.toString() === "6543dae7ca5aac09bf7d560c") {
      res.status(500).json({ error: "test account cannot be changed" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    await User.updateOne({ _id: _id }, { $set: { password: passwordHash } });
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* FORGOT PASSWORD */

export const forgotPassword = async (req, res) => {
  try {
    // Extract the user's email address from the request body or parameters
    const { email, lang } = req.body;

    if (email === "test@test.test") {
      res.status(500).json({});
    }

    // Generate a reset token and expiration time
    const token = jwt.sign({ name: email }, process.env.JWT_SECRET_RESET_PW, {
      expiresIn: "1h",
    });

    // Save the reset token and expiration time in your database associated with the user's account
    // const user = await User.findOne({ email });
    // if (!user) {
    //   res.status(500).json({ error: "no user found" });
    //   return;
    // } else {
    //   // Check if a user_id in ResetPassword already exists
    //   const existingResetPassword = await ResetPassword.findOne({
    //     user_id: user._id,
    //   });

    //   if (existingResetPassword) {
    //     // Update the existing document
    //     existingResetPassword.token = token;
    //     await existingResetPassword.save();
    //   } else {
    //     // Create a new ResetPassword
    //     const newResetPassword = new ResetPassword({
    //       user_id: user._id,
    //       email,
    //       token,
    //     });

    //     // Save the new ResetPassword to the database
    //     await newResetPassword.save();
    //   }
    // }

    const message = {
      tr: `<p>Şifrenizi yenilemek istediniz. Lütfen bu linkten şifre yenileme işlemine devam edin: <a href="${process.env.FRONTEND_URL}/auth/change-password?token=${token}">Şifre Yenile</a></p>`,
      en: `<p>You requested to reset your password. Please click the following link to reset your password: <a href="${process.env.FRONTEND_URL}/auth/change-password?token=${token}">Reset Password</a></p>`,
    };

    const subject = {
      tr: `Şifre Yenileme`,
      en: `Password Reset`,
    };

    // Create a transporter to send the email (assuming you have SMTP server details)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "scandeliciousapp@gmail.com",
        pass: "ozrknxuidstbejvc",
      },
    });

    // Prepare the email content
    const mailOptions = {
      from: "scandeliciousapp@gmail.com",
      to: email,
      subject: subject[lang ?? "en"],
      html: message[lang ?? "en"], // You can also provide an HTML version of the email using the 'html' property
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // Handle the error and send an appropriate response to the client
      } else {
        // Handle the successful email sending and send a response to the client
      }
    });

    // Send a response to the client indicating that the email is being sent
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CHANGE PASSWORD */

export const changePassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (token.name === "test@test.test") {
      res.status(500).json({ error: "test account cannot be changed" });
    }

    await User.updateOne(
      { email: token.name },
      { $set: { password: passwordHash } }
    );
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
