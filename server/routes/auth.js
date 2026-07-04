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
      role_id,
    } = req.body;

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

        const hashedPassword = await bcrypt.hash(password, 10);

        // Split full name
        const names = full_name.trim().split(" ");

        const first_name = names[0];
        const last_name = names[names.length - 1];
        const middle_name =
          names.length > 2
            ? names.slice(1, names.length - 1).join(" ")
            : null;

        db.query(
          `INSERT INTO USER
          (first_name,middle_name,last_name,email,password,birthday,role_id)
          VALUES (?,?,?,?,?,?,?)`,
          [
            first_name,
            middle_name,
            last_name,
            email,
            hashedPassword,
            birthday,
            role_id,
          ],
          (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            }

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