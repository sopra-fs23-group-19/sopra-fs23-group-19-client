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
- [Launch and Deployment](#launch-and-deployment)
- [Illustrations](#illustrations)
- [Roadmap](#roadmap)
- [Contributions](#contributions)
- [License](#license)

## Technologies

- React: JS Library for Building UI.
- JavaScript: The main programming language.
- Canvas: Draw graphics via JavaScript.
- CSS: Specify the layout of web pages, and adds syle and color to web pages.
- HTML: Markup language for Web pages.
- Google Cloud: Develop and launch the application.

## High-level components

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

## Launch and Deployment

**Installation**
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org) installed on your computer.

Get the [server](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-server) and the [client](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/) repository from GitHub.

```bash
$ git clone https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client.git
```

```bash
$ git clone https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-server.git
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

## Illustrations

### Register and Login
![Login Page](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/702ed03a-f76c-4a70-a8ed-28ec58484b0a)

Users can try to login with existed accounts or create a new one in register page.

### Welcome Page
![Welcome Page](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/fd1893e8-48da-402b-bca9-353f70c07dbf)

There would be a guide of the game in the welcome page.

### Header
![Header](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91421664/90c6ed5b-71d5-4a6c-954d-a7dda3fa6c08)
Users can get an intuitive page guide in the header.
- :Lobby Page: Get all non-full rooms or create a new game room.
- :Leaderboard Page: List the best 10 players.
- :Profile Page: Edit the personal information.
- :Friends Page: Get the list of friends and search a friend with his/her username.
- :Notification Page: Handle the friend or game invite requests.
- :Rules Page: Descripstions of game and rules.
- :Logout button: Logout the account and get to the login page.

Also, just below the header there is an icon for controlling the on/off status of the background music, this would remain in every other pages.

### Profile
![Profile](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/5588bd57-3246-44f0-876e-3593560ddc62)

Users can see and edit their profile on this page.

### Friends
![Friends page](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/19886728-bd5e-4101-8a2d-acb8215509ab)

Users can search other users by username and click add to send friend requests to them.

### Notification
![Notification page](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/1b1bc7e2-79a9-4e00-bdcb-dd5d54e149e1)

Users will see a red node in header when they receive friends or games invite. They can accept or reject these requests.

### Lobby
![Lobby](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/cbb4e1b5-9862-4baa-aad5-619e18e72492)

Lobby page will show all the games that haven't started yet. Users can click "join" to join the game.

### Game
![Game Creation](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/637d03a7-572d-4fbf-9a4c-640f67413a4f)

User can set the name of the game room and choose the mode.

![Waiting Area](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/20c597a0-5ea3-4b45-a037-0cb59e825293)

After users create or join a game, they will be directed to waiting page. Users can see the usernames of players who enter the game room. Moreover, they can invite their friends to play together.

![Word Selction](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/e62347f6-289b-472f-aa8a-a960846b9871)

Once each turn starts, the drawing player has 20 seconds to select one word from three given words.

![Drawing Stage of Drawing Player](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/784c9d82-f52b-4d8e-9f20-7c3fa767d0fa)

The drawing player has 60 seconds to draw a picture to describe the word.

![Drawing Stage of Guessing Player](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/54bf0e89-2ecd-47a1-a9b1-3e26a5b76934)

The guessing player can see the live drawing board when drawing player is drawing.

![Guessing Stage](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/f8547e70-fb50-494a-a49a-7583821502eb)
The Guessing player can guess the word in 60 seconds and all players can download the picture result.

![Turn Rank](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/9427282c-92a9-48a9-b1b1-6267bdee3ed8)

After each turn, there is a short conclusion of the painting, conrrect answer and each player’s score.

![Final Rank](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/ec72d8da-f5f9-4773-94a8-bc5cfc4d461d)

After every player becomes the drawing player once, the game ends. And the final leaderboard will show to all players.

### Leaderboard

![Leaderboard](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/assets/91188113/859dbcb2-7129-454f-b66f-390d52b1ca3a)

Users can see the rank of total score of the top 10 players.

## Roadmap

- :white_check_mark: Allow touch input.
- :negative_squared_cross_mark: Allow guessing players guess multiple times.
- :negative_squared_cross_mark: Enable live chat during the game.
- :negative_squared_cross_mark: Configurable setting of game rounds and word difficulty.
- :negative_squared_cross_mark: Display the guessing players hit or incorrectly answers in real-time.
- :negative_squared_cross_mark: Better user interface.
- :negative_squared_cross_mark: Optional re-match after a game ends.

## Contributions

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

## License

We use [MIT License](https://github.com/sopra-fs23-group-19/sopra-fs23-group-19-client/blob/main/LICENSE). 
