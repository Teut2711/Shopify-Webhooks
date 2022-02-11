const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    _id:Number,
    "id": {
        "type": "Number"
    },
    "title": {
        "type": "String"
    },
    "body_html": {
        "type": "Mixed"
    },
    "vendor": {
        "type": "String"
    },
    "product_type": {
        "type": "String"
    },
    "created_at": {
        "type": "Mixed"
    },
    "handle": {
        "type": "String"
    },
    "updated_at": {
        "type": "Date"
    },
    "published_at": {
        "type": "Date"
    },
    "template_suffix": {
        "type": "Mixed"
    },
    "status": {
        "type": "String"
    },
    "published_scope": {
        "type": "String"
    },
    "tags": {
        "type": "String"
    },
    "admin_graphql_api_id": {
        "type": "String"
    },
    "variants": {
        "type": [
            "Mixed"
        ]
    },
    "options": {
        "type": [
            "Mixed"
        ]
    },
    "images": {
        "type": [
            "Mixed"
        ]
    },
    "image": {
        "type": "Mixed"
    }
});

const Product = mongoose.model("Product", schema);

module.exports = { Product };