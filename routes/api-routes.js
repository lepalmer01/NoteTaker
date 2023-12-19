const router = require('express').Router();
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');


// API route to get notes from the db.json file
router.get('/api/notes', (req, res) => {
    fs.readFile("db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

// API route to add a new note to the db.json file
router.post('/api/notes', (req, res) => {

    const notesDb = JSON.parse(fs.readFileSync("db/db.json"));
    const newNote = req.body;
    newNote.id = uuidv4(); // Use uuid to generate a unique ID for the note
    notesDb.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(notesDb), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(notesDb);
        }
    });

});

//DELETE requests
router.delete("/api/notes/:id", (req, res) => {
    const notesDb = JSON.parse(fs.readFileSync("db/db.json"));
    const removeNote = notesDb.filter((note) => note.id !== req.params.id);
    fs.writeFileSync("db/db.json", JSON.stringify(removeNote))
    res.json(removeNote)
})


module.exports = router