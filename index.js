const { Shopify } = require('@shopify/shopify-api');
const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require("body-parser").json()
require('dotenv').config();


const authRoutes = require('./auth');
const { ShopOAuth } = require('./models');



const app = express();

app.use(jsonParser)


app.use("/auth", authRoutes);



mongoose.connect(process.env.MONGODB_CONNECTION, {})



Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
    SCOPES: process.env.SHOPIFY_API_SCOPES,
    HOST_NAME: process.env.HOST,
    IS_EMBEDDED_APP: true,
    API_VERSION: '2022-01'
});

//const shops = JSON.parse(fs.readFileSync("shops.json", { encoding: "utf8" }));

app.get('/', async (req, res) => {
    try {
        let shopData = await ShopOAuth.findById(req.query.shop);

        if (shopData) {
            res.send("Hello world");
        } else {
            throw new Error("Shop not found");
        }
    } catch (e) {
        res.redirect(`/auth/?shop=${req.query.shop}`);
    }
});


app.post('/orders/create', async (req, res) => {
    res.send(req.body);

})

app.listen(process.env.PORT, () => {
    console.log(`Server running at https://${process.env.HOST}`)
});


