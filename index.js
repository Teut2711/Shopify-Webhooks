const { Shopify } = require('@shopify/shopify-api');
const express = require('express');
const mongoose = require('mongoose');

const { OAuth } = require('./models/oAuth');

const jsonParser = require("body-parser").json()
require('dotenv').config();


const authRoutes = require('./controllers/oAuth');
const orderRoutes = require('./controllers/order');
const productRoutes = require('./controllers/product');



const app = express();

app.use(jsonParser)

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);


mongoose.connect(process.env.MONGODB_CONNECTION, {})



Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
    SCOPES: process.env.SHOPIFY_API_SCOPES,
    HOST_NAME: process.env.HOST,
    IS_EMBEDDED_APP: true,
    API_VERSION: "2022-01"
});

//const shops = JSON.parse(fs.readFileSync("shops.json", { encoding: "utf8" }));

app.get('/', async (req, res) => {
    try {
        let shopData = await OAuth.findById(req.query.shop);

        if (shopData) {
            res.send("Hello world");
        } else {
            throw new Error("Shop not found");
        }
    } catch (e) {
        res.redirect(`/auth/?shop=${req.query.shop}`);
    }
});



app.listen(process.env.PORT, () => {
    console.log(`Server running at https://${process.env.HOST}`)
});



module.exports = app