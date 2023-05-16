const express = require ('express')
const path = require('path')
const app = express()
const {PORT} =require('./config.js')
const {API_KEY} =require('./config.js')
import { API_KEY } from './config.js';

app.use("/static", express.static(path.resolve(__dirname,'frontend','static')))

app.get("/*", (req,res)=>{//* on accepte tous dans l'url
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
})


app.listen(PORT || 4001, () => {
    console.log('server running on port', PORT)
})