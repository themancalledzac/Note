// DEPENDENCIES
// Includes the path package to get the correct file path for our html
var path = require("path");



// routing

module.exports = function(app) {

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
      });
    
      app.get("/about", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"));
      });
    
      // If no matching route is found default to home
      app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });
};