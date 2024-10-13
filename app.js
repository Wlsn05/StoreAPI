const express = require('express')
const app = express()
require('dotenv').config();

require('./drivers/connect-db')

const swaggerDocs = require('./swagger')
const artistRoutes = require('./routes/artistRoutes')
const albumRoutes = require('./routes/albumRoutes')

app.set('PORT', process.env.PORT || 3000)
app.use(express.json())

swaggerDocs(app)

app.use('/', artistRoutes);
app.use('/', albumRoutes);

//middleware


app.listen(app.get('PORT'), () => console.log(`Server Ready at port ${app.get('PORT')}`))