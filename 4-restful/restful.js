//importing dependencies
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
//this is creating a file path to pets.json file using .join() method. Need ".." because the file is one directory up
const petsPath = path.join(__dirname, "..", "pets.json");

//set up the port
  const PORT = 3000;

//   sets up route that listens for get request to /pets endpoint
app.get('/pets', (req, res) => {
    //read our pets.json file, petsJSON will hold the contents of our pets.json file
    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        if(err) {
            //err.stack shows execution path that led to the error
            console.error(err.stack);
            //.status will set the HTTP status code of the response to 500
            //.json is a method provided by Express.js for sending a JSON response. It automatically sets the "Content-Type" header to "application/json"
            //{error: "Internal Server Error"} is a JavaScript object that contains the error message. This object will be converted to a JSON string before being sent in the response.
            //You are creating a JSON object with a single property "error" and setting it's value to the string "Internal Server Error"
            res.status(500).json({error: "Internal Server Error"})
            return;
        }
        //if there are no errors, parse the JSON content in petsJSON to a javascript object
        //we need to use JSON.parse because our petsJSON is a string more specifically a JSON string.
        //to work with this data petsJSON we need to convert it to a JavaScript object
        //once it is parsed the object can be manipulated and accessed 
        const pets = JSON.parse(petsJSON)
        //sends pets data as a JSON response
res.send(pets)
    });
});

app.get("/pets/:index", (req, res) => {
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
app.use(express.json());

app.post("/pets", (req, res) => {
    var body = req.body;
    
    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        if(err) {
            console.log(err.stack);
            res.status(500).json({error: "Internal Server Error"});
            return;
        }
         const pets = JSON.parse(petsJSON) 
          pets.push(body)
     
          fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
        if(err) {
            console.log(err.stack);
            res.status(500).json({error: "Internal Server Error"});
            return;
        }
        res.status(200).type("application/json").send(body)
    })
        })

   
})

app.patch("/pets/:index", (req, res) => {
    var body = req.body;
    const index = parseInt(req.params.index);
    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        if(err) {
            console.log(err.stack);
            res.status(500).json({error: "Internal Server Error"})
            return;
        }
        var pets = JSON.parse(petsJSON);
        pets[index] = {
            ...pets[index],
            ...body
        }
        fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
        // LEFT OFF HERE
            if(err) {
                console.log(err.stack);
                res.status(500).json({error: "Internal Server Error"});
                return;
            }
            
            res.status(200).type("application/json").send(pets[index])
    })
})
})

app.delete("/pets/:index", (req, res) => {
    const index = parseInt(req.params.index);
    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        if(err) {
            console.log(err.stack);
            res.status(500).json({error: "Internal Server Error"});
            return;
        }
         pets.splice(index,1);
        const pets = JSON.parse(petsJSON)
       
        fs.writeFile(petsPath, (JSON.stringify(pets)), (err) => {
            if(err) {
                console.log(err.stack);
                res.status(500).json({error: "Internal Server Error"});
                return;
            }
           
           res.send(pets)
           console.log(pets)
        })
    })
})







//telling express to listen on port 3000 for incoming requests, run the callback function when the server is up and running
app.listen(3000, function() {
    console.log("server is running")
})


