const { app } = require("../src/shared/shared");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

const userRoutes = require("../src/routes/userRoutes");
app.use("/api/user", userRoutes);

const restaurantRoutes = require("../src/routes/restaurantRoutes");
app.use("/api/restaurant", restaurantRoutes);

<<<<<<< HEAD
const favoriteRestaurantRoutes = require("../src/routes/favoriteRestaurantRoutes");
app.use("/api/favoriteRestaurant", favoriteRestaurantRoutes);
=======
const reviewRoutes = require("../src/routes/reviewRoutes")
app.use("/api", reviewRoutes)
>>>>>>> b74fc49f84daa3ecce24da8395ea06ca0a3377d3

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
