import { HashRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/coins/Coins";
import Coin from "./routes/coins/Coin";
import TodoList from "./routes/todos/TodoList";
import Main from "./routes/main";

function Router() {
  return (
    <HashRouter>
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
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
