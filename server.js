
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.CONNECTION_STR,
    { useNewUrlParser: true }
).then((connection) => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err)
}
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('server is started....')
}
);