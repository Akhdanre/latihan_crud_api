const express = require("express")
const db = require("./database")
const app = express()
const port = 3000


app.use(express.json())

app.get("/api/products", async function (req, res, next) {
    let id = req.query.id
    let query, data
    if (id) {
        try {
            query = "SELECT * FROM products WHERE id = $1"
            data = await db.newDb().query(query, [id])
            res.json(data.rows)
        } catch (err) {
            next(err)
        }
    } else {
        try {
            query = "SELECT * FROM products"
            data = await db.newDb().query(query)
            res.json(data.rows)
        } catch (err) {
            next(err)
        }
    }
})

app.post("/api/products", async function (req, res, next) {
    let request = req.body
    try {
        let query = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3)"
        let data = await db.newDb().query(query, [request.name, request.price, request.category])
        res.json(data.rows)
    }
    catch (err) {
        next(err)
    }
})

app.put("/api/products/:id", async function (req, res, next) {
    let productId = req.params.id
    let request = req.body
    try {
        let query = "UPDATE products SET name = $1, price = $2, category = $3, is_available = $4 WHERE id = $5"
        let data = await db.newDb().query(query, [request.name, request.price, request.category, request.is_available, productId])
        res.json(data.rows)
    } catch (err) {
        next(err)
    }
})
app.delete("/api/products/:id", async function (req, res, next) {
    let productId = req.params.id
    try {
        let query = "DELETE FROM products WHERE id = $1"
        let data = await db.newDb().query(query, [productId])
        res.json(data.rows)
    } catch (err) {
        next(err)
    }
})


// internal error
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "some thing wrong" })
})

// 404 not found endpoint
app.use((req, res, next) => {
    res.status(404).json({ message: `are you lost? ${req.method} ${req.url} is not registered` })
})

app.listen(port, function () {
    console.log("app running on port", port)
})