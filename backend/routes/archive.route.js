const express = require("express")
const router = express.Router();
const Archive = require("../models/archive.model.js")
const {getArchive, getArchives, createArchive, updateArchive, deleteArchive, getSingle} = require('../Controllers/archive.controller.js')

router.get("/:id/:topic/:label", getSingle);
router.get("/", getArchives);
router.get("/:id", getArchive);
router.post("/", createArchive);
// router.put("/:id", updateArchive);
router.put("/:id/:topic/:label", updateArchive);
router.delete("/:id/:topic/:label", deleteArchive);

module.exports = router;