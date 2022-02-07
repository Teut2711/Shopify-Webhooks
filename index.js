const express = require('express');
const { Shopify } = require('@shopify/shopify-api');
require('dotenv').config();



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

    // const authRoute = await Shopify.Auth.beginAuth(
    //     req,
    //     res,
    //     req.query.shop,
    //     "/auth/callback",
    //     false);

    const authRoute = `https://${req.query.shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPES}&redirect_uri=${"/auth/callback"}&state=${"nonce"}&grant_options[]=${"per-user"}`;
    console.log(authRoute);
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


