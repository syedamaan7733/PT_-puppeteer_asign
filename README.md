# GitHub User Scraper

A Node.js application that scrapes GitHub user profiles and returns structured data about users and their top repositories.

## Features

- Fetches GitHub user information through web scraping
- Returns detailed profile data including username, name, bio, and statistics
- Lists the user's top repositories with stars and descriptions
- Simple REST API endpoint for easy integration

## Installation

Clone the repository:

```bash
git https://github.com/syedamaan7733/PT_-puppeteer_asign.git
cd PT_-puppeteer_asign
```

Install dependencies:

```bash
npm install
```

## Usage

### Start the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run start
```

The server will start on port 8080 by default.

### API Endpoints

#### Get GitHub User Data

```
GET http://localhost:8080/github-user/{username}
```

Replace `{username}` with the GitHub username you want to fetch information for.

#### Example Request

```
GET http://localhost:8080/github-user/syedaman7733
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "userName": "syedamaan7733",
    "name": "Syed Amaan Ali",
    "bio": "A full-stack web developer. Who loves making new stuff and really passionate about learning new technology.",
    "repos": 34,
    "followers": "4",
    "followings": "4",
    "top_repositories": [
      {
        "name": "jpp-compiler",
        "stars": 2,
        "desc": "A complete solution to the syntax of different programming languages."
      },
      {
        "name": "saleem-footwear-api",
        "stars": 1,
        "desc": "No Description available"
      },
      {
        "name": "frezzers-faves-api",
        "stars": 1,
        "desc": "No Description available"
      }
    ]
  }
}
```

## Technical Details

This application uses:
- Node.js
- Express.js for the server
- Puppeteer for web scraping GitHub profiles

## Limitations

- Rate limiting may apply when making too many requests to GitHub
- The application depends on GitHub's HTML structure, which may change over time