
const restaurantRoutes = require("../src/routes/restaurantRoutes");
const favoriteRestaurantRoutes = require("../src/routes/favoriteRestaurantRoutes");
const reviewRoutes = require("../src/routes/reviewRoutes")
const commentRoutes = require("../src/routes/commentRoutes")

app.use("/api/user", userRoutes);

app.use("/api/restaurant", restaurantRoutes);

app.use("/api/favoriteRestaurant", favoriteRestaurantRoutes);

app.use("/api/reviews", reviewRoutes)

app.use("/api/comments", commentRoutes)

const PORT = process.env.PORT || 3000;



