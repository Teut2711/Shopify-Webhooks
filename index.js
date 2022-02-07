const express = require('express');
const { Shopify } = require('@shopify/shopify-api');
require('dotenv').config();


Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
    SCOPES: process.env.SHOPIFY_API_SCOPES,
    HOST_NAME: process.env.HOST,
    IS_EMBEDDED_APP: true,
});

const shops = {};

const host = process.env.HOST;

const app = express();

app.get('/', async (req, res) => {

    if (shops[req.query.shop] === undefined) {
        res.redirect(`/auth/?shop=${req.query.shop}`);
    }
    else {
        res.status(201).send("Hello World");
    }
});


app.get("/auth", async (req, res) => {

    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/callback",
        false);

    res.redirect(authRoute);

})

app.post("/auth/callback", async (req, res) => {
    const shopSession = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query,
    )
    shops[shopSession.shop] = shopSession;
    res.redirect(`http://${shopSession.shop}/admin/apps/begin101`)
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
});


