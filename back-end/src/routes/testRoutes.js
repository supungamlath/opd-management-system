const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    console.log("Welcome Endpoint Accessible");
    res.send("Welcome to Kernel Panic, gammac neh!");
})

module.exports = router;