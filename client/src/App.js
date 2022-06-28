import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VideogameDetails from "./components/VideogameDetails";
import Home from "./components/Home";
import CreateVideoGame from "./components/CreateVideoGame";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/videogame/:id" component={VideogameDetails} />
        <Route path="/createvideogame" exact component={CreateVideoGame} />
      </Switch>
    </div>
  );
}

export default App;
