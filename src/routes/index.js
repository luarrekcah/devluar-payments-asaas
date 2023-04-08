const { getAllItems } = require("../database");

const express = require("express"),
  router = express.Router();

router.get("/", (req, res, next) => {
  res.sendStatus(200);
});

router.get("/getproducts", async (req, res, next) => {
  const allProds = await getAllItems({
    path: "products"
  });

  res.json(allProds);
});

module.exports = router;
