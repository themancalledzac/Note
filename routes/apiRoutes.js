// load data
const fs = require('fs');
const notes = require("../db/db.json");
const path = require("path");
const dbURL = path.resolve(__dirname, "../db/db.json");
const { v4: uuidv4 } =require('uuid');
// uuidv4();

// routing
module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
        // console.log(notes);
        fs.readFile(dbURL, 'utf8', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            // console.log(notes);
            return res.json(notes);
        })
    });

    app.post("/api/notes", function(req, res) {
        
        const newNote = req.body;
        const randomId = new uuidv4();
        // console.log(newNote);
        // const note = JSON.parse(notes);

        fs.readFile(dbURL, 'utf8', (err, data) => {
            if (err) throw err;
            let note = JSON.parse(data);
            newNote.id = randomId
            note.push(newNote);
            // console.log(note);

            let updatedArray = JSON.stringify(note);
            // console.log(updatedArray);

            fs.writeFile(dbURL, (updatedArray), (err) => {
                if (err) throw err;
                else {
                    console.log("New Note Added");
                    return res.json(updatedArray);
                }
            });
        });
    });

    // app.delete("/api/notes/:id", (req, res) => {

    //     if(req.query.uniqueID)
    //     //read
    //     // get copy
    //     // loop through, get id
    //     // delete
    //     // resave fs.save
    //     // send back

    // });

    // app.post("/api/clear", function(req, res) {
    //     notes.length = 0;

    //     res.json({ ok: true });
    // });


};