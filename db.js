const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;
let database;
// console.log("out")
async function getdatabase() {
    // console.log("in")

    const client =await MongoClient.connect('mongodb://localhost:27017');
    database =  client.db('library');
    if (!database){
        console.log("database not connected")
    } 
    // console.log(database);
    console.log("database is connected");
    
    return database;
}

module.exports = {getdatabase, ObjectID}
