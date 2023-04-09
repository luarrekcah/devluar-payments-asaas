const { genQrCode } = require("../../functions/payments");

const { setItem, getItems } = require("../../database/index");

const express = require("express"),
  router = express.Router();

router.post("/qrcode", async (req, res, next) => {
  const data = req.body;

  if (data.email === "" || !data.email || data.prodId === "" || !data.prodId) {
    return res.sendStatus(404);
  }

  const product = await getItems({
    path: `products/${data.prodId}`
  });

  const qrdata = await genQrCode({ description: product.desc, value: Number(product.valor) });

  setItem({
    path: `payments/qr/${qrdata.id}`,
    params: {
      email: data.email,
      prodId: data.prodId,
      filepath: product.filepath
    },
  });

  res.json(qrdata);
});

module.exports = router;
