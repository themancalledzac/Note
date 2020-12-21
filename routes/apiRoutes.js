// load data
const fs = require('fs');
const notes = require("../db/db.json");
const path = require("path");
const dbURL = path.resolve(__dirname, "../db/db.json");
const { v4: uuidv4 } =require('uuid');
uuidv4();

// routing
module.exports = function(app) {

    app.get('/api/notes', function(req, res) {

        fs.readFile(dbURL, 'utf8', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            return res.json(notes);
        });
    });

    app.post("/api/notes", function(req, res) {
        
        const newNote = req.body;
        const randomId = uuidv4();

        fs.readFile(dbURL, 'utf8', (err, data) => {
            if (err) throw err;
            const note = JSON.parse(data);
            newNote.id = randomId;
            note.push(newNote);

            let updatedArray = JSON.stringify(note);

            fs.writeFile(dbURL, (updatedArray), (err) => {
                if (err) throw err;
                else {
                    console.log("New Note Added");
                    return res.json(updatedArray);
                }
            });
        });
    });
  
    app.delete("/api/notes/:id", (req, res) => {

        const checkId = req.params.id;
        
        fs.readFile(dbURL, 'utf8', (err, data) => {
            if(err) throw err;
            const note = JSON.parse(data);
            console.log(note);
            const notes = note.filter(({id}) => id != checkId);
            
            let updatedArray = JSON.stringify(notes);
            fs.writeFile(dbURL, (updatedArray), (err) => {
                if (err) throw err;
                return res.json(true)
            });
        });
    });
};


// =============================================================
// Someday will try and split these up into ddifferent functions
// =============================================================

// readFile = (notes) => {
//     notes = fs.readFile(dbURL, 'utf8', (err, data) => {
//         if (err) throw err;
//         notes.push(newNote);
//     });
//     return
// };

// writeFile = (notes) => {
//     fs.writeFile(dbURL, (updatedArray), (err) => {
//         if (err) throw err;
//         else {
//             return res.json(updatedArray);
//         };
//     });
// };