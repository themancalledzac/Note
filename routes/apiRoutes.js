// load data
const noteData = "../data/db.json";


// routing

module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
        false.readFile()
    })

    app.post("/api/notes", function(req, res) {
        
        let newNote = req.body;
        noteData.push(newNote);
        res.json(true);

    });

    app.post("/api/clear", function(req, res) {
        noteData.length = 0;

        res.json({ ok: true });
    });


};