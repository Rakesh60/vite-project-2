import express from "express";
import fetchUser from "./middleware/fetchUser.js";
import Notes from "../models/Notes.js";

const router = express.Router();
//*ROUTE 1: Get Att the Notes using: GET "/api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
//* Route2: Add new Notes using Post
router.post("/addnote", fetchUser, async (req, res) => {
  try {
    // data coming from (frontend)
    const { title, description, tag } = req.body;
    // VAlidation
    if (!title || !description || !tag) {
      return res.status(400).json({ error: "All Fields Are Required" });
    }

    const notes = await Notes({
      title,
      description,
      tag,
      user: req.userId,
    });

    //Saving notes
    const saveNote = await notes.save();
    res.json({ saveNote, success: "Note Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//*Route 3: For updating Notes
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  //Data coming From frontend
  const { title, description, tag } = req.body;
  const { id } = req.params;
  try {
    //find the to be Upadate it
    const note = await Notes.findById({ _id: id });
    //validation
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.userId) {
      return res.status(401).send("Not allowed");
    }
    console.log(note);
    //Note Update
    const notes = await Notes.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          description,
          tag,
        },
      },
      { new: true }
    );
    res.json({ notes, success: "Notes Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//*Route 4: For Deleting
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //Find note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//*Route5: Get Notes by id
router.get("/notes/:id", fetchUser, async (req, res) => {
  try {
    const { id } = req.params;

    const notes = await Notes.findById({ _id: id });
    console.log(notes);

    if (notes) {
      return res.status(200).json(notes);
    } else {
      return res.status(404).json({ success: "notes Not Found" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
