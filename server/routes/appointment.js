const express = require("express");
const router = express.Router();

const db = require("../config/db");

const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");


// ========================================
// SCHEDULE APPOINTMENT
// Guest / College / Graduate
// ========================================
router.post(
  "/",
  authenticateToken,
  authorizeRoles(1, 2, 3),
  (req, res) => {

    const {
      purpose,
      contact_details,
      slot_id,
    } = req.body;

    if (!purpose || !slot_id) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    // Check if slot exists
    db.query(
      "SELECT * FROM APPOINTMENT_SLOT WHERE slot_id = ?",
      [slot_id],
      (err, slotResult) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (slotResult.length === 0) {
          return res.status(404).json({
            message: "Appointment slot not found.",
          });
        }

        if (slotResult[0].is_booked) {
          return res.status(400).json({
            message: "This appointment slot is already booked.",
          });
        }

        // Create appointment
        db.query(
          `
          INSERT INTO APPOINTMENT
          (
            purpose,
            contact_details,
            requester_id,
            slot_id
          )
          VALUES (?,?,?,?)
          `,
          [
            purpose,
            contact_details || null,
            req.user.user_id,
            slot_id,
          ],
          (err) => {

            if (err) {
              console.log(err);

              return res.status(500).json({
                message: "Failed to schedule appointment.",
              });
            }

            // Mark slot as booked
            db.query(
              `
              UPDATE APPOINTMENT_SLOT
              SET is_booked = TRUE
              WHERE slot_id = ?
              `,
              [slot_id]
            );

            return res.status(201).json({
              message: "Appointment scheduled successfully.",
            });

          }
        );

      }
    );

  }
);


// ========================================
// VIEW APPOINTMENTS
// ========================================
router.get(
  "/",
  authenticateToken,
  (req, res) => {

    let sql = "";
    let values = [];

    // Faculty / Staff / Admin
    if (
      req.user.role_id === 4 ||
      req.user.role_id === 5 ||
      req.user.role_id === 6
    ) {

      sql = `
      SELECT
        appointment_id,
        purpose,
        contact_details,
        status,
        created_at,
        requester_id,
        slot_id
      FROM APPOINTMENT
      ORDER BY created_at DESC
      `;

    }

    // Guest / Student
    else {

      sql = `
      SELECT
        appointment_id,
        purpose,
        contact_details,
        status,
        created_at,
        requester_id,
        slot_id
      FROM APPOINTMENT
      WHERE requester_id = ?
      ORDER BY created_at DESC
      `;

      values.push(req.user.user_id);

    }

    db.query(
      sql,
      values,
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        return res.json(result);

      }
    );

  }
);

router.put(
  "/:id/approve",
  authenticateToken,
  authorizeRoles(4, 5, 6),
  (req, res) => {

    db.query(
      `
      UPDATE APPOINTMENT
      SET status = 'APPROVED'
      WHERE appointment_id = ?
      `,
      [req.params.id],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "Appointment not found.",
          });
        }

        return res.json({
          message: "Appointment approved successfully.",
        });

      }
    );

  }
);

router.put(
  "/:id/reject",
  authenticateToken,
  authorizeRoles(4, 5, 6),
  (req, res) => {

    db.query(
      `
      SELECT slot_id
      FROM APPOINTMENT
      WHERE appointment_id = ?
      `,
      [req.params.id],
      (err, appointment) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (appointment.length === 0) {
          return res.status(404).json({
            message: "Appointment not found.",
          });
        }

        const slotId = appointment[0].slot_id;

        db.query(
          `
          UPDATE APPOINTMENT
          SET status = 'REJECTED'
          WHERE appointment_id = ?
          `,
          [req.params.id],
          (err) => {

            if (err) {
              console.log(err);

              return res.status(500).json({
                message: "Database error.",
              });
            }

            db.query(
              `
              UPDATE APPOINTMENT_SLOT
              SET is_booked = FALSE
              WHERE slot_id = ?
              `,
              [slotId]
            );

            return res.json({
              message: "Appointment rejected successfully.",
            });

          }
        );

      }
    );

  }
);

router.put(
  "/:id/complete",
  authenticateToken,
  authorizeRoles(4, 5, 6),
  (req, res) => {

    db.query(
      `
      UPDATE APPOINTMENT
      SET status = 'COMPLETED'
      WHERE appointment_id = ?
      `,
      [req.params.id],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "Appointment not found.",
          });
        }

        return res.json({
          message: "Appointment marked as completed.",
        });

      }
    );

  }
);

module.exports = router;