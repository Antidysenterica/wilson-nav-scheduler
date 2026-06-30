const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../config/db");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      birthday,
      school_id,
      role_id,
    } = req.body;

    // Check if email already exists
    db.query(
      "SELECT * FROM USER WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          `INSERT INTO USER
          (full_name,email,password,birthday,school_id,role_id)
          VALUES (?,?,?,?,?,?)`,
          [
            full_name,
            email,
            hashedPassword,
            birthday,
            school_id,
            role_id,
          ],
          (err) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
              message: "Registration Successful!",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;