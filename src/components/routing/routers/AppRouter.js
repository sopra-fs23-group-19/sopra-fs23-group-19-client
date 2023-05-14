import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "components/routing/routeProtectors/GameGuard";
// import GameRouter from "components/routing/routers/GameRouter";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import { RegisterGuard } from "components/routing/routeProtectors/RegisterGuard";
import Login from "components/views/Login";
import { ProfileGuard } from "components/routing/routeProtectors/ProfileGuard";
import Register from "components/views/Register";
import Lobby from "components/views/Lobby";
import Rules from "components/views/Rules";
import Profile from "components/views/Profile";
import WaitingView from "components/views/WaitingView";
import Game from "components/views/Game";
import Friend from "components/views/Friend";
import GameCreationView from "components/views/GameCreationView";
import Welcome from "components/views/Welcome";
import { LobbyGuard } from "components/routing/routeProtectors/LobbyGuard";
import Notification from "components/views/Notification";
import { FriendGuard } from "components/routing/routeProtectors/FriendGuard";
import Maintenance from "components/views/Maintenance";
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/game">
          <GameGuard>
            <GameRouter base="/game" />
          </GameGuard>
        </Route> */}
        <Route exact path="/game/:gameId">
          <GameGuard>
            <Game />
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <RegisterGuard>
            <Register />
          </RegisterGuard>
        </Route>
        <Route exact path={`/welcome`}>
          {/* <LobbyGuard> */}
          <Welcome />
          {/* </LobbyGuard> */}
        </Route>
        <Route path={`/waiting/:roomId`}>
          <LobbyGuard>
            <WaitingView />
          </LobbyGuard>
        </Route>
        <Route exact path="/lobby">
          <LobbyGuard>
            <Lobby />
          </LobbyGuard>
        </Route>
        <Route exact path="/friend">
          <FriendGuard>
            <Friend />
          </FriendGuard>
        </Route>
        <Route exact path="/rules">
          <Rules />
        </Route>
        <Route exact path="/notification">
          <Notification />
        </Route>
        <Route exact path="/information">
          <Maintenance />
        </Route>
        <Route exact path="/profile/:id">
          <ProfileGuard>
            <Profile />
          </ProfileGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/gameCreation">
          <LobbyGuard>
            <GameCreationView />
          </LobbyGuard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
/*
 * Don't forget to export your component!
 */
export default AppRouter;
