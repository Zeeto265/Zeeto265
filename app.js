const express = require('express')
const app = express()

const { insertProduct, updateProduct, getProductById, deleteProduct
    , getDB} = require('./database');

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const dbo = await getDB();
    const allProduct = await dbo.collection("sproduct").find({}).toArray();
    res.render('index', { data: allProduct })
})

app.use(express.static('public'))

app.get('/edit', async (req, res) => {
    const id = req.query.id;

    const s = await getProductById(id);
    res.render("edit", { product: s });
})
app.post('/update', async (req, res) => {
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const brandInput = req.body.txtBrand;
    const pictureInput = req.body.txtPicture;
    const id = req.body.txtId;

    updateProduct(id, nameInput, priceInput, brandInput, pictureInput);
    res.redirect("/");
})

app.get('/insert', (req,res) =>{
    res.render("insert");
})

app.post('/insertProduct',async(req,res)=>{
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const brandInput = req.body.txtBrand;
    const pictureInput = req.body.txtPicture;
    
    var err = {}
    var isError = false;
    if(nameInput == null || nameInput.length <5){
        err.name = "Length name must >=5 world!"
        isError = true;
    }
    if(!isNaN(priceInput) || priceInput == null){
        err.price = "Price must be number!"
        isError = true;
    }
    if(isError){
        res.render('insert',{error: err})
    }
    if(!isError){
        const newProduct = {name:nameInput,price:priceInput,brand:brandInput,picture:pictureInput};
        insertProduct(newProduct)
        res.redirect("/");
    }     
})

app.get('/delete', async (req, res) => {
    const id = req.query.id;

    await deleteProduct(id);
    res.redirect("/");
})

const PORT = process.env.PORT || 4001;
app.listen(PORT)
console.log("app is running ", PORT)