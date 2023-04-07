const { getItems } = require("../../database");
const { sendProduct } = require("../../services/nodemailer");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res, next) => {
  res.sendStatus(200);
});

router.post("/", async (req, res, next) => {
  const webhookData = req.body;

  if (Object.keys(webhookData).length === 0) return res.sendStatus(400);

  switch (webhookData.event) {
    case "PAYMENT_CREATED":
      res.sendStatus(200);
    break;
    case "PAYMENT_RECEIVED":
      const payment = webhookData.payment;
      const pdata = await getItems({ path: `payments/qr/${payment.pixQrCodeId}` });
      console.log(pdata);
      if (pdata) {
        // Coletar produto
        // Enviar produto pro email e retornar OK
        sendProduct(pdata.email, pdata.filepath)
          .then((result) => {
            if (result) {
              res.sendStatus(200);
            } else {
              res.sendStatus(404);
            }
          })
          .catch((error) => {
            res.sendStatus(404);
            console.error(error);
          });
      } else {
        return res.sendStatus(400);
      }
      break;
  }
});

module.exports = router;
