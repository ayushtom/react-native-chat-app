const express = require("express");
const { getAllUsers } = require("../controllers/contacts");
const router = express.Router();


router.get("/all", async (req, res) => {
    try {
        const result = await getAllUsers()
        res.status(200).json(result);
    } catch (err) {
        console.log(err, err.status, err.message);
        res.status(err.status).json({
            error: err.message
        })
    }
})



module.exports = router;