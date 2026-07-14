const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Rooms of one floor

router.get("/:floorId",(req,res)=>{

    const { floorId } = req.params;

    const sql = `
        SELECT
            room_id,
            room_name,
            room_code,
            room_type,
            room_status
        FROM ROOM
        WHERE floor_id=?
        ORDER BY room_name
    `;

    db.query(sql,[floorId],(err,result)=>{

        if(err){

            return res.status(500).json({
                message:"Database error."
            });

        }

        res.json(result);

    });

});

router.get("/details/:roomId",(req,res)=>{

    const { roomId } = req.params;

    const sql = `
        SELECT *
        FROM ROOM
        WHERE room_id = ?
    `;

    db.query(sql,[roomId],(err,result)=>{

        if(err){

            return res.status(500).json({
                message:"Database error."
            });

        }

        res.json(result[0]);

    });

});

module.exports = router;
