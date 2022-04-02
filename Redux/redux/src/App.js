import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Adduser from "./components/Adduser";
import Edituser from "./components/Edituser";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={Home} />
        <Route exact path ="/adduser" component={Adduser} />
        <Route exact path ="/edituser/:id" component={Edituser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
