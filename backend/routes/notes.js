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

//! Route 3
// Update an existing Note using PUT: "/api/notes/updatenote". Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it.
    let note = await Notes.findById(req.params.id);
    // if note not found
    if (!note) {
      return res.status(404).send("No Record Found");
    }
    // Allow updation only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(`error is: ${error.message}`);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

//! Route 4
// Delete an existing Note using DELETE: "/api/notes/deletenote". Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be deleted and delete it.
    let note = await Notes.findById(req.params.id);
    // if note not found
    if (!note) {
      return res.status(404).send("No Record Found");
    }
    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }
    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({message:"Deletion Success",note: note});
  } catch (error) {
    console.log(`error is: ${error.message}`);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
