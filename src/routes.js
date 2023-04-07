const indexRouter = require("./routes/index"),
paymentRouter = require("./routes/payment");

// Webhooks
const webhookPayments = require("./routes/webhooks/payments");

// Handlers
const errorHandler = require('./middleware/errorHandler')

module.exports = (app) => {
  app.use("/", indexRouter);

  app.use("/payment", paymentRouter);

  app.use("/webhooks/payments", webhookPayments);

  app.use(errorHandler);
};
