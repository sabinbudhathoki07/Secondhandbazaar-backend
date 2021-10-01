const express = require('express'); //Third Party
const bodyParser = require('body-parser'); // Core Module
const app = express();
const cors = require('cors');
app.use(express.json())
const path = require('path')
const database = require('./database/db')
const public = path.join(__dirname,'')
const customer_routes = require('./routes/customerRoutes');
const product_routes = require('./routes/ProductRoutes');
const admin_Routes = require('./routes/admin_Routes');
const message_Routes = require('./routes/message_Routes'); 
const homepro_routes = require('./routes/homeproRoutes')
const cart_routes = require('./routes/cartroutes')

app.use(cors());

app.use(express.static(public))
app.use(admin_Routes)
app.use(customer_routes);
app.use(product_routes);
app.use(admin_Routes);
app.use(message_Routes);
app.use(homepro_routes);
app.use(cart_routes);


app.use(bodyParser.urlencoded({extended:false}));

app.listen(90);