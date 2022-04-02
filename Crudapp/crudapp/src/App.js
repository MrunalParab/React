import NotFound from "./components/NotFound";
import AddUser from "./components/AddUser";
import AllUsers from "./components/AllUsers";
import UserData from "./components/UserData";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import React, { Component } from 'react'
import NavBar from "./components/NavBar";
import EditUser from "./components/EditUser";
import { Button } from "@material-ui/core";

export class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
        <NavBar/>
        
        <Switch>
          <Route exact path="/" component={UserData}></Route>
          <Route exact path="/add" component={AddUser}></Route>
          <Route exact path="/all" component={AllUsers}></Route>
          <Route exact path="/edit/:id" component={EditUser}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        </BrowserRouter>
    )
  }
}

export default App;


