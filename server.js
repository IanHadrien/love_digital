import "dotenv/config";
import cors from "cors";
import express from "express";
import Stripe from "stripe";

const app = express();
app.use(cors());
app.use(express.json());

const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-01-28.clover",
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body ?? {};

    const lineItems =
      Array.isArray(cart) && cart.length > 0
        ? cart.map((item) => ({
            price_data: {
              currency: "brl",
              product_data: { name: item.name ?? "Produto" },
              unit_amount: Math.round((item.price ?? 0) * 100),
            },
            quantity: item.qty ?? 1,
          }))
        : [
            {
              price_data: {
                currency: "brl",
                product_data: { name: "Plano Love Digital" },
                unit_amount: 1990,
              },
              quantity: 1,
            },
          ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "custom",
      payment_method_types: ["card", "boleto"],
      line_items: lineItems,
      return_url: "http://localhost:5173/pagamento",
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
