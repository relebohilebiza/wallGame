const express = require('express')
const app = express()

app.use(express.static('sites'))
app.use('/ecsy-two', express.static(__dirname +'/node_modules/ecsy-two'))
app.listen(3000)
