<h1 align="center">
  <br>
  <img src="src/styles/images/icon.jpg" alt="Cat Paint" width="100">
</h1>
<h1 align="center">SoPra FS23 - Drawing & Guessing</h1>
<h2 align="center"> :pencil: Introduction</h2>
Drawing & Guessing a social drawing application where players take turns drawing a picture of a given word, and other players compete to guess the word from the drawing. Users can  game is aimed at all age groups.

<h3 align="center">:round_pushpin: Goal</h3>
It is easy to play, and can motivate creative imaginations. It's a quick way to bond with strangers. Users can invite their newly formed group to a quick game for introductory.

<h3 align="center">:round_pushpin: Motivation</h3>

## :book: Table of content

- [Technologies](#technologies)
- [High-level components](#high-level-components)
- [Launch & Deployment](#launch-deployment)
- [Illustrations](#illustrations)
- [Roadmap](#roadmap)
- [Contributions](#contributions)
- [License](#license)

## Technologies

- NPM
- React
- ES6
- Canvas

## High level components

### Registered Users

The user can register and login into an account.

### Lobby

The user can view a public lobby, find existing waiting rooms and select one to join.

### Game

The user can play our game with friends.
<a name="launch-deployment"/>

## Launch & Deployment

**Installation**
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js 16.x](https://nodejs.org/en/download/), [NPM](https://www.npmjs.com/) installed on your computer.

Get the [server](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-server) and the [client](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/) repository from GitHub.

```bash
$ git clone https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client.git
```

To install required packages, please run the following command line.

```bash
npm install
```

To develop locally on your machine, just run the following command line:

```bash
npm run dev
```

## Illustrations

### Register and Login
![Login Page](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/e700e56b-7b2b-4cba-bb6d-ffea17b92d51)

Users can try to login with existed accounts or create a new one in login/register page.
### Welcome Page
![Welcome Page](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/2af6e608-1290-4436-9cb6-9c890308bc46)

There would be an animated guide of the game in the welcome page.
### Header
![Header](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/90c6ed5b-71d5-4a6c-954d-a7dda3fa6c08)

Users can get an intuitive page guide in the header.
- :Lobby Page: Get all non-full rooms or create a new game room.
- :Leaderboard Page: List the best 10 players.
- :Profile Page: Edit the personal information.
- :Friends Page: Get the list of friends and search a friend with his/her username.
- :Notification Page: Handle the friend or game invite requests.
- :Rules Page: Descripstions of game and rules.

Also, just below the header there is an icon for controlling the on/off status of the background music, this would remain in every other pages.

### Game
![Game Creation](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/0d3d6078-98b3-43bf-9bed-2a2567e097e9)

User can set the name of the game room and choose the mode.
![Waiting Area](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/4465bd9a-ee9a-4edb-a0ac-915fc2864861)

Users can see the usernames of players who enter the game room and can invite their friends to play together.
![Drawing Stage of Drawing Player](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/9bb5785d-9eed-4501-85fe-b53097ab5142)

![Drawing Stage of Guessing Player](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/c3405b27-4cba-4960-9506-948949f19891)

The drawing player has 60s to draw a picture to describe the word chosen from the three given ones and the guessing player can see the live drawing board.
![Guessing Stage](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/dde8c1b5-d375-48b0-97e0-a239046f1e1d)

The Guessing player can guess the word and all players can download the picture result.
![Turn Rank](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/d0c3711c-5385-4c1d-ad13-a8fdf80b1e59)

After each turn, there is a short conclusion of each player’s score.
![Final Leaderboard](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/82145816-96fe-4b8e-9995-5d3b39739d63)

After every player becomes the drawing player once, the game ends. And the final leaderboard will show to all players.

## Roadmap

- :white_check_mark: Allow touch input.
- :negative_squared_cross_mark: Allow guessing players guess multiple times.
- :negative_squared_cross_mark: Allow live chat during the game.
- :negative_squared_cross_mark: Configurable setting of game rounds and word difficulty.
- :negative_squared_cross_mark: Display the guessing players hit or incorrectly answer in real-time.
- :negative_squared_cross_mark: Better user interface.
- :negative_squared_cross_mark: Optional re-match after a game ends.

## Contributions

### Authors

| Name        |
| ----------- |
| Runze Li    |
| Jingjing Li |
| Geyu Meng   |
| Manyi Wang  |
| Shiyu Ran   |

### Acknowledgement

- The client code is based on the [SoPra FS23 - Client Template](https://github.com/HASEL-UZH/sopra-fs23-template-client).
- Many thanks to **[Mete Polat](https://github.com/polatmete)** who helped us as a Tutor and Scrum Master during this SoPra project.

**Note**  
_The cartoon cat images are from GIPHY and all credit goes to the original artists._

## License
