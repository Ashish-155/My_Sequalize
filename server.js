const express = require('express');
const cors = require('cors');
const PORT = 8500;
const app = express();

app.use(cors());
app.use(express.json())

// router
const router = require('./routes/productRoute');
app.use("api/products", router);

app.get("/", (req, res) => {
    res.send("Welcome to the REST API");
});


app.listen(PORT, () => {
    console.log(`listening on port  http://localhost:${PORT}`)
})