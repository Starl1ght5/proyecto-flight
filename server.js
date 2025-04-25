require('dotenv').config();

const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require('node-fetch');
const port = process.env.PORT || 15046;
const cors = require('cors');

router.use(bodyParser.json());
router.use(cors());


router.post("/start-checkout-session", async (req, res) => {
    try {
        const tickets = req.body.items_brought;
        if (!tickets || !tickets.length) {
            return res.status(400).json({ error: "No items provided" });
        }

        console.log(`Initializing payment request for booking ${tickets[0].bookingID}`);

        const lineItems = tickets.map(ticket => ({
            price_data: {
                currency: "COP",
                product_data: {
                    name: "Boleto de avión",
                    metadata: {
                        booking_id: ticket.bookingID
                    }
                },
                unit_amount: parseInt(ticket.totalPrice.amount + "00")
            },
            quantity: ticket.ticketCount
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.PAYMENT_URL}/confirm-payment?bookingID=${tickets[0].bookingID}`,
            cancel_url: `${process.env.PAYMENT_URL}/cancel-payment?bookingID=${tickets[0].bookingID}`,
            client_reference_id: tickets[0].bookingID,
            metadata: {
                booking_id: tickets[0].bookingID
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/confirm-payment", async (req, res) => {
    try {
        const booking_id = req.query.bookingID;

        if (!booking_id) {
            console.error("Missing bookingID in confirm-payment");
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?reason=missing_id`);
        }

        console.log(`Confirming payment for booking ${booking_id}`);

        const response = await fetch(`${process.env.BACKEND_URL}/booking/confirm?id=${booking_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Failed to confirm booking ${booking_id}:`, errorData);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?reason=confirmation_failed`);
        }

        console.log(`Payment completed successfully for booking ${booking_id}`);
        res.redirect(`${process.env.FRONTEND_URL}/payment-confirm?bookingID=${booking_id}`);
    } catch (error) {
        console.error("Error in confirm-payment:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment-error?reason=server_error`);
    }
});


router.get("/cancel-payment", async (req, res) => {
    try {
        const booking_id = req.query.bookingID;
        if (!booking_id) {
            console.error("Missing bookingID in cancel-payment");
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?reason=missing_id`);
        }

        console.log(`Canceling payment for booking ${booking_id}`);

        const response = await fetch(`${process.env.BACKEND_URL}/booking/cancel?id=${booking_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Failed to cancel booking ${booking_id}:`, errorData);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-error?reason=cancel_failed`);
        }

        console.log(`Payment canceled for booking ${booking_id}`);
        res.redirect(`${process.env.FRONTEND_URL}/payment-canceled?bookingID=${booking_id}`);
    } catch (error) {
        console.error("Error in cancel-payment:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment-error?reason=server_error`);
    }
});


router.post('/stripe-webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const booking_id = session.client_reference_id || session.metadata?.booking_id;

        if (!booking_id) {
            console.error('No booking ID found in Stripe session');
            return res.status(400).json({ received: false, error: 'No booking ID' });
        }

        try {
            console.log(`Processing successful payment for booking ${booking_id}`);
            
            const response = await fetch(`${process.env.BACKEND_URL}/booking/confirm?id=${booking_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Backend responded with status ${response.status}`);
            }

            console.log(`Booking ${booking_id} confirmed successfully via webhook`);
        } catch (error) {
            console.error(`Error confirming booking ${booking_id} via webhook:`, error);
        }
    }

    res.json({ received: true });
});

module.exports = router;