const fs = require('fs');
const command = process.argv[2];
const age = parseInt(process.argv[3],10)
const kind = process.argv[4];
const name = process.argv[5];
const pet = {age, kind, name}
//change the index into a number
function displayError() {
    console.error('Usage: node fs.js [read | create | update | destroy]');
    process.exit(1);
}
function readPets(index) {
    try {
        const petData = fs.readFileSync('../pets.json');
      let pets = parseData(petData)
        if (isNaN(index)) {
            console.log(pets);
        } else if (index >= 0 && index < pets.length) {
            console.log(pets[index]);
        } else {
            console.error('Invalid index');
            process.exit(1);
        }
        } catch (error) {
        throw error
    }
}

function createPets(pet) {
    const petData = fs.readFileSync('../pets.json');
    let pets = parseData(petData)
    pets.push(pet)
   fs.writeFileSync('../pets.json', JSON.stringify(pets))
    // console.log(pets)
    // console.log("updated object")
    
}
createPets()

function parseData(data) {
    return JSON.parse(data)
}



if (!command) {
    displayError()
}
if (command === 'read') {
   readPets(age)
}
if(command === "create") {
    if(process.argv.length < 6) {
        console.error("Usage: node fs.js create AGE KIND NAME")
        process.exit(1)    
    }
    createPets(pet)
}
