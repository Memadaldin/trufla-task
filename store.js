const fs = require("fs");

const myObj = {
    key: "value"
};

function main(arg){
    switch(arg[0]) {
        case "list":  {
            fs.readFile('data.json', function(err, data) {
                console.log(JSON.parse(data))
            });
        }
        break;
        case "get":  {
            fs.readFile('data.json', function(err, data) {
                const jsonData = JSON.parse(data);
                const myKey = arg[1];
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
                if (arg[1] && arg[2]) {
                    newData[arg[1]] = arg[2];
                    fs.writeFile('data.json', JSON.stringify(newData), function (err) {
                        if (err) throw err;
                        console.log('Replaced!');
                    }); 
                } else {
                    console.log("Please enter two args")
                }
            });                   
        }
        break;
        case "remove":  {
            let jsonData;
            let myKey = arg[1];
            fs.readFile('data.json', function(err, data) {
                jsonData = JSON.parse(data);
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
// console.log("funck you , node!")
