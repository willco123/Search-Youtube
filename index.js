require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3003;
console.log(process.env.NODE_ENV)

app.listen(port, () => console.log(`Listening on port ${port}`));
