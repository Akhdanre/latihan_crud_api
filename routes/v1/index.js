const router = require("express").Router()
const db = require("../../database")
const webResponse = require("../../model/web_response").webResponse


// router.get("/api/products", async function (req, res, next) {
//     let id = req.query.id
//     let query, data
//     if (id) {
//         try {
//             query = "SELECT * FROM products WHERE id = $1"
//             data = await db.newDb().query(query, [id])
//             if (data.rows.length == 0) {
//                 return webResponse(res, 404, `Data With id ${id} Not Found`, data.rows)
//             }
//             return webResponse(res, 200, "Success Get Data", data.rows)
//         } catch (err) {
//             return next(err)
//         }
//     }

//     try {
//         query = "SELECT * FROM products"
//         data = await db.newDb().query(query)
//         return webResponse(res, 200, "Success Get Data", data.rows)
//     } catch (err) {
//         return next(err)
//     }

// })

router.get("/products", async function (req, res, next) {
    let id = req.query.id
    let keywoard = req.query.keywoard
    let query = "SELECT * FROM products "
    let data
    if (id) {
        query += `WHERE id = ${id}`
    }
    if (keywoard) {
        query += `WHERE name LIKE '%${keywoard}%' OR category LIKE '%${keywoard}%'`
    }

    try {
        data = await db.newDb().query(query)
        if (data.rows.length == 0) {

            return webResponse(res, 404, `Data Not Found`, data.rows)
        }
        return webResponse(res, 200, "Success Get Data", data.rows)
    } catch (err) {
        return next(err)
    }

})

router.post("/products", async function (req, res, next) {
    let request = req.body
    try {
        let query = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3)"
        let data = await db.newDb().query(query, [request.name, request.price, request.category])
        if (!data) {
            return webResponse(res, 400, `BAD REQUEST`, null)
        }
        return webResponse(res, 201, "Success Create", data.rowCount)
    }
    catch (err) {
        next(err)
    }
})

router.put("/products/:id", async function (req, res, next) {
    let productId = req.params.id
    let request = req.body
    try {
        let query = "UPDATE products SET name = $1, price = $2, category = $3, is_available = $4 WHERE id = $5"
        let data = await db.newDb().query(query, [request.name, request.price, request.category, request.is_available, productId])
        if(data.rowCount < 1){
            return webResponse(res, 400, `BAD REQUEST`, null)
        }
        webResponse(res, 200, "success update data", data.rowCount)
    } catch (err) {
        next(err)
    }
})
router.delete("/products/:id", async function (req, res, next) {
    let productId = req.params.id
    try {
        let query = "DELETE FROM products WHERE id = $1"
        let data = await db.newDb().query(query, [productId])
        if (data.rowCount < 1){
            return webResponse(res, 400, `BAD REQUEST`, null)
        }
        return webResponse(res, 200, "success delete data", data.rowCount)
    } catch (err) {
        next(err)
    }
})

module.exports = router