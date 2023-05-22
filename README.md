<h1 align="center">
  <br>
  <img src="src/styles/images/icon.jpg" alt="Icon image" width="100">
</h1>
<h1 align="center">SoPra FS23 - Drawing & Guessing</h1>
<h2 align="center"> :pencil: Introduction</h2>
Drawing & Guessing is a social drawing application that involves one participant drawing a picture based on a given word, while others attempt to correctly guess the drawing. 
To play the game, users must create a room for either two or four participants. They can invite their online friends to join. During each turn, players are designated as either "drawing player" or "guessing player".
The drawing player selects a word and has 60 seconds to draw an illustration depicting that word. During the guessing turn, participants have 60 seconds to submit their answer. Points are awarded to both the drawing and guessing players based on the accuracy of the guesses. Once the game concludes, a final ranking page is displayed to all players. The game relies on a word generating API to generate words, and a word similarity API to compare answers with the target word.

<h3 align="center">:round_pushpin: Goal</h3>
The goal of this project is to create an engaging and interactive game that allows players to draw pictures and guess each other's drawings, while earning points and competing against each other. The project aims to provide a fun and challenging experience that encourages creativity, imagination and quick thinking. The application should be an entertaining and intuitive game that can be easily played and enjoyed by people of all ages and backgrounds.

<h3 align="center">:round_pushpin: Motivation</h3>
The motivation behind a drawing and guessing game is to provide a fun, interactive, and lighthearted activity that can be played with friends, family, or even strangers. The game can be a great way to unwind after a long day, or to simply share a laugh with others. We hope our game can provide a fun and enjoyable experience for all those involved.

## :book: Table of content

- [Technologies](#technologies)
- [High-level components](#high-level-components)
- [Launch & Deployment](#launch-deployment)
- [Illustrations](#illustrations)
- [Roadmap](#roadmap)
- [Contributions](#contributions)
- [License](#license)

## :small_orange_diamond: Technologies

- React: JS Library for Building UI.
- JavaScript: The main programming language.
- Canvas: Draw graphics via JavaScript.
- CSS: Specify the layout of web pages, and adds syle and color to web pages.
- HTML: Markup language for Web pages.
- Google Cloud: Develop and launch the application.

## :small_orange_diamond: High level components

The important components are saved under the folder [src/views](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/tree/main/src/components/views). The main entry point of the client is the [index.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/index.js) file.
Here we illstruate three main components.

### Lobby

The [Lobby.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Lobby.js) is where users can discover available game rooms to join or create a new game room. The page features a form that displays all open rooms waiting for players, and users can select a room they are interested in joining. Alternatively, the [GameCreationView.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/GameCreationView.js) is where users can quickly start a new game by clicking "create a new room", selecting the desired game mode (room with 2 or 4 participants), and launching a new game. The Lobby page also includes a navigation [Header.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Header.js), allowing users to switch to other pages as needed.

### Game

The main component in the game is the [Game.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Game.js) which get latest game status and siutation from the server via periodic polling. The [Game.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Game.js) would decide to render [DrawingStage.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/DrawingStage.js) component, [GuessingStage.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/GuessingStage.js) component or [TurnRanking.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/TurnRanking.js) component based on the game turn information provided by the server. These pages use the [Timer.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Timer.js)] component to track the duration of each turn, limiting players to a set amount of time to update painting and answer the question.
When the game is finished, the game would display the [Ranking.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Ranking.js).

### Friends

On the [Friend.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Friend.js) page, users can search for other users by their username and send friend requests. If a user receives a friend request, they will receive a notification on the [Notification.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Notification.js) page and can choose to accept or reject the request. Once accepted, the friend will appear in the user's friend list on the [Friend.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Friend.js) page, and the user can view their friend's personal profile, including their best score and total score earned in the game via [Profile.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Profile.js) component.
The [Profile.js](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/src/components/views/Profile) also enables users to view their personal profile,including username, best score and total score. Users can edit their own profile: changing username and password.

## :small_orange_diamond: Launch & Deployment

**Installation**
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org) installed on your computer.

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

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## :small_orange_diamond: Illustrations

## :small_orange_diamond: Roadmap

- :white_check_mark: Allow touch input.
- :negative_squared_cross_mark: Allow guessing players guess multiple times.
- :negative_squared_cross_mark: Enable live chat during the game.
- :negative_squared_cross_mark: Configurable setting of game rounds and word difficulty.
- :negative_squared_cross_mark: Display the guessing players hit or incorrectly answers in real-time.
- :negative_squared_cross_mark: Better user interface.
- :negative_squared_cross_mark: Optional re-match after a game ends.

## :small_orange_diamond: Contributions

### Authors

| Name        | Personal page                                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Runze Li    | [![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/runzeliuzh)   |
| Jingjing Li | [![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Jing-jing-Li) |
| Geyu Meng   | [![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GY-Meng)      |
| Manyi Wang  | [![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manyiw99)     |
| Shiyu Ran   | [![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shiyu-Ran)    |

### Acknowledgement

- The client is developed based on the [SoPra FS23 - Client Template](https://github.com/HASEL-UZH/sopra-fs23-template-client).
- Many thanks to **[Mete Polat](https://github.com/polatmete)** who helped us as a Tutor and Scrum Master during this SoPra project.

**Note**  
_The cartoon cat images are from GIPHY and all credit goes to the original artists._

## :small_orange_diamond: License
