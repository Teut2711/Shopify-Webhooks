const express = require("express");
require('dotenv').config();

const { Product } = require('../models/product');
const axios = require('axios').default;


const router = express.Router();


router.post('/create', async (req, res) => {

    axios.post(`https://shopify.free.beeceptor.com`, req.body)

    const aProduct = new Product({ _id: req.body.id, ...req.body });
    aProduct.save((err, data) => {
        if (err) throw err;
    });
    res.send(req.body);

})


// router.delete('/delete', async (req, res) => {

//     axios.post(`https://shopify.free.beeceptor.com`, req.body)

//     const aProduct = await Product.deleteById(req.body.id);
//     aProduct.save((err, data) => {
//         if (err) throw err;
//     });
//     res.send(req.body);

// })

module.exports = router;