//importing dependencies
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
//this is creating a file path to pets.json file using .join() method. Need ".." because the file is one directory up
const petsPath = path.join(__dirname, "..", "pets.json");

//set up the port
  const PORT = 3000;

  //sets up route that listens for get request to /pets endpoint
app.get('/pets', (req, res) => {
    //read our pets.json file, petsJSON will hold the contents of our pets.json file
    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        if(err) {
            //err.stack shows execution path that led to the error
            console.error(err.stack);
            res.status(500).json({error: "Internal Server Error"})
            return;
        }
        //if there are no errors parse the JSON content in petsJSON to a javascript object
        //we need to use JSON.parse because our petsJSON is a string more specifically a JSON string.
        //to work with this data petsJSON we need to convert it to a JavaScript object
        //once it is parsed the object can be manipulated and accessed 
        const pets = JSON.parse(petsJSON)
        //sends pets data as a JSON response
res.send(pets)
    });
});

app.get("/pets/:index", (req,res) => {
    //this will get the value of index from the URL and convert it to a integer
    const index = parseInt(req.params.index)

    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        //if an error occurs while trying to read the file set the response status to 500 and send a JSON response 
        //indicating the error
        if(err) {
            console.error(err.stack);
            res.status(500).json({error: "Internal Server Error"});
            return;
        }
// if no error occurs parse the petsJSON data into a javascript object 
        const pets = JSON.parse(petsJSON);
        //check if the index is valid
        if(index < 0 || index >= pets.length || isNaN(index)) {
            //if index isn't valid then set response status to 404 and send to the use "Not Found"
            res.status(404).send("Not Found")
            return;
        }
        //if the index passes the checks then send a response to the user with pets at the specified index 
        res.send(pets[index])
    })
})




//telling express to listen on port 3000 for incoming requests, run the callback function when the server is up and running
app.listen(3000, function() {
    console.log("server is running")
})