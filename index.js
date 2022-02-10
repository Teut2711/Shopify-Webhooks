const { Shopify } = require('@shopify/shopify-api');
const express = require('express');
const mongoose = require('mongoose');

const { OAuth } = require('./models/oAuth');
const { Order } = require('./models/order');

const axios = require('axios').default;

const jsonParser = require("body-parser").json()
require('dotenv').config();


const authRoutes = require('./controllers/auth');



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
        let shopData = await OAuth.findById(req.query.shop);
        console.log("Shopdata", shopData)

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

    console.log("I m orderssssss")
    axios.post(`https://shopify.free.beeceptor.com`, req.body)

    const anOrder = new Order({ _id: req.body.id, webhookType: "ORDERS_CREATE", ...req.body });
    anOrder.save((err, data) => {
        if (err) throw err;
    });
    res.send(req.body);

})

app.listen(process.env.PORT, () => {
    console.log(`Server running at https://${process.env.HOST}`)
});


