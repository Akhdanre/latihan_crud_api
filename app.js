const express = require("express")

const app = express()
const port = 3000
const v1Router = require("./routes/v1/index")
const webResponse = require("./model/web_response").webResponse
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use("/v1", v1Router)

const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('api_docs.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// internal error
app.use((err, req, res, next) => {
    console.log(err)
    // res.status(500).json(webResponse(500, "SOMETHING WRONG IN SERVER", null))
    webResponse(res, 500, "Err", null)
})

// 404 not found endpoint
app.use((req, res, next) => {
    // res.status(404).json(webResponse(404, "ENDPOINT NOT FOUND", null))
    webResponse(res, 404, "Err", null)
})

app.listen(port, function () {
    console.log("app running on port", port)
})