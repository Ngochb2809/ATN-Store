var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'
const { Int32, ObjectId } = require('bson')

async function insertToy(newToy) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    let newId = await db.collection("toys").insertOne(newToy)
    return newId
}
async function updateToy(id, name, price, picture, year, quantity) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    await db.collection("toys").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "pictureURL": picture , "year" : year, "quantity" : quantity} })
}
async function getAllToys() {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    const results = await db.collection("toys").find().toArray()
    return results
}
async function deleteToysById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    await db.collection("toys").deleteOne({ _id: ObjectId(id) })
}
async function findToyById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    const toyToEdit = await db.collection("toys").findOne({ _id: ObjectId(id) })
    return toyToEdit
}
async function searchToyByName(name){
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1002")
    const results = await db.collection("toys").find({ name: new RegExp(name,'i') }).toArray()
    return results
}
module.exports = {insertToy, updateToy, getAllToys,deleteToysById,findToyById,searchToyByName}