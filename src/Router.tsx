import { HashRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/coins/Coins";
import Coin from "./routes/coins/Coin";
import { TodoList } from "./routes/todos/TodoList";

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
        <Route path="/">
          <TodoList />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
