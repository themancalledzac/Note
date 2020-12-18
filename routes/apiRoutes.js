// load data
const fs = require('fs');
const notes = "./data/db.json";
const path = require("path");


// routing

module.exports = function(app) {


    app.get('/api/notes', function(req, res, notes) {
        fs.readFile(notes, 'utf8', (err, data) => {
            if (err) throw err;
            let note = JSON.parse(data);
            // console.log(note);
            return res.json(notes);
        })
    });

    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;
        // console.log(newNote);
        // const note = JSON.parse(notes);

        fs.readFile(notes, (err, data) => {
            if (err) throw err;
            let note = JSON.parse(data);
            note.push(newNote);
            console.log(note);

            let updatedArray = JSON.stringify(note);
            console.log(updatedArray);

            fs.writeFile(notes, (updatedArray), (err) => {
                if (err) throw err;
                else {
                    return res.json(updatedArray);
                    // console.log("New Note Added");
                }
            });
        });
    });

    // app.post("/api/clear", function(req, res) {
    //     notes.length = 0;

    //     res.json({ ok: true });
    // });


};