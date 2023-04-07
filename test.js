const axios = require("axios");

axios.post("https://5a4d-45-162-222-249.ngrok-free.app/payment/qrcode", {
  email: "raulrod@gmail.com",
  prodId: "2323",
}).then(r => {
    console.log(r.data);
});
