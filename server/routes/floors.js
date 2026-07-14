const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Floors of one building

router.get("/:buildingId", (req,res)=>{

    const { buildingId } = req.params;

    const sql = `
        SELECT
            floor_id,
            floor_number,
            floor_name
        FROM FLOOR
        WHERE building_id = ?
        ORDER BY floor_number
    `;

    db.query(sql,[buildingId],(err,result)=>{

        if(err){

            return res.status(500).json({
                message:"Database error."
            });

        }

        res.json(result);

    });

});

module.exports = router;
