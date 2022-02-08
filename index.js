const { Shopify } = require('@shopify/shopify-api');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const host = process.env.HOST;

const app = express();

const webhooks = [
    {
        path: "/app/uninstalled",
        topic: "APP_UNINSTALLED",
        webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
    },
    {
        path: "/checkouts/create",
        topic: "CHECKOUTS_CREATE",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic);
        }
    },
    {
        path: "/carts/create",
        topic: "CARTS_CREATE",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic);
        }
    },
    {
        path: "/orders/cancelled",
        topic: "ORDERS_CANCELLED",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic);
        }
    },
    {
        path: "/orders/create",
        topic: "ORDERS_CREATE",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic);
        }
    },
    {
        path: "/products/create",
        topic: "PRODUCTS_CREATE",
        webhookHandler: async (topic, shop, body) =>
            console.log(topic)
    }
];


Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
    SCOPES: process.env.SHOPIFY_API_SCOPES,
    HOST_NAME: process.env.HOST,
    IS_EMBEDDED_APP: true,
    API_VERSION: '2022-01'
});

const shops = JSON.parse(fs.readFileSync("shops.json", { encoding: "utf8" }));

app.get('/', async (req, res) => {
    if (shops[req.query.shop] === undefined) {
        res.redirect(`/auth/?shop=${req.query.shop}`);
    }
    else {
        try {

            const client = new Shopify.Clients.Rest(req.query.shop, shops[req.query.shop].accessToken);
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
            console.log(data);


            // for (let webhook of webhooks) {

            //     let response = await Shopify.Webhooks.Registry.register({
            //         shop: req.query.shop,
            //         accessToken: shops[req.query.shop].accessToken,
            //         ...webhook
            //     });

            //     if (!response.success) {
            //         console.log(
            //             `Failed to register ${responseType} webhook: ${response.result}`
            //         );
            //     }
            // }

        } catch (e) {
            console.log(e)
        }

    }
});


app.get("/auth", async (req, res) => {

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

app.get("/auth/callback", async (req, res) => {
    try {
        const shopSession = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query,
        );

        shops[shopSession.shop] = shopSession;

        fs.writeFileSync("shops.json", JSON.stringify(shops));

        res.redirect(`https://${shopSession.shop}/admin/apps/begin101`);
    }
    catch (e) {
        console.log(e);
    }
})



app.get('/orders/create', async (req, res) => {
    console.log(req);
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at https://${host}:${port}`)
});

