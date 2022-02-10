const { Shopify } = require('@shopify/shopify-api');
const express = require("express");
require('dotenv').config();

const { ShopOAuth } = require('./models');

const router = express.Router();


router.get("/", async (req, res) => {

    const isOnline = false;
    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/callback",
        isOnline
    );

    res.redirect(authRoute);

})

router.get("/callback",
    async (req, res) => {
        const shopSession = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query
        );

        // shops[shopSession.shop] = shopSession;

        // fs.writeFileSync("shops.json", JSON.stringify(shops));

        const oAuthData = new ShopOAuth({ _id: shopSession.shop, ...shopSession })
        oAuthData.save((err, data) => {
            if (err) throw err;
        });

        // registering webhooks after auth is best
        const client = new Shopify.Clients.Rest(req.query.shop, shopSession.accessToken);

        const data = await client.post({
            path: '/webhooks',
            data: {
                "webhook": {
                    "topic": "orders/create",
                    "address": `https://${process.env.HOST}/orders/create`,
                    "format": "json"
                }
            },
            type: "application/json",
        });

        // register to app
        res.redirect(`https://${shopSession.shop}/admin/apps/begin101`);
    }
)


module.exports = router