require('dotenv').config();
// console.log("WEB_TOKEN: ", process.env.WEB_TOKEN)
const {app} = require("../src/shared/shared")

const userRoutes = require("../src/routes/userRoutes")
const cartRoutes = require("../src/routes/cartRoutes");
const productRoutes = require("../src/routes/productRoutes")

const PORT = process.env.PORT || 3000;

// using cors to allow api to respond to requests from any origin
app.use((req, res, next)=>{
    console.log('Middleware:', req.method, req.path);
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next()
})

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes)


app.listen(PORT, () => {
    console.log(`Port number ${PORT}`)
})


