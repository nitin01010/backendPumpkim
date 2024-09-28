const express = require("express");
const UserStorage = require("../models/users");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/users", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserStorage({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserStorage.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Store cookie (for example, a session ID)
        res.cookie('sessionId', 'your-session-id', { httpOnly: true, sameSite: 'Lax' }); // Adjust cookie options as needed

        res.status(200).json({ message: "Login successful", redirect: "/dashboard" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
