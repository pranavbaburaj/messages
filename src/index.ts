import express = require('express');

const app:express.Application = express()
const port:any = process.env.PORT || 3000

app.get("/", (request:express.Request, response:express.Response) => {
    response.send("Yesh")
})

app.listen(port, () => {
    console.log(`Application started at port ${port}`)
})