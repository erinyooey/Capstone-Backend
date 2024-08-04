const { app } = require("../src/shared/shared");
const userRoutes = require("../src/routes/userRoutes");
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

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
