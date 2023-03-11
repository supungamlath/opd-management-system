const express = require('express');
const swaggerUI = require('swagger-ui-express')

const app = express();

const testRoutes = require('./src/routes/testRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const commonRoutes = require('./src/routes/commonRoutes')
const appointmentRoutes = require('./src/routes/appointmentRoutes')
const { swaggerSpecs } = require('./src/services/swagger')

// Use the middleware to parse the request body
app.use(express.json());
// Accept these headers to avoid CORS errors on the client side
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

///////////////////// Routes /////////////////////
app.use(testRoutes);
app.use(patientRoutes);
app.use(commonRoutes)
app.use(appointmentRoutes)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
