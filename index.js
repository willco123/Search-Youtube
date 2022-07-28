require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3003;


app.listen(port, () => console.log(`Listening on port ${port}`));
