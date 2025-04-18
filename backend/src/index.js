require('dotenv').config();
const express = require('express');
const generateRoute = require('./routes/generate');
const requestsRoute = require('./routes/requests');
const requestRoute  = require('./routes/request');
const analyticsRouter = require('./routes/analytics');
const cors = require('cors');



const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    }));

app.use(express.json());

app.use('/generate', generateRoute);
app.use('/requests',   requestsRoute)
app.use('/request',    requestRoute);
app.use('/timeseries', analyticsRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("start")
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
