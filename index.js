const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');


const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

dotenv.config(); 
connectDB(); 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/patients', require('./routes/patientRoutes')); 
app.use('/api/doctors', require('./routes/doctorRoutes')); 
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/users', require('./routes/loginRoutes'));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
