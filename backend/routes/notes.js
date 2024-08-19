const express = require("express");
const router = express.Router();
const {query,body,matchedData,validationResult} = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
//Route1:Get all the notes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ errors: "Internal server" });
  }
});
//Route2:
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Description must consist of atleast 5 characaters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ errors: "Internal server" });
    }
  }
);



//Route 3:update note
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  try {
    const{title,description,tag}=req.body;
  const newNotes = {};
  if(title){newNotes.title = title};
  if(description){newNotes.description = description};
  if(tag){newNotes.tag = tag};

  //find the note to be updated
  let note =await Notes.findById(req.params.id)
   if(!note){res.status(404).send("Not found")}
  if(note.user.toString() !== req.user.id)
  {
    return res.status(401).send("Not allowed")
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNotes},{new:true})
  res.json({note})
  } catch (error) {
    console.error(error.message);
      res.status(400).json({ errors: "Internal server" });
  }
  
})



//Route 4: Delete note
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  try {
    const{title,description,tag}=req.body;

  //find the note to be deleted
  let note =await Notes.findById(req.params.id)
   if(!note){res.status(404).send("Not found")}
  
  //Allow deletin only if user owns the note
   if(note.user.toString() !== req.user.id)
  {
    return res.status(401).send("Not allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({"Success" :"note has been deleted"})
  } catch (error) {
    console.error(error.message);
      res.status(400).json({ errors: "Internal server" });
  }
  
})
module.exports = router;
