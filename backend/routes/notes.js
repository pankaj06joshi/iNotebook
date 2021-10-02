const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//! Route 1
// fetch all notes from loggedin user using GET: "/api/notes/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.log(`error is: ${error.message}`);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

//! Route 2
// Add a new Note using POST: "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there is validation error , return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // add new note in database
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(`error is: ${error.message}`);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

module.exports = router;
