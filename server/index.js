const {app} = require("../src/shared/shared")

const userRoutes = require("../src/routes/userRoutes")
// const cartRoutes = require("../src/routes/cartRoutes");
// const productRoutes = require("../src/routes/productRoutes")

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Port number ${PORT}`)
})

// using cors to allow api to respond to requests from any origin
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.use("/api/user", userRoutes);

// app.use("/api/cart", cartRoutes);

// app.use("/api/product", productRoutes)

