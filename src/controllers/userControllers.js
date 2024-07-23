const { registerQuery } = require("../queries/userQueries");
const {
  loginQuery,
  getAllUser,
  getOneUser,
  getMe,
  findUserWithToken,
  destroyUser,
  alterUser,
  favoriteRestaurantsQuery,
  destroyFavoriteRestaurant,
} = require("../queries/userQueries");

const register = async (req, res) => {
  console.log(req.body);
  const token = await registerQuery(req.body);
  res.send(token);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResponse = await loginQuery({ email, password });
    res.json(loginResponse);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid login credentials.");
  }
};

const displayAll = async (req, res, next) => {
  const users = await getAllUser();
  res.send(users);
};

const displayOne = async (req, res, next) => {
  console.log(req.params.id);
  const user = await getOneUser(req.params.id);
  res.send(user);
};

const displayMe = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(id, "control");
    const getMeResponse = await getMe({ id });
    res.json(getMeResponse);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid login credentials.");
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  console.log(req.params);
  try {
    const deletedUser = await destroyUser(userId);
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const { firstName, lastName, password } = req.body;

    const changedUser = await alterUser({
      id: userId,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
    res.json(changedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const favoriteRestaurant = async (req, res) => {
  const { businessName, category, operationTime, address } = req.body;

  try {
    const favoriteRestaurantResponse = await favoriteRestaurantsQuery({
      businessName,
      category,
      operationTime,
      address,
    });
    res.json(favoriteRestaurantResponse);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid.");
  }
};

const deleteFavoriteRestaurants = async (req, res, next) => {
  const id = req.params.id;
  const deleteFavoriteRestaurant = await destroyFavoriteRestaurant(id);
  res.send(deleteFavoriteRestaurant);
};

module.exports = {
  register,
  login,
  displayAll,
  displayOne,
  displayMe,
  deleteUser,
  updateUser,
  favoriteRestaurant,
  deleteFavoriteRestaurants,
};
