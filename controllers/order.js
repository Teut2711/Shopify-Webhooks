const express = require("express");
require('dotenv').config();


const axios = require('axios').default;

const { Order } = require('../models/order');

const router = express.Router();


router.post('/create', async (req, res) => {

    axios.post(`https://shopify.free.beeceptor.com`, req.body)

    const anOrder = new Order({ _id: req.body.id, ...req.body });
    anOrder.save((err, data) => {
        if (err) throw err;
    });
    res.send(req.body);

})




// router.delete('/delete', async (req, res) => {
//     try {
//         const anOrder = await Order.deleteById(req.body.id);
//         res.send(anOrder);
//     } catch (err) {
//         res.status(400).send(err);
//     }

// })
module.exports = router;
