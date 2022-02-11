const mongoose = require('mongoose');



const schema = new mongoose.Schema({

    _id: Number,
    "id": {
        "type": "Number"
    },
    "admin_graphql_api_id": {
        "type": "String"
    },
    "app_id": {
        "type": "Number"
    },
    "browser_ip": {
        "type": "Mixed"
    },
    "buyer_accepts_marketing": {
        "type": "Boolean"
    },
    "cancel_reason": {
        "type": "Mixed"
    },
    "cancelled_at": {
        "type": "Mixed"
    },
    "cart_token": {
        "type": "Mixed"
    },
    "checkout_id": {
        "type": "Number"
    },
    "checkout_token": {
        "type": "String"
    },
    "client_details": {
        "accept_language": {
            "type": "Mixed"
        },
        "browser_height": {
            "type": "Mixed"
        },
        "browser_ip": {
            "type": "Mixed"
        },
        "browser_width": {
            "type": "Mixed"
        },
        "session_hash": {
            "type": "Mixed"
        },
        "user_agent": {
            "type": "Mixed"
        }
    },
    "closed_at": {
        "type": "Mixed"
    },
    "confirmed": {
        "type": "Boolean"
    },
    "contact_email": {
        "type": "Mixed"
    },
    "created_at": {
        "type": "Date"
    },
    "currency": {
        "type": "String"
    },
    "current_subtotal_price": {
        "type": "String"
    },
    "current_subtotal_price_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "current_total_discounts": {
        "type": "String"
    },
    "current_total_discounts_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "current_total_duties_set": {
        "type": "Mixed"
    },
    "current_total_price": {
        "type": "String"
    },
    "current_total_price_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "current_total_tax": {
        "type": "String"
    },
    "current_total_tax_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "customer_locale": {
        "type": "Mixed"
    },
    "device_id": {
        "type": "Mixed"
    },
    "discount_codes": {
        "type": "Array"
    },
    "email": {
        "type": "String"
    },
    "estimated_taxes": {
        "type": "Boolean"
    },
    "financial_status": {
        "type": "String"
    },
    "fulfillment_status": {
        "type": "Mixed"
    },
    "gateway": {
        "type": "String"
    },
    "landing_site": {
        "type": "Mixed"
    },
    "landing_site_ref": {
        "type": "Mixed"
    },
    "location_id": {
        "type": "Number"
    },
    "name": {
        "type": "String"
    },
    "note": {
        "type": "Mixed"
    },
    "note_attributes": {
        "type": "Array"
    },
    "number": {
        "type": "Number"
    },
    "order_number": {
        "type": "Number"
    },
    "order_status_url": {
        "type": "String"
    },
    "original_total_duties_set": {
        "type": "Mixed"
    },
    "payment_gateway_names": {
        "type": [
            "String"
        ]
    },
    "phone": {
        "type": "Mixed"
    },
    "presentment_currency": {
        "type": "String"
    },
    "processed_at": {
        "type": "Date"
    },
    "processing_method": {
        "type": "String"
    },
    "reference": {
        "type": "Mixed"
    },
    "referring_site": {
        "type": "Mixed"
    },
    "source_identifier": {
        "type": "Mixed"
    },
    "source_name": {
        "type": "String"
    },
    "source_url": {
        "type": "Mixed"
    },
    "subtotal_price": {
        "type": "String"
    },
    "subtotal_price_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "tags": {
        "type": "String"
    },
    "tax_lines": {
        "type": [
            "Mixed"
        ]
    },
    "taxes_included": {
        "type": "Boolean"
    },
    "test": {
        "type": "Boolean"
    },
    "token": {
        "type": "String"
    },
    "total_discounts": {
        "type": "String"
    },
    "total_discounts_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "total_line_items_price": {
        "type": "String"
    },
    "total_line_items_price_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "total_outstanding": {
        "type": "String"
    },
    "total_price": {
        "type": "String"
    },
    "total_price_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "total_price_usd": {
        "type": "String"
    },
    "total_shipping_price_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "total_tax": {
        "type": "String"
    },
    "total_tax_set": {
        "shop_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        },
        "presentment_money": {
            "amount": {
                "type": "String"
            },
            "currency_code": {
                "type": "String"
            }
        }
    },
    "total_tip_received": {
        "type": "String"
    },
    "total_weight": {
        "type": "Number"
    },
    "updated_at": {
        "type": "Date"
    },
    "user_id": {
        "type": "Number"
    },
    "discount_applications": {
        "type": "Array"
    },
    "fulfillments": {
        "type": "Array"
    },
    "line_items": {
        "type": [
            "Mixed"
        ]
    },
    "payment_terms": {
        "id": {
            "type": "Number"
        },
        "created_at": {
            "type": "Date"
        },
        "due_in_days": {
            "type": "Mixed"
        },
        "payment_schedules": {
            "type": [
                "Mixed"
            ]
        },
        "payment_terms_name": {
            "type": "String"
        },
        "payment_terms_type": {
            "type": "String"
        },
        "updated_at": {
            "type": "Date"
        }
    },
    "refunds": {
        "type": "Array"
    },
    "shipping_lines": {
        "type": "Array"
    }
});
const Order = mongoose.model("Order", schema);

module.exports = { Order };