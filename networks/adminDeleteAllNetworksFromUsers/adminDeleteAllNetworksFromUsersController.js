const { adminDeleteAllNetworksFromUsersValidator } = require("./adminDeleteAllNetworksFromUsersValidator");
const { getFromCache,delCache} = require("../../services/redisCaching");

exports.adminDeleteAllNetworksFromUsers = async (req, res) => {
  const userEmail = req.body.email;

  if (Object.keys(req.body).length !== 1) {
    return res.status(400).json({
      success: false,
      isAuth: true,
      errorCode: -1,
      message: "Invalid request body",
      result: [],
    });
  }

  const result = await adminDeleteAllNetworksFromUsersValidator(userEmail);
  res.status(result.success ? 200 : 500).json(result);
};
