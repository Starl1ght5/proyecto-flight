require('dotenv').config();

const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = express()
const port = 5000;
const cors = require('cors');


router.use(cors());
router.use(express.json());
router.post("/start-checkout-session", async(req, res) => {

    const tickets = req.body.items_brought;

    console.log(`Initializing payment request`)
    const lineItems = tickets.map( ticket => ({
        price_data: {
            currency: "COP",
            product_data: {
                name: "Boleto de avion"
            },
            unit_amount: parseInt(ticket.totalPrice.amount + "00")
        },

        quantity: ticket.ticketCount
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `https://stripe-server-sev6.onrender.com/confirm-payment?bookingID=${tickets[0].bookingID}`,
        cancel_url: `https://stripe-server-sev6.onrender.com/cancel-payment?bookingID=${tickets[0].bookingID}`

    });

    res.json({id: session.id})
});



router.get("/confirm-payment", async (req, res) => {

    const booking_id = req.query.bookingID;

    const response = await fetch(`${process.env.BACKEND_URL}booking/confirm?id=${booking_id}`, {
       method: 'PATCH'  
    });

    if (response.status === 200) {
        console.log(`Payment completed! id:${booking_id}`)
        res.redirect(`${process.env.FRONTEND_URL}payment-confirm`)

    }

})


router.get("/cancel-payment", async (req, res) => {

    const booking_id = req.query.bookingID;

    const response = await fetch(`${process.env.BACKEND_URL}booking/cancel?id=${booking_id}`, {
       method: 'PATCH'  
    });

    if (response.status === 200) {
        console.log(`Payment intent canceled! id:${booking_id}`)
        res.redirect(`${process.env.FRONTEND_URL}payment-canceled`)
    }

});



router.listen(port, () => {

    console.log(`Payment server started!`);
});