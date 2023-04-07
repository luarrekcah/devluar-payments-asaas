const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./routes")(app);
require("./database/setup");

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`PORTA: ${listener.address().port}`);
});

module.exports = app;