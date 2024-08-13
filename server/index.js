const userRoutes = require("../src/routes/useRoutes")

const cartRoutes = require("../src/routes/cartRoutes");

const productRoutes = require("../src/routes/productRoutes")

app.use("/api/user", userRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/product", productRoutes)



const PORT = process.env.PORT || 3000;



