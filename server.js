const express = require('express');
const homeRoute = require('./routes/home-routes')
const apiRoutes = require('./routes/api-routes')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(apiRoutes)
app.use(homeRoute)

app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}, click on the link http://localhost:${PORT}`)
})