const User = require("../../models/users");
const { myselfProfileViewUserSpecificNetworksValidator } = require("./myselfProfileViewUserSpecificNetworksValidator");
const { getFromCache, setCache } = require("../../services/redisCaching");

exports.myselfProfileViewUserSpecificNetworks = async (req, res) => {
  const userEmail = req.body.email;
  if (!userEmail) {
    return res.status(400).json({
      success: false,
      isAuth: false,
      errorCode: -1,
      message: "Please provide user email in the request body",
    });
  }


  try {
    const user = await User.findOne({ email: userEmail }, { networks: 1 });
    if (!user) {
      return res.json({
        success: true,
        message: "User not found",
        userSpecificNetworksCount: 0,
        totalNetworksCount: 0,
        result: [],
      });
    }

    const networks = user.networks.map((network) => network.networkId);

    const {
      userSpecificNetworksCount,
      totalNetworksCount,
      result,
    } = await myselfProfileViewUserSpecificNetworksValidator(networks);


    res.json({
      success: true,
      message: "User Specific Network List Fetched successfully.",
      userSpecificNetworksCount,
      totalNetworksCount,
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
