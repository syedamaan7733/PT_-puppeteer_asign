const scrapData = require("../puppeteer");

// controller for scrapping data
const getGitHubData = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      res.status(400).json({
        success: false,
        message: "Please provide the username",
      });
      return;
    }

    // getting info 
    const data = await scrapData(username);

    if (!data) {
      res.status(404).json({
        success: false,
        message: "No account found with this usernames",
      });
      return;
    }
    res.status(200).json({ success: true, data, savedData });
  } catch (error) {
    console.log("error in scrappper", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting the Data",
    });
  }
};

module.exports = getGitHubData;
