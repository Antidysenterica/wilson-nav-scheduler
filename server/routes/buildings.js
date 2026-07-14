const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all buildings
router.get("/", (req, res) => {

    const sql = `
        SELECT
            building_id,
            building_name
        FROM BUILDING
        ORDER BY building_name
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);

            return res.status(500).json({
                message: "Database error."
            });
        }

        res.json(result);
    });

});

module.exports = router;
