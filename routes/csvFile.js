const express = require("express");
const router = express.Router();
const LocationStore = require("../models/locationShema");

router.post("/locations/upload", async (req, res) => {
    if (!Array.isArray(req.body) || req.body === 0) {
        return res.status(400).json({ error: "Invalid data format. Please send an array of locations." });
    }
    try {
        await LocationStore.insertMany(req.body);
        res.status(201).json({ message: "Locations uploaded and stored successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to store locations." });
    }
});

// GET route to retrieve locations
router.get("/locations/upload", async (req, res) => {
    try {
        const locations = await LocationStore.find(); // Fetch all locations
        res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve locations." });
    }
});

module.exports = router;