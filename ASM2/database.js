const {ObjectId,MongoClient} = require('mongodb');
//const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://asm1644:nam2652001@cluster0.vqr6y.mongodb.net/test';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("ASM2-1644");
    return dbo;
}

async function insertProduct(newProduct) {
    const dbo = await getDB();
    await dbo.collection("sproduct").insertOne(newProduct);
}

async function updateProduct(id, nameInput, priceInput, brandInput, pictureInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput, price: priceInput, brand: brandInput, picture: pictureInput } };

    const dbo = await getDB ();
    await dbo.collection("sproduct").updateOne(filter, newValue);
}
async function getProductById(id) {
    const dbo = await getDB();
    const s = await dbo.collection("sproduct").findOne({ _id: ObjectId(id) });
    return s;
}
async function deleteProduct(id) {
    const dbo = await getDB();
    await dbo.collection("sproduct").deleteOne({ "_id": ObjectId(id) });
}
module.exports = {getDB,insertProduct,updateProduct,getProductById,deleteProduct}
