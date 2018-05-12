const fs = require("fs");

const myObj = {
    key: "value"
};

function main(arg){
    //feel free to list, get by key name, delete and clear :D
    switch(arg[0]) {
        //listing
        case "list":  {
            fs.readFile('data.json', function(err, data) {
                console.log(JSON.parse(data))
            });
        }
        break;
        case "get":  {
            //get value by key name
            fs.readFile('data.json', function(err, data) {
                const jsonData = JSON.parse(data); 
                const myKey = arg[1];
                //check if the key doesn't exist
                if(jsonData[myKey] == undefined){
                    console.log("key does not exist in the list")
                } else {
                    console.log(jsonData[myKey])
                }                  
            });
        }
        break;
        case "add": {
            let newData;
            fs.readFile('data.json', function(err, data) {
                newData = JSON.parse(data);
                //check that the two arguments (key & value) are passed, 
                //or else key will be deleted if arg[2] was undefined
                if (arg[1] && arg[2]) {
                    newData[arg[1]] = arg[2];
                    fs.writeFile('data.json', JSON.stringify(newData), function (err) {
                        if (err) throw err;
                        console.log('Replaced!');
                    }); 
                } else {
                    console.log("Please enter key and value!")
                }
            });                   
        }
        break;
        case "remove":  {
            let jsonData;
            let myKey = arg[1];
            fs.readFile('data.json', function(err, data) {
                jsonData = JSON.parse(data);
                //check if key does not exist
                if(jsonData[myKey] == undefined){
                    console.log ("key does not exist in the list")
                }
                else{
                    delete jsonData[myKey];
                    fs.writeFile('data.json', JSON.stringify(jsonData), function (err) {
                        if (err) throw err;
                        console.log('Deleted!');
                        console.log(jsonData);
                    }); 
                }                    
            });
        }
        break;
        case "clear":  {
            let jsonData;
            fs.readFile('data.json', function(err, data) {
                jsonData = JSON.parse(data);
                jsonData = {};
                fs.writeFile('data.json', JSON.stringify(jsonData), function (err) {
                    if (err) throw err;
                    console.log('Cleared!');
                    console.log(jsonData);
                }); 
                    
            });
        }
        break;
        default: {
            return null
        }
    }
};

main(process.argv.slice(2))

