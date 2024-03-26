const {
  stripeTestSecretKey,
  jwtForgotPasswordSecret,
  saltRounds,
} = require("../utility/config");

const stripe = require("stripe")(stripeTestSecretKey);

const creatToken = async ({ body }) => {
  let date = body.expiryDate.split("/");

  const token = await stripe.tokens.create({
    card: {
      number: body.cardNumber,
      exp_month: date[0],
      exp_year: date[1],
      cvc: body.cvv,
    },
  });

  return token;
};

const createCardId = async ({ user, cardTokken }) => {
  const card = await stripe.customers.createSource(user.stripeCustomerId, {
    source: cardTokken,
  });

  return card;
};

const createCharge = async ({ alarm, user, card }) => {
  const charge = await stripe.charges.create({
    customer: user.stripeCustomerId,
    amount: alarm.snoozePenality * 100,
    currency: "usd",
    source: card.stripeCardId,
    description: "Snooze penalty",
    metadata: {
      charityId: alarm.charity,
      userId: user._id,
    },
  });

  return charge;
};

module.exports = {
  creatToken,
  createCardId,
  createCharge,
};
