const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/.env` })

// Express Setup
const express = require('express');
const cors = require('cors');
const app = express();



// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// const { auth, createUserWithEmailAndPassword } = require("./firebase")


//app routing
const userRoutes = require ('./routes/userRoutes');
app.use('/', userRoutes)



app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log('App listening on port ' + process.env.REACT_APP_SERVER_PORT);
});
