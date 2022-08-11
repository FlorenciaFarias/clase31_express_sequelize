const express = require("express")
const {resolve} = require('path')
const method = require('method-override')
const session = require('express-session');
const cookie = require('cookie-parser');
const cors = require('cors');
const static = require("./modules/static")
const app = express();
const port = process.env.PORT || 3030
const start = () => console.log(`Server on http://localhost:${port}`)
app.listen(port, start());
app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");

app.use (static('../../public'));
app.use (static('../../uploads'));
app.use(express.urlencoded({extended:true})); 
app.use(express.json())
app.use(method('m'));
app.use(session({
    secret:'nodejs',
    saveUninitialized:true,
    resave:true
})) 
app.use(cookie())
app.use(cors());
/* Middlewares Custom */
app.use(require('./middlewares/user'))

app.use(require("./routes/main.routes"))
app.use('/products',require('./routes/products.routes'))
app.use('/users',require('./routes/user.routes'))

//APIs
app.use('/api/users', require('./routes/apis/userApi.routes'));
