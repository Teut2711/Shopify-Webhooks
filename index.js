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
    // if (shops[req.query.shop] === undefined) {
    //     res.redirect(`/auth/?shop=${req.query.shop}`);

    // }
    // else {
    //     res.send("Hello World");
    //     res.end();
    // }
   res.send("Hello World");
});


app.get("/auth", async (req, res) => {
    const isOnline = false;
    const link = "http://83bc-2401-4900-1c68-dbe1-6472-470-2bf2-ff35.ngrok.io/auth/callback"
    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        link,
        isOnline
    );

    res.redirect(authRoute);

})

app.post("/auth/callback", async (req, res) => {
    const shopSession = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query,
    )
    console.log("Getting token...")
    shops[shopSession.shop] = shopSession;
    res.redirect(`http://${shopSession.shop}/admin/apps/begin101`)
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
});


