const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

// middleware setup
app.use(express.json({limit: "25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const allowedOrigins = ['http://localhost:5173', 'https://glamcart.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

// all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)

main()
    .then(()=>{
        console.log("Connected to MOngoDB")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

}

app.get('/', (req, res) => {
  res.send('Hello World! Welcome Raj')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})