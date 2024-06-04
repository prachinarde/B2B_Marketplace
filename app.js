const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(morgan('tiny')); 
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


const productsRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const userRouter = require('./routers/users');
const orderRouter = require('./routers/orderes');

const api = process.env.API_URL;



app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);




const Product = require('./models/product');
const { Category } = require('./models/category');
const { User } = require('./models/user');

mongoose.connect(process.env.connection_string,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    dbName: 'E-Commerece'

    
} )
.then(()=>{
    console.log("database connection is ready")
})
.catch((err)=>{
    console.log(err);
});

app.listen(3000, ()=>{

    console.log('serevr is running on port 3000');
})