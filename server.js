const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config(); // Add this line to load environment variables

const app = express();
const PORT = process.env.PORT || 8000; // Use environment variable

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
