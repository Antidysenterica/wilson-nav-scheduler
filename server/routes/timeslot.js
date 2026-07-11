const express = require("express");
const router = express.Router();

const db = require("../config/db");

const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

router.get(
  "/:scheduleId",
  authenticateToken,
  (req, res) => {

    db.query(
      `
      SELECT
        slot_id,
        start_time,
        end_time,
        is_booked,
        schedule_id
      FROM APPOINTMENT_SLOT
      WHERE schedule_id = ?
      ORDER BY start_time
      `,
      [req.params.scheduleId],
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

router.post(
  "/",
  authenticateToken,
  authorizeRoles(4, 5, 6),
  (req, res) => {

    const {
      start_time,
      end_time,
      schedule_id,
    } = req.body;

    if (
      !start_time ||
      !end_time ||
      !schedule_id
    ) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    db.query(
      `
      INSERT INTO APPOINTMENT_SLOT
      (
        start_time,
        end_time,
        schedule_id
      )
      VALUES (?,?,?)
      `,
      [
        start_time,
        end_time,
        schedule_id,
      ],
      (err) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Failed to create time slot.",
          });
        }

        return res.status(201).json({
          message: "Time slot created successfully.",
        });

      }
    );

  }
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(4, 5, 6),
  (req, res) => {

    const {
      start_time,
      end_time,
    } = req.body;

    if (!start_time || !end_time) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    db.query(
      `
      SELECT *
      FROM APPOINTMENT_SLOT
      WHERE slot_id = ?
      `,
      [req.params.id],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            message: "Time slot not found.",
          });
        }

        if (result[0].is_booked) {
          return res.status(400).json({
            message: "Cannot edit a booked time slot.",
          });
        }

        db.query(
          `
          UPDATE APPOINTMENT_SLOT
          SET
            start_time = ?,
            end_time = ?
          WHERE slot_id = ?
          `,
          [
            start_time,
            end_time,
            req.params.id,
          ],
          (err) => {

            if (err) {
              console.log(err);

              return res.status(500).json({
                message: "Failed to update time slot.",
              });
            }

            return res.json({
              message: "Time slot updated successfully.",
            });

          }
        );

      }
    );

  }
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(4, 5, 6),
  (req, res) => {

    db.query(
      `
      SELECT *
      FROM APPOINTMENT_SLOT
      WHERE slot_id = ?
      `,
      [req.params.id],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database error.",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            message: "Time slot not found.",
          });
        }

        if (result[0].is_booked) {
          return res.status(400).json({
            message: "Cannot delete a booked time slot.",
          });
        }

        db.query(
          `
          DELETE FROM APPOINTMENT_SLOT
          WHERE slot_id = ?
          `,
          [req.params.id],
          (err) => {

            if (err) {
              console.log(err);

              return res.status(500).json({
                message: "Failed to delete time slot.",
              });
            }

            return res.json({
              message: "Time slot deleted successfully.",
            });

          }
        );

      }
    );

  }
);

module.exports = router;