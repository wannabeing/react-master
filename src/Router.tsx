import { HashRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/coins/Coins";
import Coin from "./routes/coins/Coin";
import TodoList from "./routes/todos/TodoList";
import Animations from "./routes/animations/Animations";
import Home from "./routes/nomflix/Home";
import Search from "./routes/nomflix/Search";
import Tv from "./routes/nomflix/Tv";
import Header from "./components/Header";

function Router() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route path="/coin/:coinID">
          <Coin />
        </Route>
        <Route path="/coin">
          <Coins />
        </Route>
        <Route path="/todo">
          <TodoList />
        </Route>
        <Route path="/animation">
          <Animations />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
