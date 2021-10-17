const express = require("express");
const router = express.Router();
const {
    registerUser, loginUser,
} = require("../controllers/users");

router.post("/register", async (req, res) => {
    try {
        console.log(req.body)
        const {
            email, password, firstName, lastName, contactNumber
        } = req.body;

        if (!(email && password && firstName && lastName)) {
            return res.status(400).json({
                error: "All fields are compulsory"
            })
        }

        const result = await registerUser({
            email, password, firstName, lastName, contactNumber
        })

        res.status(200).json(result);
    } catch (err) {
        console.log(err, err.status, err.message);
        res.status(err.status).json({
            error: err.message
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const {
            email, password
        } = req.body;

        const result = await loginUser(email, password);
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(err.status).json({
            error: err.message
        })
    }
})



module.exports = router;