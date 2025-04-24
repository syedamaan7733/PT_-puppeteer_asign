const puppeteer = require("puppeteer");

async function scrapData(username) {
  // it will launch the browser
  const browse = await puppeteer.launch({ headless: true });
  console.log("Scrapping Initiated....");
  // opens new black page
  const page = await browse.newPage();
  console.log("In proccess...");
  try {
    // take to the page
    await page.goto(`https://github.com/${username}`, {
      waitUntil: "networkidle2",
    });

    //extract user info
    const userProfile = await page.evaluate(() => {
      // Extracting data from the perticular selector

      // username
      const userName = document
        .querySelector(".vcard-username")
        ?.textContent.trim();
      console.log("Checking", userName);

      // name
      const name = document
        .querySelector(".vcard-fullname")
        ?.textContent.trim();
      console.log("Checking", name);

      //bio
      const bio =
        document.querySelector(".user-profile-bio > div")?.textContent.trim() ||
        "N/A";
      console.log("Checking", bio);

      //   const repos = document.querySelector(".Counter "); // ?.textContent.trim();

      //   repositories
      const repos = document
        .querySelector(".js-sidenav-container-pjax a:nth-child(2) span")
        ?.textContent.trim();
      console.log("Checking", repos);

      // followers
      const followers =
        document
          .querySelector(".js-profile-editable-area div div a:first-child span")
          ?.textContent.trim() || "N/A";
      console.log("Checking", followers);

      // followings
      const followings =
        document
          .querySelector(".js-profile-editable-area div div a:last-child span")
          ?.textContent.trim() || "N/A";
      console.log("Checking", followings);

      //   repositories
      const topProjects = Array.from(
        document.querySelectorAll(".js-pinned-items-reorder-container ol li")
      )
        .map((ele, i) => {
          const commonCLs = `.js-pinned-items-reorder-container ol li:nth-child(${
            i + 1
          }) > div .pinned-item-list-item-content`;

          // const child = document.querySelector(`${commonCLs}`);

          // name of the each repo
          const name =
            document
              .querySelector(`${commonCLs} > div > span:first-child  a `)
              ?.textContent.trim() ||
            document
              .querySelector(`${commonCLs} > div > div > span > a .repo `)
              ?.textContent.trim();

          const stars =
            document
              .querySelector(`${commonCLs} p:last-child a`)
              ?.textContent.trim() || 0;

          const desc =
            document.querySelector(`${commonCLs} p`)?.textContent.trim() ||
            "No Description available";
          console.log(name);

          return { name, stars: parseInt(stars), desc };
        })
        .sort((a, b) => b.stars - a.stars);
      //   console.log(topProjects);

      return {
        userName,
        name,
        bio,
        repos: parseInt(repos),
        followers,
        followings,
        top_repositories: topProjects.splice(0, 3),
      };
    });
    await browse.close();
    console.log("Scraping Completed...");
    return !userProfile.userName ? null : userProfile;
    // console.log(userProfile);

    // console.log(page);
  } catch (error) {
    console.error("Scraping Failed:", error);
    await browser.close();
    return null;
  }
}

// scrapData("kamranahmedse")
module.exports = scrapData;
