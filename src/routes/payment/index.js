const { genQrCode } = require("../../functions/payments");

const { setItem } = require("../../database/index");

const express = require("express"),
  router = express.Router();

router.post("/qrcode", async (req, res, next) => {
  const data = req.body;

  if (data.email === "" || !data.email || data.prodId === "" || !data.prodId) {
    return res.sendStatus(404);
  }

  const prod = {
    id: "0230203",
    name: "arte",
    value: 1.0,
    filepath: 'primeira-eucaristia.cdr'
  };

  const qrdata = await genQrCode({ description: "arte", value: prod.value });

  setItem({
    path: `payments/qr/${qrdata.id}`,
    params: {
      email: data.email,
      prodId: prod.id,
      filepath: prod.filepath
    },
  });

  res.json(qrdata);
});

module.exports = router;
