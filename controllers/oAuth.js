const { Shopify } = require('@shopify/shopify-api');
const express = require("express");
require('dotenv').config();

const { OAuth } = require('../models/oAuth');

const router = express.Router();


const WEBHOOK_TOPICS = ["products/create", "orders/create"];

function getWebhookDefinition(topic) {
    return {
        path: '/webhooks',
        data: {
            "webhook": {
                topic,
                "address": `https://${process.env.HOST}/${topic}`,
                "format": "json"
            }
        },
        type: "application/json",
    }
}

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


        // Alternate implementions

        // shops[shopSession.shop] = shopSession;

        //or
        // fs.writeFileSync("shops.json", JSON.stringify(shops));
        //or (current)
        const oAuthData = new OAuth({ _id: shopSession.shop, ...shopSession })
        oAuthData.save((err, data) => {
            if (err) throw err;
        });

        // registering webhooks after auth is best
        const client = new Shopify.Clients.Rest(req.query.shop, shopSession.accessToken);

        for (let topic of WEBHOOK_TOPICS) {
            await client.post(getWebhookDefinition(topic));
        }
        // register to app
        res.redirect(`https://${shopSession.shop}/admin/apps/begin101`);
    }
)


module.exports = router