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
        success_url: `${process.env.FRONTEND_URL}/payment-confirm?id=${tickets.booking_id}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-denied?id=${tickets.booking_id}`
    });

    res.json({id: session.id})

})


router.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });