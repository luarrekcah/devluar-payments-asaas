const axios = require("axios");
require("dotenv").config();

module.exports = {
  genQrCode: async ({ description, value }) => {
    if (!description || !value) {
      throw new Error("Missing required parameters");
    }

    const headers = {
      "Content-Type": "application/json",
      access_token: process.env.asaasKey,
    };

    const data = {
      description,
      value,
      addressKey: process.env.pixKey,
    };

    try {
      const response = await axios.post(
        "https://www.asaas.com/api/v3/pix/qrCodes/static",
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  },
};
