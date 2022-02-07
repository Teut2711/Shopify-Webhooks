const express = require('express');
const { Shopify } = require('@shopify/shopify-api');
require('dotenv').config();

const shops = {};

const app = express();

app.get('/', async (req, res) => {


    if (shops[req.query.shop] === undefined) {
        console.log(req.query.shop);
        const auth_url = `https://${req.query.shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.API_KEY}&scope=${process.env.SCOPES}&redirect_uri=${"/auth/callback"}&state=${"myapp"}&grant_options[]=${"per-user"}`
        res.redirect(auth_url);

    }
    else {
        res.send("Hello World");
        res.end();
    }

});



app.post("/auth/callback", async (req, res) => {
    shops[shopSession.shop] = shopSession;
    console.log("Hiiiiiiii" , shopSession.shop);
    res.redirect(`http://${shopSession.shop}/admin`)
})
const host = process.env.HOST;
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
});


