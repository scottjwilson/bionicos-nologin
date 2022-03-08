const stripe = require("stripe")(`${process.env.NEXT_PRIVATE_STRIPE_KEY}`);

const calculateOrderAmount = (cart, coupon) => {
  let total = 0;
  let discountedTotal = 0;
  let newTotal = 0;
  let plusTax = 1.1025;
  cart.map((value) => {
    let itemTotal = value.item.price;
    value.modifications?.forEach((modification) => {
      itemTotal += modification.amount;
    });
    itemTotal *= value.quantity;
    total += itemTotal;
  });

  // total *= coupon;
  // total *= plusTax;

  discountedTotal = Math.round(total - total * coupon);
  newTotal = discountedTotal * plusTax;
  const final = Math.round(newTotal);
  console.log(typeof final, "final", final);

  return final;
};

export default async function handler(req, res) {
  const { cart, couponOff } = req.body;
  try {
    // const customer = await stripe.customers.create();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(cart, couponOff),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.send(err);
  }
}
