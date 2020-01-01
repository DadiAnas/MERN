import React from "react"
import {Route, Switch} from "react-router-dom"
import Home from "./pages/usersHome"
import userDetails from "./pages/UserDetails"
import userUpdate from "./pages/userUpdate"
export default function(){
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/show/:id" component={userDetails}/>
            <Route exact path="/update/:id" component={userUpdate}/>
        </Switch>
    )
}