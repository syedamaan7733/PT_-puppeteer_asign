const scrapData = require("../puppeteer");

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

    const data = await scrapData(username);

    if (!data) {
      res.status(404).json({
        success: false,
        message: "No account found with this usernames",
      });
      return;
    }

    

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting the Data",
    });
  }
};

module.exports = getGitHubData;
