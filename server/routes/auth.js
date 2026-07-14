const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../config/db");


router.post("/register", async (req, res) => {
  try {
  const {
  full_name,
  email,
  password,
  birthday,
  id_number,
  role_id,
} = req.body;

    if (!full_name || !email || !password || !birthday || !role_id) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    db.query(
      "SELECT * FROM USER WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            message: "Email already exists.",
          });
        }

        try {
          // Encrypt password
          const hashedPassword = await bcrypt.hash(password, 10);

          db.query(
            `
            INSERT INTO USER
            (
              full_name,
              email,
              password,
              birthday,
              id_number,
              role_id
            )
            VALUES (?,?,?,?,?,?)
            `,
            [
              full_name,
              email,
              hashedPassword,
              birthday,
              id_number || null,
              role_id,
            ],
            (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.sqlMessage || err.message,
          error: err,
        });
      }

      console.log("INSERT RESULT:", result);

      return res.status(201).json({
        message: "Registration Successful!",
        insertId: result.insertId
      });
    }
          );
        } catch (error) {
          console.log(error);

          return res.status(500).json({
            message: "Server error.",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error.",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter your email and password.",
    });
  }

  db.query(
    `
    SELECT
      user_id,
      full_name,
      email,
      password,
      birthday,
      id_number,
      role_id
    FROM USER
    WHERE email = ?
    `,
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Database error.",
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }

      const user = result[0];

      const match = await bcrypt.compare(
        password,
        user.password
      );

      if (!match) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }

      // Generate JWT
      const token = jwt.sign(
        {
          user_id: user.user_id,
          role_id: user.role_id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      delete user.password;

      return res.json({
        message: "Login Successful!",
        token,
        user,
      });
    }
  );
});

module.exports = router;
